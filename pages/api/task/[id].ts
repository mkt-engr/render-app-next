import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body,
  } = req;
  switch (method) {
    case "PATCH":
      // Update data
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
      break;

    case "DELETE":
      // Delete data in your database
      const optionsDelete = {
        url: `${process.env.HOST}/tasks/${id}`,
        method: "DELETE",
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      };
      const r3: AxiosResponse<number> = await axios(optionsDelete);
      const { data: deletedId } = r3;
      res.status(200).json(deletedId);
      break;

    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
