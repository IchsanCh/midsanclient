import React, { useState, useEffect } from "react";
import { Eye, EyeOff, CreditCard, Shield, Lock, Mail } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Cek apakah user sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Email dan password tidak boleh kosong!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:1031/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary/20 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 border border-accent rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-primary/20 rounded-full"></div>
      </div>

      <div className="card w-full max-w-md bg-base-100 shadow-2xl relative z-10">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PayGasm
              </span>
            </div>
            <h1 className="text-3xl font-bold text-base-content">
              Welcome Back
            </h1>
            <p className="text-base-content/70 mt-2">
              Sign in to your payment dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  className="input input-bordered w-full pl-12 focus:input-primary"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-12 pr-12 focus:input-primary"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors">
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary w-full btn-lg group hover:shadow-lg transition-all duration-300">
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Sign In Securely
                </>
              )}
            </button>
          </div>
          {/* Footer */}
          <div className="text-center mt-4 pt-2 border-t border-base-300">
            <Link to="/" className="btn btn-error">
              Back to Home
            </Link>
            <p className="text-xs text-base-content/50 mt-2">
              &copy; 2025 PayGasm. Secure payment processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
