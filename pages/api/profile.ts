import type { NextApiRequest, NextApiResponse } from "next";
import { Profie } from "../../models/profile";
import axois from "axios";
import { ServerResponse } from "../../models/server-response";
import handleHttpMethods from "../../lib/handle-http-methods";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse<Profie>>
) {
  handleHttpMethods(req, res, {
    post: () => {
      res.status(200).json({
        result: {
          name: "John Doe",
        },
      });
    },
    error: () => {
      res.status(404).json({
        status: 404,
        message: "Something went wrong",
      });
    },
  });
}

export async function getProfile(
  email: string,
  password: string
): Promise<ServerResponse<Profie>> {
  return axois.post("/api/profile", { email, password });
}
