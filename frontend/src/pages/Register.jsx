import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { registerUser } from "../services/api.js";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await registerUser(form);
      localStorage.setItem("fitkit-token", response.data.token);
      localStorage.setItem("fitkit-user", JSON.stringify(response.data.user));
      navigate("/products");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  }

  return (
    <div className="products-page">
      <Navbar />
      <main className="auth-main">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <p className="eyebrow">JOIN FITKIT</p>
          <h1>Create account.</h1>
          {["name", "email", "password"].map((field) => (
            <label key={field}>
              {field}
              <input
                name={field}
                type={field === "password" ? "password" : field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </label>
          ))}
          <button className="details-add-button" type="submit">
            Register
          </button>
          {message && <p className="admin-message">{message}</p>}
          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Register;
