import Image from "next/image";
import { LpProductFooter } from "../../../../components/LpProductFooter";
import { Icon } from "./Icon";
import {
  COMPANY_PATH,
  ICON_ALT,
  ICON_SRC,
  MICRO_NOTE_FULL,
  PRIVACY_PATH,
  TERMS_PATH,
  TERMS_QUOTE,
  THIRD_PARTY_STATEMENT,
} from "./copy";
import { GENTLE_DIARY_FAQS } from "../../../../../lib/seo/gentle-diary-faqs";
import s from "../page.module.css";
import StoreCta from "./StoreCta";

/** 計測に必要な共通props（LPのどのCTAも週とパターンを持つ） */
type LpMeta = { isoWeek: string; variant: "A" | "B" };

/* ============================================================
   ヘッダー（A/B完全同一・ストアCTAも「お問い合わせ」も置かない）
   ============================================================ */

export function LpHeader({ isoWeek, variant }: LpMeta) {
  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <Image src={ICON_SRC} alt={ICON_ALT} width={32} height={32} className={s.headerIcon} priority />
        <span className={s.headerName}>Gentle Diary</span>
        {/* 768px以上で表示。モバイルは下部の StickyStoreBar が担当する */}
        <StoreCta className={s.headerCta} isoWeek={isoWeek} variant={variant} size="header" />
      </div>
    </header>
  );
}

/**
 * モバイル（〜767px）で常時表示する下部固定のストアバー。
 * 768px以上では非表示になり、ヘッダー内の CTA が役割を引き継ぐ。
 * A/B 同一仕様（片方だけに置くとABテストの交絡要因になる）。
 */
export function StickyStoreBar({ isoWeek, variant }: LpMeta) {
  return (
    <aside className={s.stickyBar} aria-label="アプリのダウンロード">
      <StoreCta isoWeek={isoWeek} variant={variant} size="sticky" />
    </aside>
  );
}

/** 固定バーにフッターが隠れないための余白（モバイルのみ） */
export function StickyBarSpacer() {
  return <div className={s.barSpacer} aria-hidden="true" />;
}

/* ============================================================
   フッター（A/B完全同一・tagline は現行のまま変更しない）
   ストアURLをここに閉じ込め、VariantA / VariantB には書かない
   ============================================================ */

export function ProductFooter() {
  return (
    <LpProductFooter
      variant="teal"
      iconSrc={ICON_SRC}
      iconAlt={ICON_ALT}
      productName="Gentle Diary"
      tagline="リアルタイム共有しない位置情報日記"
      links={[
        { href: COMPANY_PATH, label: "会社概要" },
        { href: PRIVACY_PATH, label: "プライバシーポリシー" },
        { href: TERMS_PATH, label: "利用規約" },
      ]}
    />
  );
}

/* ============================================================
   はじめにすることは、3つだけ（設計書 §2-7・A/B共通）
   ============================================================ */

const SETUP_ITEMS = [
  {
    title: "メールアドレスでログイン",
    body: "パスワードは不要です。届いたメールのリンクを開くだけでログインできます。",
  },
  {
    title: "位置情報の許可を「常に許可」にする",
    body: "アプリを閉じている間も1日の記録を続けるために必要です。iOS・Android のどちらでも「常に許可」が必要で、「アプリの使用中のみ」「1度だけ許可」を選ぶと、日記が正しく作られないことがあります。あとから端末の設定画面で変更できます。",
  },
  {
    title: "自宅の住所を登録する（任意）",
    body: "登録しておくと、自宅から約1km以内はすべて「自宅付近」とだけ表示されます。登録した住所そのものは、誰にも公開されません。",
  },
];

export function SetupList() {
  return (
    <ol className={s.setupList}>
      {SETUP_ITEMS.map((item, i) => (
        <li key={item.title} className={s.setupItem}>
          <span className={s.setupNum} aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <p className={s.setupTitle}>{item.title}</p>
            <p className={s.setupBody}>{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ============================================================
   社会的証明：リード＋信頼バッジ4つ（設計書 §2-8・A/B共通）
   ============================================================ */

export function PrivacyLead() {
  return (
    <p className={s.lead}>リアルタイムの位置情報を共有することは決してありません。</p>
  );
}

const TRUST_BADGES = [
  {
    icon: "mapOff" as const,
    title: "リアルタイム共有は、機能として存在しません",
    body: "相手の現在地を見る画面も、地図上に表示する機能もありません。共有されるのは、1日1回つくられる日記だけです。",
  },
  {
    icon: "homeLock" as const,
    title: "自宅の住所は、誰にも公開されません",
    body: "登録した住所は共有対象外です。自宅から約1km以内は「自宅付近」とだけ表示されます。",
  },
  {
    icon: "peopleCheck" as const,
    title: "共有は承認制。いつでも解除できます",
    body: "相手が申請し、あなたが承認したときだけ共有が始まります。承認したあとも、どちらからでも解除できます。",
  },
  {
    icon: "clockTrash" as const,
    title: "位置情報は、残り続けません",
    body: "日記を読めるのは直近2日分だけ。記録した位置情報と日記は、取得から10日後に自動的に削除されます。アカウントを削除すれば、データも削除されます。",
  },
];

/** D7（信頼バッジ4枚）。見出しは <p>（見出し階層を乱さない・§8-4） */
export function TrustBadges() {
  return (
    <div className={s.trustGrid}>
      {TRUST_BADGES.map((b) => (
        <div key={b.title} className={s.trustCard}>
          <div>
            <p className={s.trustH4}>{b.title}</p>
            <p className={s.trustBody}>{b.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   規約引用＋ポリシー導線＋運営者（設計書 §2-8・A/B共通）
   引用は <blockquote> + <cite>、リンクのすぐ近く（24px）に置く
   ============================================================ */

export function PolicyBlock() {
  return (
    <div className={s.policyWrap}>
      <div className={s.policyLinks}>
        <a className={s.policyLink} href={PRIVACY_PATH}>
          <Icon name="document" className={s.policyLinkIcon} />
          プライバシーポリシー
        </a>
        <a className={s.policyLink} href={TERMS_PATH}>
          <Icon name="document" className={s.policyLinkIcon} />
          利用規約
        </a>
      </div>

      <p className={s.operator}>
        提供: <strong>PitDock株式会社</strong>（代表取締役 小山 望海） ／{" "}
        <a href={COMPANY_PATH}>会社概要</a>
      </p>
    </div>
  );
}

/* ============================================================
   FAQ（ネイティブ <details>。閉じていても回答がHTMLに存在する）
   文言は lib/seo/gentle-diary-faqs.ts と一致させる（JSON-LD と同一文章の2表現）
   ============================================================ */

const DIARY_SAMPLE = [
  { time: "7:00頃", place: "自宅付近" },
  { time: "9:20頃", place: "〇〇駅周辺" },
  { time: "12:40頃", place: "〇〇ビル周辺" },
  { time: "19:00頃", place: "自宅付近" },
];

/** FAQ Q2 の回答1文目（設計書 §2-2 の配置箇所③）。※ は本文中では付けない（§3-4 の注記） */
const Q2_LEAD = MICRO_NOTE_FULL.replace(/^※/, "");

function FaqAnswer({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <p>{GENTLE_DIARY_FAQS[0].a}</p>;
    case 1:
      return (
        <>
          <p>
            {Q2_LEAD}相手の画面に表示されるのは、その1日分の日記です。中身は次のようなリストです。
          </p>
          <div className={s.faqSample}>
            {DIARY_SAMPLE.map((row) => (
              <div key={row.time} className={s.faqSampleRow}>
                <span>{row.time}</span>
                <span>{row.place}</span>
              </div>
            ))}
          </div>
          <p>
            時刻は20分単位に丸められ、場所は建物名または住所に「周辺」を付けた粒度になります。設定で自宅の住所を登録しておくと、自宅から約1km以内はすべて「自宅付近」とだけ表示されます（登録した住所そのものは、誰にも公開されません）。なお、相手のメールアドレスは画面上では一部を隠して表示されます。
          </p>
        </>
      );
    case 2:
      return (
        <>
          <p>
            <strong>{THIRD_PARTY_STATEMENT}</strong>
            記録した座標を「〇〇駅周辺」のような場所の名前に変えるために外部の地図サービスを利用しており、その処理のときに座標が送信されます。それ以外の第三者への提供はありません。
          </p>
          <p>
            また、リアルタイムの位置情報については、<a href={TERMS_PATH}>利用規約</a>に「
            {TERMS_QUOTE}」と明記しています。詳細は
            <a href={PRIVACY_PATH}>プライバシーポリシー</a>もあわせてご確認ください。
          </p>
          <p>
            保管についても期間を限定しています。日記をアプリ内で読めるのは
            <strong>直近2日分のみ</strong>
            で、3日以上前のものは閲覧できません。記録した位置情報と日記は、
            <strong>取得から10日後に自動的に削除</strong>
            されます。アカウントを削除すれば、データも削除されます。
          </p>
        </>
      );
    case 3:
      return (
        <>
          <p>おたがいの登録は必須ではありません。共有は一方向ごとに独立しています。</p>
          <p>
            相手の日記を見たいときは、相手のメールアドレスを入力して「閲覧申請」を送り、相手が承認すると見られるようになります。あなたの日記を相手に見せるかどうかは、これとは別の設定です。相手からあなたへの申請を、あなたが承認したときにだけ共有が始まります。つまり「自分だけが相手の日記を見る」「自分だけが相手に見せる」といった片方向の使い方もできます。承認したあとも、どちらからでもいつでも解除できますし、申請中のものはキャンセルできます。
          </p>
          <p>
            なお、相手の日記は相手の端末で記録された位置情報から作られるため、
            <strong>相手の端末にも Gentle Diary の登録と位置情報の許可が必要</strong>
            です。お子さまや親御さんなど、
            <strong>ご自身で設定するのが難しい場合は、あなたが代理で設定していただけます。</strong>
            相手の端末にアプリをインストールし、
            <strong>相手用のメールアドレスで相手のアカウントを作り</strong>
            （パスワードは不要で、届いたメールのリンクを開くだけです）、位置情報を「常に許可」にして、閲覧申請の承認までを代わりに行う流れです。
          </p>
          <p>
            ただし、
            <strong>あなた自身のアカウントで相手の端末にログインしないでください。</strong>
            位置情報も日記もあなたのアカウントのものとして記録され、相手の日記が作られません。見守りたい相手には、必ず相手自身のアカウントを作ってください（メールアドレスは、相手用に新しく用意したものでも構いません）。
          </p>
        </>
      );
    case 4:
      return (
        <>
          <p>
            Gentle Diary
            のすべての機能を無料でお使いいただけます。日記の自動生成、閲覧の申請・承認、自宅住所の登録などに料金はかかりません。アプリ内課金もありません。
          </p>
          <p>※アプリ内には広告が表示されます。</p>
        </>
      );
    case 5:
      return (
        <>
          <p>インストール後にすることは3つだけです。</p>
          <ol>
            <li>
              <strong>メールアドレスでログイン</strong>
              ：パスワードは不要です。入力したアドレスに届くメールのリンクを開くとログインできます。
            </li>
            <li>
              <strong>位置情報の許可を「常に許可」にする</strong>：Gentle Diary
              は、アプリを閉じている間も1日の記録を続けることで日記を作ります。そのため{" "}
              <strong>iOS・Android のどちらでも「常に許可」が必要</strong>
              です。「アプリの使用中のみ」や「1度だけ許可」を選ぶと、日記が正しく作られないことがあります。あとから端末の設定画面で変更できます。
            </li>
            <li>
              <strong>自宅の住所を登録する（任意）</strong>
              ：アプリの設定画面から登録できます。登録すると、自宅から約1km以内はすべて「自宅付近」とだけ表示されます。
            </li>
          </ol>
          <p>
            あとは普段どおり過ごすだけです。日記は毎日<strong>深夜3時ごろ</strong>
            に自動でつくられます。位置情報の記録を止めたいときは、端末の設定から位置情報の許可をオフにしてください。
          </p>
        </>
      );
    default:
      return null;
  }
}

/** 初期状態は全問閉。<details> なので回答テキストは閉じていても DOM に存在する */
export function FaqList() {
  return (
    <div className={s.faqList}>
      {GENTLE_DIARY_FAQS.map((faq, i) => (
        <details key={faq.q} className={s.faqItem}>
          <summary className={s.faqQ}>
            <span className={s.faqQText}>{faq.q}</span>
            <span className={s.faqMark} aria-hidden="true" />
          </summary>
          <div className={s.faqA}>
            <FaqAnswer index={i} />
          </div>
        </details>
      ))}
    </div>
  );
}
