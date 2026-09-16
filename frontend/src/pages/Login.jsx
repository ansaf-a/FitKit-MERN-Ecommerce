import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { loginUser } from "../services/api.js";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await loginUser(form);
      localStorage.setItem("fitkit-token", response.data.token);
      localStorage.setItem("fitkit-user", JSON.stringify(response.data.user));
      navigate("/products");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  }

  return (
    <div className="products-page">
      <Navbar />
      <main className="auth-main">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Log in.</h1>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className="details-add-button" type="submit">
            Login
          </button>
          {message && <p className="admin-message">{message}</p>}
          <p className="auth-switch">
            New to FitKit? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
