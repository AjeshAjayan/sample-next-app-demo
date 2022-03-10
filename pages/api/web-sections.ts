import { NextApiRequest, NextApiResponse } from "next";
import handleHttpMethods from "../../lib/handle-http-methods";
import dbConnect from "../../lib/db-context";
import PageSection from "../../schemas/page-sections";
import generateResponse from "../../lib/generate-response";
import axios from "axios";
import { ServerResponse } from "../../models/server-response";
import { SectionState } from "../../models/section.interface";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const pageSection = await PageSection.find({});
  res
    .status(200)
    .json(
      generateResponse(
        undefined,
        200,
        "Page section fetched successfully",
        pageSection
      )
    );
}

function put(req: NextApiRequest, res: NextApiResponse) {}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const pageSection = new PageSection({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
  });

  try {

    await pageSection.save();
  
    res
      .status(200)
      .json(
        generateResponse(
          undefined,
          200,
          "Page section created successfully",
          pageSection
        )
      );
  } catch(err: any) {
    if(err.name === "ValidationError") {
      res.status(400).send(generateResponse([], 400, "Validation error", err) );
    } else {
      error(req, res);
    }
  }
}

function del(req: NextApiRequest, res: NextApiResponse) {}

function error(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).send(generateResponse([], 500, "Error", {}) );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(process.env.MONGODB_URI as string);
  handleHttpMethods(req, res, {
    get,
    post,
    put,
    del,
    error,
  });
}

export function getWebSections(): Promise<ServerResponse<SectionState[]>> {
  return axios.get("/api/web-sections");
}

export function addWebSections(
  section: SectionState
): Promise<ServerResponse<SectionState>> {
  return axios.post("http://localhost:3000/api/web-sections", section);
}
