import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });

  const navigate = useNavigate();
  const [error, SetError] = useState(null);

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

console.log(input)

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1562/api/auth/register", input);
      console.log(res);
      navigate("/girisyap");
    } catch (err) {
      console.log(err);
      SetError(err.response.data.message);
    }
  };

  useEffect(() => {
    document.title = "ForendonBlog | Kayıt ol";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="mb-6 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={require("../assetes/nexarapng.png")}
          alt="Logo"
          className="h-20 w-20"
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              İsim
            </label>
            <input
              type="text"
              id="name"
              name="username"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="İsminizi girin"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="E-posta adresinizi girin"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Şifrenizi girin"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="img">
              imgurl
            </label>
            <input
              type="text"
              id="img"
              name="img"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="img"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              onClick={handlesubmit}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Giriş Yap
            </button>
            <p className="pt-4 text-red-400">{error ? error : ""}</p>
            <p className="pt-4 text-[#000000a6]">
              Hesabınız var mı?{" "}
              <span
                className="text-green-500 cursor-pointer hover:underline"
                onClick={() => navigate("/girisyap")}
              >
                Giriş yap
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
