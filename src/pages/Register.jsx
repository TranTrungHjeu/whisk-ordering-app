import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Phone } from "@phosphor-icons/react";
import { api } from "../services/api";
import Modal from "../components/Modal";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  // Constants
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (title, text, type = "info") => {
    setModalContent({ title, text, type });
    setModalOpen(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Frontend validation (basic)
    if (!formData.name || !formData.phone || !formData.password) {
      showModal("Lỗi", "Vui lòng điền đầy đủ thông tin", "error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đăng ký thất bại");
      }

      showModal(
        "Thành công",
        "Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.",
        "success"
      );

      // Navigate on modal close logic or simple timeout
      setTimeout(() => {
        navigate("/login"); // Assuming login page exists or simple redirect
      }, 2000);
    } catch (err) {
      showModal("Đăng ký thất bại", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Đăng ký thành viên</h2>
        <p className="register-subtitle">
          Tham gia WHISK để nhận ưu đãi matcha!
        </p>

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <User size={20} className="form-icon" />
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

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
              placeholder="Mật khẩu (> 6 ký tự)"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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
