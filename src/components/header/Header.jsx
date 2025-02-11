import './header.css';

export default function Header() {

    return (
        <div className='flex justify-between items-center px-14'>
            <a href="/">
                <img src="assets/logo.png" alt="" />
            </a>

            <div className='flex w-60 items-center justify-between'>
                <a href="/">Главная</a>
                <a href="/">Тарифы</a>
                <a href="/">FAQ</a>
            </div>
            <div className='flex items-center gap-2'>
                <a href="/" className='opacity-40'>Зарегистрироваться</a>
                <div className='w-[2px] h-[26px] bg-lightAqua'></div>
                <a href="/" className='block bg-lightAqua px-3 py-1 rounded-md'>Войти</a>
            </div>
        </div>
    );
}