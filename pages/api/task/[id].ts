import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
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
      const r2: AxiosResponse<number> = await axios(optionsDelete);
      const { data: deletedId } = r2;
      console.log(deletedId, "delete");
      res.status(200).json(deletedId);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
