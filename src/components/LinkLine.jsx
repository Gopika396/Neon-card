import { useEffect, useRef } from "react";

// Glowing curved line that connects two agent avatars while they team up.
export default function LinkLine({ ids }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotARef = useRef(null);
  const dotBRef = useRef(null);
  const labelRef = useRef(null);
  const key = ids ? ids.join("|") : "";

  useEffect(() => {
    if (!key) return;
    const [idA, idB] = key.split("|");
    let raf;

    const tick = () => {
      const svg = svgRef.current;
      const elA = document.querySelector(`[data-avatar="${idA}"]`);
      const elB = document.querySelector(`[data-avatar="${idB}"]`);

      if (svg && elA && elB) {
        const box = svg.getBoundingClientRect();
        const ra = elA.getBoundingClientRect();
        const rb = elB.getBoundingClientRect();
        const ax = ra.left + ra.width / 2 - box.left;
        const ay = ra.top - box.top;
        const bx = rb.left + rb.width / 2 - box.left;
        const by = rb.top - box.top;
        const lift = 80;

        pathRef.current.setAttribute(
          "d",
          `M ${ax} ${ay} C ${ax} ${ay - lift}, ${bx} ${by - lift}, ${bx} ${by}`
        );
        dotARef.current.setAttribute("cx", ax);
        dotARef.current.setAttribute("cy", ay);
        dotBRef.current.setAttribute("cx", bx);
        dotBRef.current.setAttribute("cy", by);
        labelRef.current.setAttribute("x", (ax + bx) / 2);
        labelRef.current.setAttribute("y", (ay + by) / 2 - lift * 0.75 - 12);
      }
      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, [key]);

  return (
    <svg ref={svgRef} className={`link${key ? " on" : ""}`} aria-hidden="true">
      <defs>
        <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00f6ff" />
          <stop offset="1" stopColor="#ff2d95" />
        </linearGradient>
      </defs>

      <path ref={pathRef} id="linkPath" className="link-path" />

      <circle ref={dotARef} className="link-dot" r="5" />
      <circle ref={dotBRef} className="link-dot" r="5" />

      {/* energy pulses travelling along the line */}
      <circle className="link-pulse" r="4">
        <animateMotion dur="1.5s" repeatCount="indefinite">
          <mpath href="#linkPath" />
        </animateMotion>
      </circle>
      <circle className="link-pulse" r="4">
        <animateMotion dur="1.5s" begin="-0.75s" repeatCount="indefinite">
          <mpath href="#linkPath" />
        </animateMotion>
      </circle>

      <text ref={labelRef} className="link-label" textAnchor="middle">
        SYNC
      </text>
    </svg>
  );
}