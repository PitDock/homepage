import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../../lib/og/render";
import { OG_PAGES } from "../../../lib/og/pages";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(OG_PAGES["/service/system-dev"]);
}
