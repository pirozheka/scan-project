import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Main from './components/main/Main';
import AuthForm from './ui/Auth';
import SearchPage from './search/SearchPage';

function App() {
  const { isLoggedIn, checkUserAuth } = useUser();
  const { userOption, setUserOption } = useUser();

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  return (
    <BrowserRouter>
      <div className="App mx-auto max-w-[1440px] relative">
        <Header />
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} userOption={userOption} />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;