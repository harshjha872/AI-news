import React from "react";
import SingleNewsCard from "./SingleNewsCard";
import { singleNews } from "@/interfaces/interfaces";

const MainFeed = ({ News }: { News: Array<singleNews> }) => {
  console.log(News);

  return (
    <section className="text-zinc-400 body-font overflow-hidden">
      <div className="container px-5 py-40 mx-auto">
        <div className="-my-8 divide-y-2 divide-zinc-800">
          {News.map((news, index) => (
            <SingleNewsCard news={news} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainFeed;
