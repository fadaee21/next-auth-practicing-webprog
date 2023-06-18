import "bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";

import Layout from "./Layout";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
    