"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MainFeed from "@/components/MainFeed";
import axios from "axios";
import { singleNews } from "@/interfaces/interfaces";
import Navbar from "@/components/Navbar";
export default function Home() {
  const [feedNews, setFeedNews] = useState([] as Array<singleNews>);

  useEffect(() => {
    (async function () {
      console.log("api key", process.env.NEWS_API_KEY);
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEWS_API_KEY}`
      );
      const data = res.data.articles;
      setFeedNews(data);
    })();
  }, []);

  useEffect(() => {
    // fetch("api/sendemail").then(async (res) => {
    //   const data = await res.json();
    //   console.log("data ->", data);
    // });
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
