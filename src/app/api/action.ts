import Parser from "rss-parser";
import { singleNews } from "@/interfaces/interfaces";

export async function fetchAINews(): Promise<Array<singleNews>> {
  try {
    const parser = new Parser();

    const feed = await parser.parseURL(
      "https://www.artificialintelligence-news.com/feed/rss/"
    );

    const aiNews = feed.items.map(
      (item: any): singleNews => ({
        title: item.title,
        description: item.contentSnippet,
        link: item.link,
        date: item.isoDate,
        categories: item.categories,
        creator: item.creator,
      })
    );

    return aiNews;
  } catch (error) {
    console.error("Error fetching AI news:", error);
    return [];
  }
}
