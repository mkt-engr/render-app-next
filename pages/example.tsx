import { GetStaticProps } from "next";
import axios from "axios";
import { FC } from "react";

const Example = ({ data }: { data: any }) => {
  console.log(data, "in Example ");
  return (
    <div>
      <ul>
        {data.map((i: any) => {
          return (
            <li key={i.id}>
              {i.id}:{i.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Example;

export const getServerSideProps = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });

  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
