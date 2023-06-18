import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [c_password, setC_password] = useState("");
  const { register, errAuth, loadingAuth } = useAuth();
  useEffect(() => {
    if (!!errAuth.length) toast.error(errAuth);
  }, [errAuth]);

  const validate = [name, password, email, c_password].every(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate) {
      toast.error("name,email,password is required");
    }
    if (password !== c_password) {
      toast.error("passwords are not equal");
    }
    register({ name, email, password, c_password });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form className="col-md-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="c_password" className="form-label">
              confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="c_password"
              onChange={(e) => setC_password(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!validate}
          >
            Register{" "}
            {loadingAuth && (
              <div className="spinner-border spinner-border-sm" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
