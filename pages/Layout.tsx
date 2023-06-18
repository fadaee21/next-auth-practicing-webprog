import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Children } from "../type";

const Layout = ({ children }: Children) => {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <>
      <Header />
      {children}
      <ToastContainer />
    </>
  );
};

export default Layout;
