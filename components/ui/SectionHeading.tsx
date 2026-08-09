import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
};

export default function SectionHeading({ eyebrow, title, lead }: Props) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2.5 mb-3 font-display text-tit-lg font-bold text-ink">{title}</h2>
      {lead ? <p className="mb-9 max-w-[58ch] text-[clamp(16px,0.4vw+15px,17.5px)] text-ink-2">{lead}</p> : null}
    </Reveal>
  );
}
