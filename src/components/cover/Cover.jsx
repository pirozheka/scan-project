export default function Cover() {

    return (
        <div className="flex justify-between items-center px-14">
            <div>
                <h1>сервис по поиску публикаций о компании по его ИНН</h1>
                <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                <button>Запросить данные</button>
            </div>
            <div>
                <img src="assets/cover_img.png" alt="" />
            </div>           
        </div>
    );
}