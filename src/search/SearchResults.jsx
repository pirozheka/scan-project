import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SearchResults() {
  const { isLoggedIn } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Состояния для сводки, списка ID публикаций и загруженных документов
  const [isLoading, setIsLoading] = useState(true);
  const [summaryData, setSummaryData] = useState(null);
  const [publicationIds, setPublicationIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [error, setError] = useState(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const loadIncrement = 10;

  // Получаем параметры поиска, переданные из формы (через location.state)
  const searchParams = location.state?.searchParams;

  // Если пользователь не авторизован, редирект на страницу авторизации
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  // Запрос сводки и списка ID публикаций
  useEffect(() => {
    const fetchSummaryAndIds = async () => {
      if (!searchParams) {
        setError("Параметры поиска отсутствуют");
        setIsLoading(false);
        return;
      }
      setError(null);
      setIsLoading(true);
      try {
        // 1. Получаем сводку публикаций
        const histResponse = await fetch(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(searchParams)
          }
        );
        if (!histResponse.ok) throw new Error("Ошибка при получении сводки");
        const histData = await histResponse.json();
        setSummaryData(histData);

        // 2. Получаем список ID публикаций
        const idsResponse = await fetch(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(searchParams)
          }
        );
        if (!idsResponse.ok) throw new Error("Ошибка при получении списка публикаций");
        const idsData = await idsResponse.json();
        const ids = idsData.items.map(item => item.encodedId);
        setPublicationIds(ids);

        // 3. Загружаем первые 10 документов
        await loadMoreDocuments(ids, 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaryAndIds();
  }, [searchParams]);

  const loadMoreDocuments = async (idsArray, currentCount) => {
    const nextIds = idsArray.slice(currentCount, currentCount + loadIncrement);
    if (nextIds.length === 0) return;
    setIsLoadingDocs(true);
    try {
      const docsResponse = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/documents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          },
          body: JSON.stringify({ ids: nextIds })
        }
      );
      if (!docsResponse.ok) throw new Error("Ошибка при получении документов");
      const docsData = await docsResponse.json();
      // Фильтруем только успешные результаты (поле ok)
      const okDocs = docsData.filter(doc => doc.ok).map(doc => doc.ok);
      setDocuments(prev => [...prev, ...okDocs]);
      setLoadedCount(currentCount + nextIds.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingDocs(false);
    }
  };

  const handleLoadMore = () => {
    loadMoreDocuments(publicationIds, loadedCount);
  };

  return (
    <div className="p-4">
      {isLoading && (
        <div>
          <h2>Ищем. Скоро будут результаты...</h2>
        </div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}

      {summaryData && (
        <div className="mb-4">
          <h2>Сводка поиска</h2>
          {summaryData.data.map((hist, idx) => (
            <div key={idx} className="mb-2">
              <h3>{hist.histogramType}</h3>
              <div className="flex overflow-x-auto">
                {hist.data.map((point, i) => (
                  <div key={i} className="mr-4">
                    <div>{new Date(point.date).toLocaleDateString()}</div>
                    <div>{point.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2>Публикации</h2>
        {documents.map((doc, index) => (
          <div key={index} className="border p-4 my-2">
            {/* Шапка карточки: дата и источник */}
            <div className="flex justify-between">
              <span>{new Date(doc.issueDate).toLocaleDateString()}</span>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.source.name}
              </a>
            </div>
            {/* Заголовок */}
            <h3>{doc.title.text}</h3>
            {/* Теги в зависимости от атрибутов */}
            <div>
              {doc.attributes?.isTechNews && <span>Технические новости </span>}
              {doc.attributes?.isAnnouncement && <span>Анонсы и события </span>}
              {doc.attributes?.isDigest && <span>Сводки новостей</span>}
            </div>
            {/* Содержимое публикации */}
            <p>{doc.content.markup}</p>
            {/* Футер карточки: кнопка и количество слов */}
            <div className="flex justify-between">
              <button onClick={() => window.open(doc.url, "_blank")}>
                Читать в источнике
              </button>
              <span>{doc.attributes?.wordCount} слова</span>
            </div>
          </div>
        ))}

        {isLoadingDocs && <div>Загрузка документов...</div>}

        {loadedCount < publicationIds.length && !isLoadingDocs && (
          <button onClick={handleLoadMore}>Показать больше</button>
        )}
      </div>
    </div>
  );
}
