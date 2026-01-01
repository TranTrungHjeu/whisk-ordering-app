import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Phone } from "@phosphor-icons/react";
import Modal from "../components/Modal";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    text: "",
    type: "info",
  });
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (title, text, type = "info") => {
    setModalContent({ title, text, type });
    setModalOpen(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.phone || !formData.password) {
      showModal("Lỗi", "Vui lòng điền đầy đủ thông tin", "error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đăng nhập thất bại");
      }

      // Store user info in localStorage (simple approach)
      localStorage.setItem("user", JSON.stringify(data.user));

      showModal("Thành công", "Đăng nhập thành công!", "success");

      setTimeout(() => {
        if (formData.isAdmin && data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      showModal("Đăng nhập thất bại", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Đăng nhập</h2>
        <p className="login-subtitle">Chào mừng trở lại WHISK!</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <Phone size={20} className="form-icon" />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Lock size={20} className="form-icon" />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="admin-check"
              name="isAdmin"
              checked={formData.isAdmin || false}
              onChange={(e) =>
                setFormData({ ...formData, isAdmin: e.target.checked })
              }
            />
            <label htmlFor="admin-check">
              Đăng nhập bằng tài khoản quản lý
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        type={modalContent.type}
      >
        {modalContent.text}
      </Modal>
    </div>
  );
}
