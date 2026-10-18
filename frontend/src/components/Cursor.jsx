import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHover(!!e.target.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-terra transition-all duration-200 ${
            hover ? "h-1.5 w-1.5 opacity-0" : "h-2.5 w-2.5"
          }`}
        />
      </motion.div>
      <motion.div style={{ x: rx, y: ry }} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-terra/70 transition-all duration-200 ${
            hover ? "h-14 w-14 bg-terra/10" : "h-8 w-8"
          }`}
        />
      </motion.div>
    </>
  );
};
