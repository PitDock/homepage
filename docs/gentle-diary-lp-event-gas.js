/**
 * Gentle Diary LP 週替わりABテスト｜イベント記録用 Google Apps Script
 *
 * 出典: docs/gentle-diary-lp-ab-content-plan.md §3-5（このファイルはGASへのコピペ用）
 *
 * ■ セットアップ手順
 *  1. Google スプレッドシートを新規作成（名称例: Gentle Diary LP ABテスト）
 *  2. シートを2枚用意し、名前を「raw」と「集計」にする
 *  3. raw の1行目に見出しを入れる:
 *     タイムスタンプ / ISO年-週番号 / パターン / 種別 / ストア / パス / リファラ / デバイス
 *  4. 拡張機能 → Apps Script を開き、このファイルの内容を貼る
 *  5. SHEET_ID を当該スプレッドシートのID（URLの /d/ と /edit の間）に置き換える
 *  6. TOKEN に十分に長いランダム文字列を設定（例: openssl rand -hex 24 の出力）
 *     → 同じ値を Next.js 側の環境変数 LP_EVENT_TOKEN にも設定する
 *  7. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」
 *       「次のユーザーとして実行」= 自分
 *       「アクセスできるユーザー」= 全員（トークンで認証するため）
 *      memo
 *      デプロイID: AKfycbwzsEmzeAGyG-rwF1NiAOtm86g_9mXHOLlaLjznP2A7fYv9ueM28ljLCm3cEZa4RAEX
 *      URL: https://script.google.com/macros/s/AKfycbwzsEmzeAGyG-rwF1NiAOtm86g_9mXHOLlaLjznP2A7fYv9ueM28ljLCm3cEZa4RAEX/exec
 *  8. 発行された https://script.google.com/macros/s/.../exec を
 *     環境変数 LP_EVENT_ENDPOINT_URL に設定する
 *  9. コードを修正したら必ず「デプロイを管理」→ 新バージョンで再デプロイする
 *     （保存だけでは /exec に反映されない）
 *
 * ■ 疎通確認
 *  発行された /exec URL をブラウザで開き {"ok":true,...} が返ることを確認する（doGet）
 */

const SHEET_ID = '1am-TThaR8vW4XcRFswXK412bOSfq4lP4B2RiIjl5zEY';
const SHEET_NAME = 'raw';
const TOKEN = 'fddb6a7f3eeeb30c51fbc59ab55d5e527cc18a13a5e463be';

const ALLOWED_VARIANTS = ['A', 'B'];
const ALLOWED_TYPES = ['impression', 'click'];
const ALLOWED_STORES = ['appstore', 'googleplay', '―'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'no body' });
    }
    const body = JSON.parse(e.postData.contents);

    if (body.token !== TOKEN) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    // 単発 event / 配列 events の両方を受ける
    const events = Array.isArray(body.events) ? body.events : [body.event];

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return json_({ ok: false, error: 'sheet not found' });

    const rows = [];
    for (let i = 0; i < events.length; i++) {
      const ev = events[i] || {};
      if (!/^\d{4}-W\d{2}$/.test(String(ev.isoWeek))) continue;
      if (ALLOWED_VARIANTS.indexOf(String(ev.variant)) === -1) continue;
      if (ALLOWED_TYPES.indexOf(String(ev.type)) === -1) continue;
      const store = ALLOWED_STORES.indexOf(String(ev.store)) === -1 ? '―' : String(ev.store);
      rows.push([
        new Date(),                      // A タイムスタンプ
        String(ev.isoWeek),              // B ISO年-週番号
        String(ev.variant),              // C パターン
        String(ev.type),                 // D 種別
        store,                           // E ストア
        String(ev.path || ''),           // F パス
        String(ev.referrer || ''),       // G リファラ
        String(ev.device || ''),         // H デバイス
      ]);
    }
    if (rows.length === 0) return json_({ ok: false, error: 'no valid events' });

    // 同時書き込みで行が壊れないよう排他する
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true, count: rows.length });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  // 疎通確認用
  return json_({ ok: true, service: 'gentle-diary-lp-event' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
