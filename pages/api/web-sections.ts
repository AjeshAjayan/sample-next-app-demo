import { NextApiRequest, NextApiResponse } from "next";
import handleHttpMethods from "../../lib/utils/handle-http-methods";
import dbConnect from "../../lib/db-context";
import PageSection from "../../schemas/page-sections";
import generateResponse from "../../lib/utils/generate-response";
import axios from "axios";
import { ServerResponse } from "../../models/server-response";
import { SectionState } from "../../models/section.interface";
import Axios from "../../lib/axios";

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

async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pageSection = await PageSection.updateOne({ _id: req.query.id }, req.body)
    res.status(200).json(
      generateResponse(undefined, 200, "Updated successfully", pageSection)
    );
  } catch(err) {
    error(req, res);
  }
}

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

async function del(req: NextApiRequest, res: NextApiResponse) {
  try {
    await PageSection.deleteOne({ _id: req.query.id });
    res.status(200).json(
      generateResponse(undefined, 200, "Deleted successfully", null)
    );
  } catch(err) {
    error(req, res);
  }
}

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
  return new Promise((resolve, reject) =>{
    Axios.getInstance().get("web-sections")
      .then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err);
      })
  });
}

export function addWebSections(
  section: SectionState
): Promise<ServerResponse<SectionState>> {
  return new Promise((resolve, reject) =>{
    Axios.getInstance().post("web-sections", section)
      .then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err);
      })
  });
}

export function updateWebSection(sectionState: SectionState): Promise<ServerResponse<SectionState>> {
  return new Promise((resolve, reject) =>{
    Axios.getInstance().put(`web-sections?id=${sectionState._id}`, sectionState)
      .then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err);
      })
  });
}

export function deleteWebSection(id: string): Promise<ServerResponse<null>> {
  return new Promise((resolve, reject) =>{
    Axios.getInstance().delete(`web-sections?id=${id}`)
      .then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err);
      })
  });
}
