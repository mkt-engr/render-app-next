import { GetStaticProps, NextPage } from "next";
import axios from "axios";
import { FC, useEffect } from "react";

type Task = {
  id: number;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};
type Props = {
  data: Task[];
};
const Example: NextPage<Props> = ({ data }) => {
  console.log(data, "in Example ");

  return (
    <div>
      <ul>
        {data.map((i) => {
          return (
            <li key={i.id}>
              {i.content}:{i.done ? "済" : "未"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Example;

export const getServerSideProps = async () => {
  console.log(process.env.HOST, "HOST");
  const res = await axios.get(`${process.env.HOST}/tasks`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });

  const data = res.data;
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
