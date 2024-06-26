const nodemailer = require("nodemailer");
import { NextResponse } from "next/server";
import prisma from "../../../../db/db.config";
import axios from "axios";
import { singleNews } from "@/interfaces/interfaces";
import { fetchAINews } from "../action";

export async function GET(request: Request) {
  try {
    // const allusers = await prisma.subscribers.findMany();
    // const receivers = allusers.map((user) => user.email).join(",");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dailyainews2024",
        pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Daily AI" <dailyainews2024@gmail.com>', // sender address
      to: "harshjha872@gmail.com",
      subject: "Your daily AI News is here", // Subject line
      text: "This is daily ai test", // plain text body
      html: `<b>email test</b>`, // html body
    });

    return NextResponse.json({
      message: "email is sent successfully",
      nodemailer_response: info,
    });

    // const news = await fetchAINews();

    // console.log(news);

    // if (news.length > 0) {
    //   let newsHtml = "";
    //   news.forEach((singleNews: singleNews) => {
    //     newsHtml += `<div>${singleNews.categories[0]} - ${singleNews.description}<a href="${singleNews.link}" target="_blank"> more</a></div><br>`;
    //   });

    //   const info = await transporter.sendMail({
    //     from: '"Daily AI" <dailyainews2024@gmail.com>', // sender address
    //     subject: "Your daily AI News is here", // Subject line
    //     text: "This is daily ai test", // plain text body
    //     html: `<b>Latest AI News</b><br><br>${newsHtml}`, // html body
    //     bcc: `${receivers}`,
    //   });
    //   console.log("info", info);
    //   return NextResponse.json({
    //     message: "email is sent successfully",
    //     nodemailer_response: info,
    //   });
    // } else {
    //   return NextResponse.json({
    //     message: "something went wrong!",
    //     err: "news length 0",
    //   });
    // }
  } catch (err) {
    console.log("In sending email to subs", err);
    return NextResponse.json({ message: "something went wrong!", err: err });
  }
}
