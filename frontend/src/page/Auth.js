import axios from 'axios';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [isShow, setIsShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevKonten) => ({
      ...prevKonten, // Salin seluruh properti objek konten
      [name]: value, // Perbarui nilai properti yang sesuai dengan name
    }));
  };
  const handleSubmit = () => {
    axios
      .post('http://localhost:4000/api/v1/login', form)
      .then((res) => {
        localStorage.setItem('token', res.data.content);
        navigate('/', { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-blueTwo">
      <div className="flex flex-col items-center justify-center h-screen gap-4 font-bold align-middle">
        <div className="text-4xl text-blueOne ">LOGIN</div>
        <div className="flex justify-center bg-white rounded-md shadow-md w-80">
          <div className="flex w-[80%] flex-col items-center align-middle justify-center gap-4 py-8">
            <div className="text-black">
              <label className="font-medium capitalize"> Username </label>
              <input
                value={form.username}
                name="username"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="username"
                className="w-full px-3 py-2 text-gray-700 border border-blue-100 rounded shadow-sm appearance-none focus-visible:shadow-md focus:outline-none focus:border-white"
              />
            </div>
            <div className="text-black">
              <label className="font-medium capitalize"> Password </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={form.password}
                onChange={(e) => handleChange(e)}
                className="w-full px-3 py-2 text-gray-700 border border-blue-100 rounded shadow-sm appearance-none focus-visible:shadow-md focus:outline-none focus:border-white"
              />
            </div>
            <button onClick={handleSubmit} className="w-full py-2 text-white duration-300 ease-in-out bg-blueOne hover:shadow-md hover:scale-90 hover:bg-blue-500 hover:border-blue-500">
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
