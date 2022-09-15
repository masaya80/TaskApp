import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID


const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });

  console.log(response);
};

getDatabase();