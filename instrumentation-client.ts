import { initBotId } from "botid/client/core";

// Vercel BotID: フォーム送信APIへのリクエストに判定用ヘッダーを付ける。
// サーバ側の判定は各 route.ts の checkBotId()。ここに無いパスで checkBotId() を呼ぶと常に bot 判定になる。
initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    { path: "/api/partner", method: "POST" },
  ],
});
