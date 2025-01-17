import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function fetchNotionData() {
  try {
    if (!databaseId) {
      throw new Error("Missing NOTION_DATABASE_ID environment variable");
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    console.log("Notion Database Data:", response.results);
  } catch (error) {
    console.error("Error fetching Notion data:", error.message);
  }
}

fetchNotionData();
