import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
    body,
  } = req;
  switch (method) {
    case "PATCH":
      // Get data from your database
      console.log("PATCH api routes", id, body);

      const optionsPatch = {
        url: `${process.env.HOST}/tasks/${id}`,
        method: "PATCH",
        data: body,
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      };
      const r1: AxiosResponse<number> = await axios(optionsPatch);
      const { data: patchedId } = r1;
      console.log(patchedId, "patch");
      res.status(200).json(patchedId);
      // res.status(200).json(5624);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    case "DELETE":
      // Update or create data in your database
      console.log("DELETE api routes", id);

      const optionsDelete = {
        url: `${process.env.HOST}/tasks/${id}`,
        method: "DELETE",
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      };
      const r3: AxiosResponse<number> = await axios(optionsDelete);
      const { data: deletedId } = r3;
      console.log(deletedId, "delete");
      res.status(200).json(deletedId);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
