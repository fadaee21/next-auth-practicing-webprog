import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../type";
var cookie = require("cookie");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg: unknown; user?: User }>
) {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      const resApi = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(req.body),
      });
      const data = await resApi.json();
      if (resApi.ok) {
        // Set a new cookie with the name
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.token, {
            httpOnly: true, //js can not get it
            // below code means https enable only for production
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
            sameSite: "Strict"
          })
        );
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
