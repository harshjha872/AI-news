const nodemailer = require("nodemailer");
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "harshjha872",
  //     pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
  //   },
  // });

  // const info = await transporter.sendMail({
  //   from: '"Daily AI" <dailyainews2024@gmail.com>', // sender address
  //   to: "playedinindia@gmail.com", // list of receivers
  //   subject: "Your daily AI News is here", // Subject line
  //   text: "This is daily ai test", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });

  console.log("this is a cron job for testing purpose");

  return NextResponse.json({ message: "email is sent successfully" });
}
