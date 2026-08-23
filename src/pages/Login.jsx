import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../actions/userActions";
import "../style/auth.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginLoading, loginError } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      LOGIN(
        formData,
        () => {
          console.log("Login successful");
          navigate("/dashboard");
        },
        (error) => {
          console.log("Login failed:", error);
        }
      )
    );
  };


  return (
    <div className="auth-page container-fluid">
      <div className="auth-grid row g-0">

        {/* LEFT SIDE */}
        <div className="auth-intro col-lg-6 d-none d-lg-flex">
          <div className="auth-intro-content">

            <div className="auth-brand">
              <div className="auth-brand-mark">
                <span>A</span>
              </div>

              <div>
                <div className="auth-brand-name">
                  AMAZANO
                </div>

                <div className="auth-brand-subtitle">
                  WAREHOUSE CONTROL
                </div>
              </div>
            </div>

            <div className="auth-intro-main">

              <span className="auth-kicker">
                <span className="status-dot" />
                WAREHOUSE OPERATIONS
              </span>

              <h1>
                Your warehouse.
                <br />
                <span>Under control.</span>
              </h1>

              <p>
                Manage inventory, orders, stock movement,
                suppliers and warehouse operations from one
                centralized control panel.
              </p>

            </div>

            <div className="auth-system-status">

              <div className="system-status-header">
                <span>SYSTEM STATUS</span>
                <span className="status-online">
                  ONLINE
                </span>
              </div>

              <div className="system-status-line">
                <span>
                  <span className="status-dot small" />
                  Warehouse services
                </span>

                <span className="status-value">
                  READY
                </span>
              </div>

              <div className="system-status-line">
                <span>
                  <span className="status-dot small" />
                  Inventory control
                </span>

                <span className="status-value">
                  ACTIVE
                </span>
              </div>

              <div className="system-status-line">
                <span>
                  <span className="status-dot small" />
                  Operations console
                </span>

                <span className="status-value">
                  SECURE
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-side col-lg-6">

          <div className="auth-form-container">

            {/* Mobile Brand */}
            <div className="auth-mobile-brand d-lg-none">
              <div className="auth-brand-mark">
                <span>A</span>
              </div>

              <div>
                <div className="auth-brand-name">
                  AMAZANO
                </div>

                <div className="auth-brand-subtitle">
                  WAREHOUSE CONTROL
                </div>
              </div>
            </div>

            <div className="auth-form-header">

              <span className="auth-form-label">
                SECURE ACCESS
              </span>

              <h2>
                Welcome back
              </h2>

              <p>
                Sign in to access your warehouse control
                panel.
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div className="auth-field">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    <i className="bi bi-envelope" />
                  </span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="auth-field">

                <div className="auth-label-row">

                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      console.log("Forgot password")
                    }
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    <i className="bi bi-lock" />
                  </span>

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    className="auth-input password-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    <i
                      className={
                        showPassword
                          ? "bi bi-eye-slash"
                          : "bi bi-eye"
                      }
                    />
                  </button>

                </div>

              </div>

              {/* REMEMBER */}
              <div className="form-check auth-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />

                <label
                  className="form-check-label"
                  htmlFor="rememberMe"
                >
                  Keep me signed in
                </label>

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn auth-submit w-100"
              >
                <span>
                  SIGN IN
                </span>

                <i className="bi bi-arrow-right" />
              </button>

            </form>

            {/* REGISTER */}
            <div className="auth-switch">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create account
              </Link>

            </div>

            {/* FOOTER */}
            <div className="auth-footer">

              <span className="status-dot small" />

              <span>
                Warehouse system online
              </span>

              <span className="auth-footer-divider">
                •
              </span>

              <span>
                Secure access
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;