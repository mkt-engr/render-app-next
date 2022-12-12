import { GetStaticProps, NextPage } from "next";
import axios from "axios";

type Task = {
  id: number;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  tasks: Task[];
};
const Example: NextPage<Props> = ({ tasks }) => {
  console.log(tasks, "in Example ");

  return (
    <div>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              {task.content}:{task.done ? "済" : "未"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Example;

export const getServerSideProps: GetStaticProps = async () => {
  console.log(process.env.HOST, "HOST");
  const res = await axios.get(`${process.env.HOST}/tasks`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });

  const data = res.data;
  console.log(data);
  return {
    props: {
      tasks: data,
    },
  };
};
