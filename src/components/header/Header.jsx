import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { AccountInfo } from './AccountInfo';


export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExpire = localStorage.getItem('tokenExpire');
      const now = new Date();

      if (!tokenExpire || new Date(tokenExpire) <= now) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [setIsLoggedIn]);

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <header className='flex justify-between items-center px-6 py-4 bg-teal-700 text-white relative'>
      <a href='/'>
        <img src='assets/logo.png' alt='Logo' className='h-20'/>
      </a>
      <div className='md:hidden text-aqua'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav className='hidden md:flex w-60 text-black items-center justify-between'>
        <a href='/'>Главная</a>
        <a href='/'>Тарифы</a>
        <a href='/'>FAQ</a>
      </nav>
      <div className='hidden md:flex items-center gap-2'>
        {isLoggedIn ? (
          <div className='flex items-center gap-4'>
            <AccountInfo />
            <span className='font-semibold text-aqua'>Профиль</span>
            <button
              className='text-black opacity-40'
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tokenExpire');
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <>
            <a href='#' className='opacity-40 text-black'>Зарегистрироваться</a>
            <div className='w-[2px] h-[26px] bg-lightAqua'></div>
            <button onClick={handleLoginClick} className='block bg-lightAqua px-3 py-1 rounded-md'>Войти</button>
          </>
        )}
      </div>
      {isMenuOpen && (
        <div className='absolute top-0 left-0 w-full h-96 bg-aqua flex flex-col items-center justify-center text-white z-50'>
          <div className='absolute top-0 left-0 flex justify-between w-full items-center'>
            <img src="assets/logo-footer.png" alt="" className='ml-5 w-28 h-24' />
            <button onClick={() => setIsMenuOpen(false)}>
              <FiX size={32} />
            </button>
          </div>
                    
          <a href='/' className='text-lg py-2 mt-5'>Главная</a>
          <a href='/' className='text-lg py-2'>Тарифы</a>
          <a href='/' className='text-lg py-2'>FAQ</a>
          <a href='#' className='opacity-40 py-2'>Зарегистрироваться</a>
          <button onClick={handleLoginClick} className='bg-lightAqua text-black px-5 py-2 rounded-md mt-4'>Войти</button>
        </div>
      )}
    </header>
  );
}
