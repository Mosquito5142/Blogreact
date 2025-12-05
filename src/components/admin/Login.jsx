import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("เข้าสู่ระบบสำเร็จ!");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="masthead text-3xl">The Vachiravit</h1>
          </Link>
          <div className="newspaper-divider max-w-[100px] mx-auto"></div>
          <p className="text-base-content/60 italic mt-4">เข้าสู่ระบบผู้ดูแล</p>
        </div>

        {/* Login Card */}
        <div className="newspaper-card bg-base-100 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 border border-accent text-accent text-center text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="section-label block mb-2">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="vintage-input w-full"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="section-label block mb-2">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="vintage-input w-full"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="vintage-btn w-full disabled:opacity-50"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="newspaper-divider"></div>

          {/* Back to Home */}
          <Link
            to="/"
            className="block text-center text-base-content/60 hover:text-accent transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-base-content/50 mt-6 italic">
          สำหรับผู้ดูแลระบบเท่านั้น
        </p>
      </div>
    </div>
  );
}

export default Login;
