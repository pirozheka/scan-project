import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function validateINN(inn) {
    const trimmed = inn.trim();
    const isDigits = /^\d+$/.test(trimmed);
    if (!isDigits) return false;
    return trimmed.length === 10 || trimmed.length === 12;
}

export default function SearchPage() {
    const { isLoggedIn } = useUser();
    const navigate = useNavigate();

    // При загрузке проверяем авторизацию
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/"); // редирект на главную
        }
    }, [isLoggedIn, navigate]);

    // Обязательные поля
    const [inn, setInn] = useState("");
    const [tonality, setTonality] = useState("any");
    const [documentCount, setDocumentCount] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    // Необязательные
    const [maxFullness, setMaxFullness] = useState(false);
    const [inBusinessNews, setInBusinessNews] = useState(false);
    const [mainRole, setMainRole] = useState(false);
    const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
    const [techNews, setTechNews] = useState(false);
    const [announcements, setAnnouncements] = useState(false);
    const [newsDigests, setNewsDigests] = useState(false);

    // Сообщения об ошибках
    const [innError, setInnError] = useState("");
    const [dateError, setDateError] = useState("");
    const [countError, setCountError] = useState("");

    // Валидация
    useEffect(() => {
        // Проверка ИНН
        if (inn.length > 0 && !validateINN(inn)) {
            setInnError("Некорректный ИНН (нужно 10 или 12 цифр).");
        } else {
            setInnError("");
        }

        // Проверка количества документов
        if (documentCount && (documentCount < 1 || documentCount > 1000)) {
            setCountError("Значение должно быть в диапазоне от 1 до 1000.");
        } else {
            setCountError("");
        }

        // Проверка дат
        let dateErrMsg = "";
        const now = new Date().toISOString().split("T")[0];
        if (dateFrom && dateFrom > now) {
            dateErrMsg = "Введите корректные данные";
        }
        if (dateTo && dateTo > now) {
            dateErrMsg = "Введите корректные данные";
        }
        if (dateFrom && dateTo && dateFrom > dateTo) {
            dateErrMsg = "Введите корректные данные";
        }
        setDateError(dateErrMsg);
    }, [inn, documentCount, dateFrom, dateTo]);

    // Проверяем, что все обязательные поля заполнены и нет ошибок
    const isFormValid = () => {
        if (!inn || !tonality || !documentCount || !dateFrom || !dateTo) return false;
        if (innError || countError || dateError) return false;
        return true;
    };


    // Обработка отправки
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
      
        // Форматируем даты: из "YYYY-MM-DD" добавляем время и часовой пояс.
        const formattedDateFrom = dateFrom + "T00:00:00+03:00";
        const formattedDateTo = dateTo + "T23:59:59+03:00";
      
        const searchParams = {
          issueDateInterval: {
            startDate: formattedDateFrom,
            endDate: formattedDateTo,
          },
          searchContext: {
            targetSearchEntitiesContext: {
              targetSearchEntities: [
                {
                  type: "company",
                  inn: Number(inn),
                  maxFullness: maxFullness,
                  inBusinessNews: inBusinessNews,
                  sparkId: null,
                  entityId: null,
                },
              ],
              onlyMainRole: mainRole,
              tonality: tonality,
              onlyWithRiskFactors: onlyWithRiskFactors,
            },
          },
          attributeFilters: {
            excludeTechNews: !techNews,
            excludeAnnouncements: !announcements,
            excludeDigests: !newsDigests,
          },
          similarMode: "none",
          limit: Number(documentCount),
          sortType: "sourceInfluence",
          sortDirectionType: "desc",
          intervalType: "month",
          histogramTypes: ["totalDocuments", "riskFactors"],
        };
      
        navigate("/search/results", { state: { searchParams }});
      };

    return (
        <div className="flex flex-col items-left py-10 px-4 md:px-20">
            <div className="md:w-3/4 md:pr-10 mb-10 md:mb-0">
                <h1 className="font-ferry text-4xl md:text-5xl font-bold text-black mb-4">
                    Найдите необходимые данные в пару кликов.
                </h1>
                <p className="mb-6 w-1/2">
                    Задайте параметры поиска. Чем&nbsp;больше&nbsp;заполните,&nbsp;тем&nbsp;точнее&nbsp;поиск.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4 max-w-2xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Левая колонка – поля ввода */}
                    <div className="flex flex-col gap-4">
                        {/* ИНН */}
                        <div>
                            <label className="block mb-1 font-semibold">
                                ИНН <span className="text-red">*</span>
                            </label>
                            <input
                                type="text"
                                value={inn}
                                onChange={(e) => setInn(e.target.value)}
                                className={`w-full p-2 border rounded ${innError ? "border-red" : "border-gray"}`}
                            />
                            {innError && <p className="text-red text-sm mt-1">{innError}</p>}
                        </div>

                        {/* Тональность */}
                        <div>
                            <label className="block mb-1 font-semibold">
                                Тональность <span className="text-red">*</span>
                            </label>
                            <select
                                value={tonality}
                                onChange={(e) => setTonality(e.target.value)}
                                className="w-full p-2 border border-gray rounded"
                            >
                                <option value="positive">Позитивная</option>
                                <option value="negative">Негативная</option>
                                <option value="any">Любая</option>
                            </select>
                        </div>

                        {/* Количество документов */}
                        <div>
                            <label className="block mb-1 font-semibold">
                                Количество документов в выдаче <span className="text-red">*</span>
                            </label>
                            <input
                                type="number"
                                value={documentCount}
                                onChange={(e) => setDocumentCount(e.target.value)}
                                className={`w-full p-2 border rounded ${countError ? "border-red" : "border-gray"}`}
                            />
                            {countError && <p className="text-red text-sm mt-1">{countError}</p>}
                        </div>

                        {/* Даты */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">
                                Диапазон поиска <span className="text-red">*</span>
                            </label>
                            <div className="flex items-center gap-5">
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="w-28 p-2 border border-gray rounded"
                                />
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="w-28 p-2 border border-gray rounded"
                                />
                            </div>
                            {dateError && <p className="text-red text-sm mt-1">{dateError}</p>}
                        </div>
                    </div>

                    {/* Правая колонка – чекбоксы и кнопка (только для десктопа) */}
                    <div className="hidden md:flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-2">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={maxFullness}
                                    onChange={() => setMaxFullness(!maxFullness)}
                                />
                                Признак максимальной полноты
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={inBusinessNews}
                                    onChange={() => setInBusinessNews(!inBusinessNews)}
                                />
                                Упоминания в бизнес-контексте
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={mainRole}
                                    onChange={() => setMainRole(!mainRole)}
                                />
                                Главная роль в публикации
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={onlyWithRiskFactors}
                                    onChange={() => setOnlyWithRiskFactors(!onlyWithRiskFactors)}
                                />
                                Публикации только с риск-факторами
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={techNews}
                                    onChange={() => setTechNews(!techNews)}
                                />
                                Включать технические новости
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={announcements}
                                    onChange={() => setAnnouncements(!announcements)}
                                />
                                Включать анонсы и календари
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={newsDigests}
                                    onChange={() => setNewsDigests(!newsDigests)}
                                />
                                Включать сводки новостей
                            </label>
                        </div>

                        <div className="mt-auto flex justify-end">
                            <button
                                type="submit"
                                disabled={!isFormValid()}
                                className={`py-2 px-4 w-52 rounded-md text-white ${isFormValid() ? "bg-violet" : "bg-violet opacity-40 cursor-not-allowed"}`}
                            >
                                Поиск
                            </button>
                        </div>
                    </div>
                </div>

                {/* Кнопка поиска для мобильной версии */}
                <div className="md:hidden mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`py-2 px-4 w-52 rounded-md text-white ${isFormValid() ? "bg-violet" : "bg-violet opacity-40 cursor-not-allowed"}`}
                    >
                        Поиск
                    </button>
                </div>
            </form>
            <img src="assets/search-img.png" alt="" className="mt-20 md:mt-0 md:w-3/12 md:absolute md:right-0 md:bottom-44"/>
        </div>
    );
}
