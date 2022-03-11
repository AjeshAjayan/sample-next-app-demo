import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../../models/http-methods";

type HttpMethodsInput = {
  post?: (req: NextApiRequest, res: NextApiResponse) => void;
  put?: (req: NextApiRequest, res: NextApiResponse) => void;
  get?: (req: NextApiRequest, res: NextApiResponse) => void;
  del?: (req: NextApiRequest, res: NextApiResponse) => void;
  error?: (req: NextApiRequest, res: NextApiResponse) => void;
};

export default function handleHttpMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  callbacks: HttpMethodsInput
) {
  switch (req.method) {
    case HttpMethod.POST:
      if (callbacks.post) {
        callbacks.post(req, res);
      } else {
        throw "post callback can't be undefined";
      }
      break;
    case HttpMethod.PUT:
      if (callbacks.put) {
        callbacks.put(req, res);
      } else {
        throw "put callback can't be undefined";
      }
      break;
    case HttpMethod.GET:
      if (callbacks.get) {
        callbacks.get(req, res);
      } else {
        throw "get callback can't be undefined";
      }
      break;
    case HttpMethod.DELETE:
        if (callbacks.del) {
            callbacks.del(req, res);
          } else {
            throw "delete callback can't be undefined";
          }
      break;
    default:
        if(callbacks.error) {
            callbacks.error(req, res);
        }
        throw `${req.method} is not handled in callbacks`
      break;
  }
}
