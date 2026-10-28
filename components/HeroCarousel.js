"use client";

import { useEffect, useRef, useState } from "react";

// Slides del hero — fotos de trabajos reales de Maykar (public/work/),
// optimizadas a JPG con una variante "-sm" de 900px para pantallas chicas
// vía srcset. La primera es la que mejor puntuó en nitidez, exposición y
// contraste en la zona que realmente queda a la vista junto al panel azul.
// Cada slide tiene su propia etiqueta de servicio, independiente del
// headline fijo de arriba (ese viene de la configuración).
const SLIDES = [
  {
    id: "exterior-painting",
    base: "/work/ranch-siding-after",
    label: "Exterior Painting",
    alt: "Ranch home with vertical siding freshly repainted in charcoal",
    focal: "object-[50%_55%]",
  },
  {
    id: "finished-result",
    base: "/work/rear-exterior-after",
    label: "The Finished Result",
    alt: "Back of a three-story home repainted in sage green with white trim",
    focal: "object-[50%_45%]",
  },
  {
    id: "interior-painting",
    base: "/work/bathroom-after",
    label: "Interior Painting",
    alt: "Bathroom walls repainted in a deep teal",
    focal: "object-[50%_45%]",
  },
];

const DURATION = 5600;

export default function HeroCarousel({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map(({ id, base, label, alt, focal }, i) => (
        <div
          key={id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}.jpg`}
            srcSet={`${base}-sm.jpg 900w, ${base}.jpg 1600w`}
            sizes="100vw"
            alt={alt}
            className={`hero-kenburns h-full w-full object-cover ${focal}`}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      {/* Scrim direccional: más oscuro sobre el tercio izquierdo (donde
          vive el titular) y una caída suave abajo — en vez de un degradado
          plano parejo, deja ver el detalle de la foto a la derecha. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/10 to-transparent" />

      {/* Etiqueta de servicio + progreso editorial — líneas finas que se
          llenan con la duración real del slide, no puntos genéricos. */}
      <div className="absolute bottom-7 left-1/2 z-10 flex w-full max-w-xs -translate-x-1/2 flex-col items-center gap-3 sm:bottom-9 sm:left-auto sm:right-8 sm:translate-x-0 sm:items-end">
        <div
          key={SLIDES[index].id}
          className="hero-anim rounded-sm bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
        >
          {SLIDES[index].label}
        </div>
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}: ${s.label}`}
              aria-current={i === index}
              className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/25"
            >
              {i === index && (
                <span
                  className="absolute inset-y-0 left-0 block bg-gold"
                  style={{
                    animation: paused ? "none" : `heroProgress ${DURATION}ms linear forwards`,
                    width: paused ? "100%" : undefined,
                  }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-white/70" />}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
