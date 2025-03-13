import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");

  // Поля для формы входа
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Обработчик отправки формы входа
  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ login: username, password: password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenExpire", data.expire);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        throw new Error(data.message || "Ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка аутентификации:", error);
      setErrorMessage(error.message || "Ошибка при входе");
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    alert("Здесь будет логика регистрации");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 md:p-12">
        <div className="hidden md:flex flex-col items-center">
          <h1 className="font-ferry font-bold text-4xl md:text-5xl mb-6">
            Для оформления подписки на тариф, необходимо авторизоваться.
          </h1>
          <img className="w-72" src="assets/characters.png" alt="Авторизация" />
        </div>
        <div className="w-full md:w-10/12 p-4 border-1 border-gray shadow-lg">
          <img className="w-16 mx-auto mb-4" src="assets/lock2.png" alt="Lock" />

          <div className="flex justify-center gap-8 mb-6">
            <button
              className={`pb-2 ${
                activeTab === "login"
                  ? "text-aqua border-b-2 border-aqua font-bold"
                  : "text-gray"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Войти
            </button>
            <button
              className={`pb-2 ${
                activeTab === "register"
                  ? "text-aqua border-b-2 border-aqua font-bold"
                  : "text-gray"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Зарегистрироваться
            </button>
          </div>

          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray">Логин или телефон:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(false);
                  }}
                  className={`w-full p-2 border rounded ${
                    usernameError ? "border-red" : "border-gray"
                  }`}
                />
                {usernameError && (
                  <p className="text-red text-sm">
                    Введите корректные данные
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray">Пароль:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full p-2 border rounded ${
                    passwordError ? "border-red" : "border-gray"
                  }`}
                />
                {passwordError && (
                  <p className="text-red text-sm">
                    Введите правильный пароль
                  </p>
                )}
              </div>

              {errorMessage && (
                <p className="text-red text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-violet text-white py-2 rounded disabled:opacity-40"
                disabled={!username || !password}
              >
                Войти
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <p className="text-sm text-gray">
                Здесь будет форма регистрации.
              </p>
              <button
                type="submit"
                className="w-full bg-violet text-white py-2 rounded"
              >
                Зарегистрироваться
              </button>
            </form>
          )}

          {activeTab === "login" && (
            <a
              href="#"
              className="text-violet text-sm block text-center mt-2 underline"
            >
              Восстановить пароль
            </a>
          )}

          {activeTab === "login" && (
            <div className="mt-4 text-center">
              <p className="text-black opacity-35 text-left">Войти через:</p>
              <div className="flex justify-left gap-2 mt-2">
                <button className="border border-blue-600 rounded p-2">
                  <img src="assets/google.png" alt="Google" />
                </button>
                <button className="border border-blue-600 rounded p-2">
                  <img src="assets/fb.png" alt="Facebook" />
                </button>
                <button className="border border-blue-600 rounded p-2">
                  <img src="assets/yandex.png" alt="Yandex" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
