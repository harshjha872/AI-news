import { singleNews } from "@/interfaces/interfaces";
import React from "react";
import Link from "next/link";

const SingleNewsCard = ({ news }: { news: singleNews }) => {
  const date = new Date(news.date);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthAbbreviation = monthNames[monthIndex];
  const formattedDate = `${day} ${monthAbbreviation} ${year}`;

  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-white">
          {news.creator}
        </span>
        <span className="mt-1 text-zinc-500 text-sm">{formattedDate}</span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-white title-font mb-2">
          {news.title}
        </h2>
        <p className="leading-relaxed">{news.description}</p>
        <Link
          target="_blank"
          href={news.link}
          className="text-indigo-400 inline-flex items-center mt-4"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SingleNewsCard;
