"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MainFeed from "@/components/MainFeed";
import axios from "axios";
import { singleNews } from "@/interfaces/interfaces";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [feedNews, setFeedNews] = useState([] as Array<singleNews>);

  const currentDate = new Date();

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 2);

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=ai&from=${formatDate(
          startDate
        )}&to=${formatDate(currentDate)}&pageSize=15&apiKey=${
          process.env.NEXT_PUBLIC_NEWSAPI
        }`
      );
      const data = res.data.articles;
      setFeedNews(data);
    })();
  }, []);

  return (
    <>
      <div className="fixed top-0 w-screen">
        <Navbar />
      </div>
      {feedNews.length > 0 && <MainFeed News={feedNews} />}
    </>
  );
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
