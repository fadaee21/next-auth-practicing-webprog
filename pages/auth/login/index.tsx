import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, errAuth, loadingAuth } = useAuth();
  useEffect(() => {
    if (!!errAuth.length) toast.error(errAuth);
  }, [errAuth]);

  const validate = [password, email].every(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate) {
      toast.error("email,password is required");
    }

    login({ email, password });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form className="col-md-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!validate}
          >
            Login{" "}
            {loadingAuth && (
              <div className="spinner-border spinner-border-sm" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
