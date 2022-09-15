import {WebClient} from '@slack/web-api'

(async () => {
  // OAuth トークン
  const token  = process.env.SLACK_KEY;
  // #チャンネル名 of @ユーザー名
  const channel = '#bot_test';
  // メッセージ
  const text = '*Hello World*';

  const client = new WebClient(token);
  const response = await client.chat.postMessage({ channel, text });

  // 投稿に成功すると `ok` フィールドに `true` が入る。
  console.log(response.ok);
  // => true
})();