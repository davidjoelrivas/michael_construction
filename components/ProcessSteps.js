import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "Text us about the project", text: "Send a quick text with a few details or photos — Michael replies personally." },
  { n: "02", title: "On-site visit", text: "Michael comes out to see the project in person — the estimate is free." },
  { n: "03", title: "Get your price", text: "A clear price before anything starts — no pressure, no surprises." },
  { n: "04", title: "We get to work", text: "The same crew that quoted the job shows up to do it — no unknown subcontractors." },
];

export default function ProcessSteps() {
  return (
    <section className="border-y border-line bg-paper-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <div className="eyebrow mb-3">How it works</div>
            <h2 className="font-display text-4xl font-bold uppercase text-ink">From first message to finished job</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="border-t-2 border-gold pt-5">
                <div className="mb-3 font-display text-4xl font-black text-ink/15">{s.n}</div>
                <h3 className="mb-2 font-display text-lg font-bold uppercase text-ink">{s.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}