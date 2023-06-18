import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg: unknown; user?: User }>
) {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      const resApi = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(req.body),
      });
      const data = await resApi.json();
      console.log(data);
      if (resApi.ok) {
        res.status(201).json({ msg: "success", user: data.user });
      } else {
        res.status(resApi.status).json({ msg: data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: { err: ["SERVER ERROR"] } });
    }
  } else {
    res.status(405).json({ msg: `method ${req.method} not allowed` });
  }
}
