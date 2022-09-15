import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

const currentDate = new Date();

// date set
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();

const today =
  year +
  "-" +
  month.toString().padStart(2, "0") +
  "-" +
  date.toString().padStart(2, "0");
const nowTask = [];

// get data from notion
const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  const task = response.results;
  return task;
};

// check task status.If it is not reach deadline and done,it psss
const checkTask = () => {
  getDatabase().then((tasks) => {
    tasks.map(function (value) {
      // console.log(value.properties.status.status)
      if (
        value.properties.date.date === null ||
        value.properties.status.status === null
      ) {
        return;
      } else if (
        (value.properties.date.date.end > today) &
        (value.properties.status.status.name != "Review" || "Done")
      ) {
        nowTask.push({name:value.properties.name.title[0].plain_text,end:value.properties.date.date.end});
      }
    });
    console.log(nowTask)
  });
};

checkTask();

