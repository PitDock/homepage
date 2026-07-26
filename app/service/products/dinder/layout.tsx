import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/images/products/dinder/dinder-favicon.png",
  },
};

export default function DinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
