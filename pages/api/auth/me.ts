import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg: unknown; user?: User }>
) {
  if (req.method === "GET") {
    if (!req.cookies.token) {
      res.status(403).json({ msg: { err: ["Not Authorized"] } });
      return
    }
    try {
      const resApi = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });
      const data = await resApi.json();
      if (resApi.ok) {
        res.status(200).json({ msg: "success", user: data.user });
      } else {
        res.status(resApi.status).json({ msg: { err: ["User Forbidden"] } });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: { err: ["SERVER ERROR"] } });
    }
  } else {
    res.status(405).json({ msg: `method ${req.method} not allowed` });
  }
}
