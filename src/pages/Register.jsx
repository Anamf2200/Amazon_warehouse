import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/auth.css";
import { useDispatch } from "react-redux";
import { CREATEUSER } from "../actions/userActions";

const Register = () => {
    const dispatch= useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "employee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.userType,
    };

    dispatch(
        CREATEUSER(
            userData,
            () => {
                alert("Account created successfully");
            },
            (error) => {
                alert(error || "Registration failed");
            }
        )
    );
};

  return (
    <div className="auth-page container-fluid">
      <div className="auth-grid row g-0">

        {/* LEFT SIDE */}
        <div className="auth-intro col-lg-5 d-none d-lg-flex">
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
                NEW OPERATOR
              </span>

              <h1>
                Build your
                <br />
                <span>workspace.</span>
              </h1>

              <p>
                Create your warehouse control account and
                get access to the tools that keep inventory
                moving.
              </p>

            </div>

            <div className="auth-feature-list">

              <div className="auth-feature">
                <div className="feature-icon">
                  <i className="bi bi-box-seam" />
                </div>

                <div>
                  <strong>
                    Inventory control
                  </strong>

                  <span>
                    Track stock across your warehouse.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="feature-icon">
                  <i className="bi bi-truck" />
                </div>

                <div>
                  <strong>
                    Supplier operations
                  </strong>

                  <span>
                    Keep your supply chain organized.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="feature-icon">
                  <i className="bi bi-graph-up" />
                </div>

                <div>
                  <strong>
                    Warehouse reporting
                  </strong>

                  <span>
                    Monitor operations from one console.
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-side col-lg-7">

          <div className="auth-form-container register-container">

            {/* MOBILE BRAND */}
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
                ACCOUNT SETUP
              </span>

              <h2>
                Create account
              </h2>

              <p>
                Set up your access to the warehouse control
                panel.
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <div className="row g-3">

                {/* NAME */}
                <div className="col-md-6">

                  <div className="auth-field">

                    <label htmlFor="name">
                      Full name
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        <i className="bi bi-person" />
                      </span>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="auth-input"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />

                    </div>

                  </div>

                </div>

                {/* EMAIL */}
                <div className="col-md-6">

                  <div className="auth-field">

                    <label htmlFor="registerEmail">
                      Email address
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        <i className="bi bi-envelope" />
                      </span>

                      <input
                        id="registerEmail"
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

                </div>

                {/* PASSWORD */}
                <div className="col-md-6">

                  <div className="auth-field">

                    <label htmlFor="registerPassword">
                      Password
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        <i className="bi bi-lock" />
                      </span>

                      <input
                        id="registerPassword"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        className="auth-input password-input"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
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

                </div>

                {/* CONFIRM PASSWORD */}
                <div className="col-md-6">

                  <div className="auth-field">

                    <label htmlFor="confirmPassword">
                      Confirm password
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        <i className="bi bi-shield-check" />
                      </span>

                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        className="auth-input password-input"
                        placeholder="Confirm your password"
                        value={
                          formData.confirmPassword
                        }
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev
                          )
                        }
                      >
                        <i
                          className={
                            showConfirmPassword
                              ? "bi bi-eye-slash"
                              : "bi bi-eye"
                          }
                        />
                      </button>

                    </div>

                  </div>

                </div>

                {/* USER TYPE */}
                <div className="col-12">

                  <div className="auth-field">

                    <label htmlFor="userType">
                      Account type
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        <i className="bi bi-person-badge" />
                      </span>

                      <select
                        id="userType"
                        name="userType"
                        className="auth-input auth-select"
                        value={formData.userType}
                        onChange={handleChange}
                      >
                        <option value="employee">
                          Employee
                        </option>

                        <option value="teamlead">
                          Team Lead
                        </option>

                        <option value="admin">
                          Administrator
                        </option>
                      </select>

                    </div>

                  </div>

                </div>

                {/* TERMS */}
                <div className="col-12">

                  <div className="form-check auth-check">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      required
                    />

                    <label
                      className="form-check-label"
                      htmlFor="terms"
                    >
                      I understand that this account provides
                      access to the warehouse control system.
                    </label>

                  </div>

                </div>

                {/* BUTTON */}
                <div className="col-12">

                  <button
                    type="submit"
                    className="btn auth-submit w-100"
                  >
                    <span>
                      CREATE ACCOUNT
                    </span>

                    <i className="bi bi-arrow-right" />
                  </button>

                </div>

              </div>

            </form>

            {/* LOGIN */}
            <div className="auth-switch">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign in
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
                Secure account setup
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;