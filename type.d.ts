export type Children = {
  children: ReactNode;
};

export type AuthContextValue = {
  register: (user: Person) => Promise<void>;
  login: (user: Partial<Person>) => Promise<void>;
  logout: () => Promise<void>;
  errAuth: string;
  loadingAuth: boolean;
  user: Person | null;
};

export interface Person {
  name: string;
  email: string;
  password: string;
  c_password: string;
}

export interface User {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
}
export interface UserResponse {
  user: User;
  token: string;
}

export type Post = {
  id: string;
  title: string;
  body: string;
};
