import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Cover() {
    const { isLoggedIn } = useUser(); 
    const navigate = useNavigate();  

    const handleRequestData = () => {
        navigate('/search');
      };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-14 font-inter">
            {/* Текст */}
            <div className="max-w-[750px] text-center md:text-left">
                <h1 className="font-ferry font-bold text-4xl md:text-5xl lg:text-6xl">
                    сервис по поиску публикаций о&nbsp;компании по&nbsp;его&nbsp;ИНН
                </h1>
                <p className="mt-5 text-lg md:text-xl">
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </p>
                {isLoggedIn && (
                    <button 
                        onClick={handleRequestData}
                        className="bg-violet text-white mt-10 md:mt-20 text-lg md:text-[22px] px-8 md:px-16 py-2 md:py-3 rounded-md">
                        Запросить данные
                    </button>
                )}
            </div>

            {/* Изображение */}
            <div className="mt-8 md:mt-0">
                <img 
                    src="assets/cover_img.png" 
                    alt="Cover" 
                    className="w-full max-w-[400px] md:max-w-none"
                />
            </div>           
        </div>
    );
}