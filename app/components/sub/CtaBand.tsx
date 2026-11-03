import s from "./sub.module.css";

type Props = {
  heading: React.ReactNode;
  body?: React.ReactNode;
  href: string;
  label: string;
  external?: boolean;
};

export default function CtaBand({ heading, body, href, label, external = false }: Props) {
  return (
    <section className={s.ctaBand}>
      <div className={`${s.inner} ${s.ctaInner}`}>
        <div className={s.ctaText}>
          <h2 className={s.ctaHeading}>{heading}</h2>
          {body && <p className={s.ctaBody}>{body}</p>}
        </div>
        <a
          href={href}
          className={s.btnWhite}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      </div>
    </section>
  );
}
