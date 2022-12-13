// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../@types/type";

type Data = Task[] | Task;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      console.log(process.env.HOST, "api routes");
      // Get data from your database
      const options = {
        url: `${process.env.HOST}/tasks`,
        method: "GET",
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      };
      const r: AxiosResponse<Task[]> = await axios.get(
        `${process.env.HOST}/tasks`
      );
      const { data, status } = r;
      res.status(200).json(data);
      break;
    case "POST":
      console.log("POST", body);
      // Get data from your database
      const optionsPost = {
        url: `${process.env.HOST}/tasks`,
        method: "POST",
        data: body,
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      };
      const r2: AxiosResponse<Task> = await axios(optionsPost);
      const { data: dataPost } = r2;
      res.status(200).json(dataPost);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json(dataPost);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}