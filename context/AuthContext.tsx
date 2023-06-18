import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextValue, Children, Person } from "../type";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Children) => {
  const [errAuth, setErrAuth] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState<Person | null>(null);

  const { push } = useRouter();
  const handleErr = (msg: any) => {
    const errors = [] as any;
    Object.keys(msg).map((key) => {
      msg[key].map((e: any) => errors.push(e));
    });
    return errors.join();
  };
  const register = async (user: Person) => {
    setErrAuth("");
    setLoadingAuth(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      push("/auth/login");
    } else {
      setErrAuth(handleErr(data.msg));
    }
    setLoadingAuth(false);
  };

  const login = async (user: Partial<Person>) => {
    setErrAuth("");
    setLoadingAuth(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
      push("/");
    } else {
      setErrAuth(handleErr(data.msg));
    }
    setLoadingAuth(false);
  };
  const logout = async () => {
    setErrAuth("");
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      setUser(null);
      push("/");
    } else {
      setErrAuth(handleErr(data.msg));
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setErrAuth("");
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
        // setErrAuth(handleErr(data.msg));
        console.log(data.msg)
      }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        errAuth,
        loadingAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an <AuthContext.Provider>");
  }
  return ctx;
};
