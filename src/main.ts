import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import * as dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function fetchNotionData(): Promise<void> {
  try {
    if (!databaseId) {
      throw new Error(
        "[ERROR] NOTION_DATABASE_ID 환경 변수가 존재하지 않습니다."
      );
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    response.results.forEach((result) => {
      if ("properties" in result) {
        const page = result as PageObjectResponse;
        console.log("Page ID:", page.id);

        Object.entries(page.properties).forEach(([key, value]) => {
          switch (value.type) {
            case "title":
              console.log(
                `${key}: ` +
                  value.title.map((item) => item.plain_text).join(" ")
              );
              break;
            case "rich_text":
              console.log(
                `${key}:: ` +
                  value.rich_text.map((item) => item.plain_text).join(" ")
              );
              break;
            case "date":
              console.log(`${key}: ` + value.date?.start);
              break;
            case "number":
              console.log(`${key}: ` + value.number);
              break;
            case "select":
              console.log(`${key}: ` + value.select?.name);
              break;
            case "multi_select":
              console.log(
                `${key}: ` +
                  value.multi_select.map((item) => item.name).join(", ")
              );
              break;
            case "checkbox":
              console.log(`${key}: ` + value.checkbox);
              break;
            case "url":
              console.log(`${key}: ` + value.url);
              break;
            case "email":
              console.log(`${key}: ` + value.email);
              break;
            case "phone_number":
              console.log(`${key}: ` + value.phone_number);
              break;
            default:
              console.log(`${key}: ` + value.type);
          }
        });
      } else {
        console.log("[ERROR] 결과가 전체 페이지 개체가 아닙니다.", result);
      }
    });
  } catch (error: any) {
    console.error(
      "[ERROR] Notion Database의 Data를 불러오는데 실패했습니다.",
      error.message
    );
  }
}

fetchNotionData();
