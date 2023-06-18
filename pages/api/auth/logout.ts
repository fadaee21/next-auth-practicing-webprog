import type { NextApiRequest, NextApiResponse } from "next";
var cookie = require("cookie");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg: unknown }>
) {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      const resApi = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });
      const data = await resApi.json();
      console.log(data);
      if (resApi.ok) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: new Date(0),
            path: "/",
            sameSite: "Strict",
          })
        );
        res.status(200).json({ msg: "success" });
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

