import s from "./sub.module.css";

type Props = {
  id?: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h2" | "h3";
};

export default function SectionHeading({ id, children, lead, as: Tag = "h2" }: Props) {
  return (
    <div className={s.secHead}>
      <Tag id={id} className={s.secHeading}>
        <img src="/brand/p-mark.svg" alt="" className={s.pMark} width={36} height={30} />
        <span>{children}</span>
      </Tag>
      {lead && <p className={s.body}>{lead}</p>}
    </div>
  );
}
