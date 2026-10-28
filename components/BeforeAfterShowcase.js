import Reveal from "./Reveal";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { IconCheck } from "./Icons";

// Tres trabajos reales de Maykar — los pares con el encuadre más parecido
// entre el antes y el después, para que el comparador se lea bien. Los
// números de casa y placas están difuminados en las fotos (public/work/).
// El resto de los trabajos está en /portfolio (se administra desde el panel).
const PAIRS = [
  {
    title: "Board & Batten Repaint",
    beforeUrl: "/work/board-batten-side-before.jpg",
    afterUrl: "/work/board-batten-side-after.jpg",
  },
  {
    title: "Stucco Exterior Repaint",
    beforeUrl: "/work/stucco-exterior-before.jpg",
    afterUrl: "/work/stucco-exterior-after.jpg",
  },
  {
    title: "Wood Paneling Painted White",
    beforeUrl: "/work/wood-paneling-before.jpg",
    afterUrl: "/work/wood-paneling-after.jpg",
  },
];

// Desfase vertical alterno en desktop — evita que las tres tarjetas se
// vean como una fila plana de tres cajas idénticas ("franja" de cards).
const OFFSET_CLASS = ["lg:mt-0", "lg:mt-10", "lg:-mt-2"];

export default function BeforeAfterShowcase() {
  return (
    <div className="relative">
      {/* Insignia flotante superpuesta a la esquina de la cuadrícula — un
          acento con forma propia (círculo sólido) en vez de que el único
          elemento no rectangular de la sección sea el manejador del
          slider. Solo en desktop para no robar espacio en móvil. */}
      <div
        className="pointer-events-none absolute -left-3 -top-3 z-10 hidden h-[88px] w-[88px] flex-col items-center justify-center rounded-full border-[3px] border-paper bg-gold text-center shadow-premium lg:flex"
        aria-hidden="true"
      >
        <IconCheck className="h-5 w-5 text-charcoal" />
        <span className="mt-0.5 px-2 text-[10px] font-extrabold uppercase leading-tight tracking-wide text-charcoal">
          Drag to compare
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PAIRS.map((p, i) => (
          <Reveal key={p.title} delay={i * 90} className={OFFSET_CLASS[i]}>
            <BeforeAfterSlider title={p.title} location="Recent project" beforeUrl={p.beforeUrl} afterUrl={p.afterUrl} height="h-72" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
