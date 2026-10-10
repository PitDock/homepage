# PitDock Homepage

PitDock株式会社のコーポレートサイト。Next.js (App Router) + TypeScript + Tailwind CSS で構築。

## 技術スタック

- [Next.js](https://nextjs.org/) 15 (App Router)
- React 19 / TypeScript
- Vercel Analytics / Speed Insights

## セットアップ

```bash
npm install
```

`.env.local` に以下の環境変数を設定する。

```
SLACK_WEBHOOK_URL=xxxx
RESEND_API_KEY=xxxx
MAIL_FROM=xxxx
```

## 開発

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
```

## ディレクトリ構成

```
app/                 ページ・ルーティング (App Router)
  api/contact/        お問い合わせフォームの送信API
  api/partner/        パートナー募集フォームの送信API
  company-info/       会社情報
  contact/            お問い合わせ
  news/                お知らせ
  partner/             パートナー募集
  personal-info/       個人情報保護方針
  privacy/              プライバシーポリシー
  service/              事業内容（DX・AX / システム開発 / 技術顧問 / 自社サービス）
  components/           共通コンポーネント
lib/
  data/                 静的データ（お知らせ記事など）
  seo/                  メタデータ・構造化データ（JSON-LD）・サイト設定
```
