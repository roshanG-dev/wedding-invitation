import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const Loader = ({ onFinish }) => {
  const [show, setShow] = useState(true);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfetti(true); // trigger golden confetti
      setTimeout(() => {
        setShow(false);
        if (onFinish) onFinish();
      }, 1800);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
        >
          {/* Elegant glowing circle */}
          <motion.div
            className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-amber-400/60"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.9, 1.1, 0.95], opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Names with luxury shimmer */}
          <motion.h1
            className="text-4xl md:text-6xl font-greatvibes text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-rose-500 drop-shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              letterSpacing: ["0em", "0.05em", "0em"],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Roshan & Steniviya
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="absolute bottom-16 text-sm md:text-lg italic text-gray-700 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5 }}
          >
            A new journey begins…
          </motion.p>

          {/* Confetti burst in gold tones */}
          {confetti && (
            <Confetti
              numberOfPieces={300}
              recycle={false}
              colors={["#FFD700", "#FFB700", "#FFC94D"]}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
