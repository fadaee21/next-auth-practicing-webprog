import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link href={"/"} className="navbar-brand">
            MY-SITE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/posts"
                  className={`nav-link ${
                    pathname === "/posts" ? "active" : ""
                  }`}
                >
                  Posts
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {user ? (
                <>
                  <span className="me-3">welcome {user.name}</span>
                  <button onClick={logout} className="btn btn-sm btn-dark">
                    logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="btn btn-sm btn-outline-secondary me-2 "
                  >
                    login
                  </Link>
                  <Link href="/auth/register" className="btn btn-sm btn-dark ">
                    register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
