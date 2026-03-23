import { useEffect, useRef, useState } from "react";

const images = [
  "/carousel/C2.jpg",
  "/carousel/C1.jpg",
  "/carousel/C4.jpg",
  "/carousel/C8.jpg",
  "/carousel/C7.jpg",
  "/carousel/C6.jpg",
  "/carousel/C5.jpg",
  "/carousel/C3.jpg",
  "/carousel/C9.jpg",
];

export default function ImageCarousel() {
  const offsetRef = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      offsetRef.current = (offsetRef.current + 0.00345) % images.length;
      setTick((t) => t + 1);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full overflow-hidden mb-32 relative">
      {/* HEADER */}
      {/* CAROUSEL */}
      <div
        className="relative w-full h-[420px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {images.map((src, index) => {
          const total = images.length;

          let position = index - offsetRef.current;
          position = ((position % total) + total) % total;
          if (position > total / 2) position -= total;

          const dist = Math.abs(position);

          const x = position * 220;

          const scale = 0.72 + 0.43 * Math.exp(-dist * 0.7);

          const rotateY = position * -8;

          const opacity = dist > 4 ? 0 : dist > 3 ? 1 - (dist - 3) : 1;

          const zIndex = Math.round(100 - dist * 10);

          return (
            <div
              key={index}
              className="absolute will-change-transform"
              style={{
                transform: `translateX(${x}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
              }}
            >
              <div className="relative w-[200px] h-[280px] rounded-3xl overflow-hidden">
                <img
                  src={src}
                  alt="carousel"
                  className="w-full h-full object-cover rounded-3xl border border-white/10"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}