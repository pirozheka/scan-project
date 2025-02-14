export default function Cover() {

    return (
        <div className="flex justify-between items-center px-14 font-inter">
            <div className="max-w-[750px]">
                <h1 className="font-ferry font-bold text-6xl">сервис по поиску публикаций о&nbsp;компании по&nbsp;его&nbsp;ИНН</h1>
                <p className="mt-5 text-xl">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                <button className="bg-violet text-[white] mt-20 text-[22px] px-16 py-3 rounded-md">Запросить данные</button>
            </div>
            <div>
                <img src="assets/cover_img.png" alt="" />
            </div>           
        </div>
    );
}