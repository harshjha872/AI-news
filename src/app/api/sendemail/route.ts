const nodemailer = require("nodemailer");
import { NextResponse } from "next/server";
import prisma from "../../../../db/db.config";
import axios from "axios";
import { singleNews } from "@/interfaces/interfaces";

export async function GET(request: Request) {
  try {
    let news: Array<singleNews>;
    const allusers = await prisma.subscribers.findMany();
    const receivers = allusers.map((user) => user.email).join(",");

    const currentDate = new Date();

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 2);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dailyainews2024",
        pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
      },
    });

    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=ai&from=${formatDate(
        startDate
      )}&to=${formatDate(currentDate)}&pageSize=15&apiKey=${
        process.env.NEXT_PUBLIC_NEWSAPI
      }`
    );

    news = res.data.articles;

    let newsHtml = "";

    news.forEach((singleNews) => {
      newsHtml += `<div>${singleNews.description} - ${singleNews.author}<a href="${singleNews.url}" target="_blank"> more</a></div><br>`;
    });

    const info = await transporter.sendMail({
      from: '"Daily AI" <dailyainews2024@gmail.com>', // sender address
      subject: "Your daily AI News is here", // Subject line
      text: "This is daily ai test", // plain text body
      html: `<b>Latest AI News</b><br><br>${newsHtml}`, // html body
      bcc: `${receivers}`,
    });

    return NextResponse.json({ message: "email is sent successfully" });
  } catch (err) {
    console.log("In sending email to subs", err);
    return NextResponse.json({ message: "something went wrong!" });
  }
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
