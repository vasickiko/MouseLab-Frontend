import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

type LoginFormData = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post<LoginResponse>("/login", formData);

      localStorage.setItem("token", res.data.token);
      navigate("/add-mouse");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as keyof LoginFormData]: value,
    }));
  };

  return (
    <div className="container mx-auto flex flex-1 items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white/10 p-10 text-white flex flex-col items-center">
        <h1 className="text-2xl font-bold">Login Panel</h1>

        <form
          onSubmit={handleLogin}
          className="mt-6 flex w-full max-w-sm flex-col gap-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-transparent px-4 py-2 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-transparent px-4 py-2 outline-none"
          />

          <button
            type="submit"
            className="rounded-md bg-white py-2 font-semibold text-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;