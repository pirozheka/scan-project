import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const API_URL = "https://gateway.scan-interfax.ru/api/v1";
const LOAD_INCREMENT = 10;

export default function SearchResults() {
  const { isLoggedIn } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [summaryData, setSummaryData] = useState(null);
  const [publicationIds, setPublicationIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [error, setError] = useState(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const searchParams = location.state?.searchParams;

  const cleanAndTruncate = (text, maxLength = 640) => {
    const cleanedText = text.replace(/<[^>]*>/g, '');
    if (cleanedText.length <= maxLength) return cleanedText;
    return `${cleanedText.substring(0, maxLength).trim()}…`;
  };

  // Проверка авторизации
  useEffect(() => {
    if (!isLoggedIn) navigate("/auth");
  }, [isLoggedIn, navigate]);

  const fetchData = useCallback(async () => {
    if (!searchParams) {
      setError("Параметры поиска отсутствуют");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      // Запрос сводки
      const histResponse = await fetch(`${API_URL}/objectsearch/histograms`, {
        method: "POST",
        headers,
        body: JSON.stringify(searchParams),
      });
      if (!histResponse.ok) throw new Error("Ошибка при получении сводки");

      const histData = await histResponse.json();
      setSummaryData(histData);

      // Запрос списка ID
      const idsResponse = await fetch(`${API_URL}/objectsearch`, {
        method: "POST",
        headers,
        body: JSON.stringify(searchParams),
      });
      if (!idsResponse.ok) throw new Error("Ошибка при получении списка публикаций");

      const idsData = await idsResponse.json();
      const ids = idsData.items.map((item) => item.encodedId);
      setPublicationIds(ids);

      await loadDocuments(ids, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadDocuments = async (idsArray, offset) => {
    const nextIds = idsArray.slice(offset, offset + LOAD_INCREMENT);
    if (!nextIds.length) return;

    setIsLoadingDocs(true);

    try {
      const response = await fetch(`${API_URL}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ ids: nextIds }),
      });

      if (!response.ok) throw new Error("Ошибка при получении документов");

      const docsData = await response.json();
      const okDocs = docsData.filter((doc) => doc.ok).map((doc) => doc.ok);

      setDocuments((prevDocs) => [...prevDocs, ...okDocs]);
      setLoadedCount(offset + nextIds.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingDocs(false);
    }
  };

  const handleLoadMore = () => loadDocuments(publicationIds, loadedCount);

  return (
    <div className="p-4">
      <h2 className="font-ferry text-5xl block w-5/12 mb-8">Ищем. Скоро будут результаты</h2>
      <p className="text-xl mb-8">Поиск может занять некоторое время, просим сохранять терпение.</p>

      {error && <div className="text-red">{error}</div>}

      {summaryData && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold font-ferry mb-5">Общая сводка</h2>
          <table className="table-auto overflow-x-scroll rounded-[20px]">
            <thead>
              <tr className="bg-aqua text-white">
                <th className="border border-aqua px-4 py-2">Период</th>
                {summaryData.data[0].data.map((point, idx) => (
                  <th key={idx} className="border border-aqua px-4 py-2">
                    {new Date(point.date).toLocaleDateString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaryData.data.map((hist, idx) => (
                <tr key={idx}>
                  <td className="border border-aqua px-4 py-2 bg-aqua text-white font-semibold">
                    {idx === 0 ? "Всего" : "Риски"}
                  </td>
                  {hist.data.map((point, i) => (
                    <td key={i} className="border border-aqua px-4 py-2 text-center">
                      {point.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-ferry font-semibold mb-4">Список документов</h2>
        <div className="grid grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <article
              key={idx}
              className="shadow-lg rounded-xl p-6 bg-white flex flex-col justify-between overflow-hidden"
            >
              <header className="text-sm text-gray mb-2">
                <span>{new Date(doc.issueDate).toLocaleDateString()}</span>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 underline"
                >
                  {doc.source.name}
                </a>
              </header>

              <h3 className="text-2xl font-semibold mb-2">{doc.title.text}</h3>

              <div className="mb-2">
                {doc.attributes?.isTechNews && (
                  <span className="inline-block bg-orange text-white text-xs px-2 py-1 rounded">
                    Технические новости
                  </span>
                )}
                {doc.attributes?.isAnnouncement && (
                  <span className="inline-block bg-orange text-white text-xs px-2 py-1 rounded ml-1">
                    Анонсы и события
                  </span>
                )}
                {doc.attributes?.isDigest && (
                  <span className="inline-block bg-orange text-white text-xs px-2 py-1 rounded ml-1">
                    Сводки новостей
                  </span>
                )}
              </div>

              {doc.content.image && (
                <img
                  src={doc.content.image}
                  alt={doc.title.text}
                  className="rounded-lg object-cover w-full h-40 mb-3"
                />
              )}

              <p className="text-gray flex-grow mb-4">
                 {cleanAndTruncate(doc.content.markup)}
              </p>

              <footer className="flex justify-between items-center text-sm text-gray">
                <button
                  onClick={() => window.open(doc.url, "_blank")}
                  className="bg-lightAqua px-4 py-2 text-black rounded-lg hover:opacity-90 transition"
                >
                  Читать в источнике
                </button>
                <span>{doc.attributes?.wordCount} слова</span>
              </footer>
            </article>
          ))}
        </div>

        {isLoadingDocs && <div>Загрузка документов...</div>}

        {!isLoadingDocs && loadedCount < publicationIds.length && (
          <button onClick={handleLoadMore} className="w-full bg-violet text-white py-2 px-4 rounded-md">Показать больше</button>
        )}
      </section>
    </div>
  );
}