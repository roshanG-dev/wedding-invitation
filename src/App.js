import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Generate hearts with random starting positions
const generateHearts = (count = 50) =>
  Array.from({ length: count }).map(() => ({
    id: Math.random(),
    left: Math.random() * 100 + "%", // horizontal
    top: Math.random() * 100 + "%",  // vertical
    size: Math.random() * 20 + 10,   // size
    delay: Math.random() * 5,        // animation delay
    duration: 5 + Math.random() * 5, // animation duration
    swing: Math.random() * 20 - 10,  // horizontal sway
  }));

function App() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setHearts(generateHearts(60)); // more hearts for full coverage
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      
      {/* Full-page hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-400"
          style={{ left: heart.left, top: heart.top, fontSize: heart.size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, 600], // move downward
            x: [0, heart.swing], // slight horizontal swing
            opacity: [0, 1, 0],
            scale: [0, 1.2, 1],
          }}
          transition={{
            delay: heart.delay,
            duration: heart.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <FaHeart className="drop-shadow-lg" />
        </motion.div>
      ))}

      {/* Invitation Card */}
      <motion.div
        className="p-10 max-w-sm w-full bg-white text-center rounded-3xl shadow-2xl z-10"
        style={{ minHeight: "600px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-greatvibes text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The Wedding Of
        </motion.h1>

        <motion.img
          src="/rg2.jpg"
          alt="Bride & Groom"
          className="mt-6 mx-auto rounded-full object-cover shadow-xl border-4 border-gray-100 w-32 h-32 md:w-40 md:h-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <motion.h2
          className="text-2xl md:text-3xl font-greatvibes text-gray-900 mt-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Roshan .G
          <FaHeart className="text-rose-500 mx-2" />
          Steniviya .M
        </motion.h2>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="space-y-1">
          <p className="text-sm italic font-pacifico text-gray-700">
            With love and joy,
          </p>
          <p className="text-sm font-pacifico font-medium text-gray-800">
            We invite our dearest Family and Friends
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => navigate("/invitation")}
            className="mt-8 px-8 py-3 text-sm font-bold font-dancing text-white rounded-full shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            ✨ Open Invitation ✨
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
