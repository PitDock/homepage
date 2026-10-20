import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 は既定値。85 は Duosub LP のスクリーンショット（字幕の細い文字をつぶさないため）
    qualities: [75, 85],
  },
  async redirects() {
    return [
      {
        source: "/service",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/service/in-house",
        destination: "/service/products",
        permanent: true,
      },
      {
        source: "/service/in-house/dinder",
        destination: "/service/products/dinder",
        permanent: true,
      },
      {
        source: "/service/in-house/duosub",
        destination: "/service/products/duosub",
        permanent: true,
      },
      {
        source: "/service/in-house/duosub/terms_of_use",
        destination: "/service/products/duosub/terms",
        permanent: true,
      },
      {
        source: "/service/in-house/gentle-diary",
        destination: "/service/products/gentle-diary",
        permanent: true,
      },
      {
        source: "/service/in-house/gentle-diary/privacy_policy",
        destination: "/service/products/gentle-diary/privacy",
        permanent: true,
      },
      {
        source: "/service/in-house/gentle-diary/terms_of_use",
        destination: "/service/products/gentle-diary/terms",
        permanent: true,
      },
    ];
  },
};

// BotID の判定用スクリプトへの転送設定を追加する。Vercel 上では自動で転送されるため不要だが、
// これが無いとローカル（next dev）でスクリプトが 404 になり、フォーム送信自体が失敗する
export default withBotId(nextConfig);
