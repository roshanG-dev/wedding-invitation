import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader"; // New loader component

/**
 * Premium Wedding Invitation Microsite
 * Stack: TailwindCSS + Framer Motion (no Chakra)
 * Notes:
 * - Replace GOOGLE_MAPS_API_KEY below with your real key.
 */

const BGHearts = ({ count = 24 }) => {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 24,
        delay: Math.random() * 6,
        duration: 10 + Math.random() * 12,
        opacity: 0.2 + Math.random() * 0.5,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-20%", opacity: [0, h.opacity, 0] }}
          transition={{
            repeat: Infinity,
            delay: h.delay,
            duration: h.duration,
            ease: "linear",
          }}
          style={{ left: `${h.left}%`, rotate: h.rotate }}
          className="absolute"
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rose-300/60 drop-shadow-[0_0_12px_rgba(244,63,94,0.35)]"
          >
            <path d="M12 21s-6.716-4.297-9.428-7.01A6.5 6.5 0 1 1 12 5.172a6.5 6.5 0 1 1 9.428 8.818C18.716 16.703 12 21 12 21z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const GlowRing = ({ children }) => (
  <div className="relative">
    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-teal-400 blur-xl opacity-30" />
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      {children}
    </div>
  </div>
);


const GlowRingMap = ({ children }) => (
  <div className="relative h-full">
    {/* Glow background */}
    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-teal-400 blur-xl opacity-30" />

    {/* Content container */}
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl h-full">
      {children}
    </div>
  </div>
);


const CountdownCircle = ({ label, value }) => (
  <div className="group relative">
    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-rose-400 via-amber-300 to-teal-400 opacity-40 blur-md transition group-hover:opacity-70" />
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
      <div className="text-center">
        <div className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/80">
          {label}
        </div>
      </div>
    </div>
  </div>
);

const quotes = [
  { t: "Love is composed of a single soul inhabiting two bodies.", a: "Aristotle" },
  { t: "Where there is love, there is life.", a: "Mahatma Gandhi" },
  { t: "To love and be loved is to feel the sun from both sides.", a: "David Viscott" },
  { t: "We are most alive when we are in love.", a: "John Updike" },
  { t: "The best thing to hold onto in life is each other.", a: "Audrey Hepburn" },
  { t: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.", a: "Maya Angelou" },
  { t: "There is no remedy for love but to love more.", a: "Henry David Thoreau" },
  { t: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.", a: "Unknown" },
  { t: "In dreams and in love there are no impossibilities.", a: "János Arany" },
  { t: "To love is nothing. To be loved is something. But to love and be loved, that’s everything.", a: "T. Tolis" },
  { t: "Love is the bridge between you and everything.", a: "Rumi" },
  { t: "The greatest thing you’ll ever learn is just to love and be loved in return.", a: "Eden Ahbez" },
  { t: "True love stories never have endings.", a: "Richard Bach" },
  { t: "Love is when the other person's happiness is more important than your own.", a: "H. Jackson Brown, Jr." },
  { t: "Love is a friendship set to music.", a: "Joseph Campbell" }
];


const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
};
const FieldData = ({ throwConfetti, setMessages }) => {

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    message: "",
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.message) {
      alert("Please fill all the fields ✍️");
      return;
    }
    try {
      await fetch("https://wed-invitation-umber.vercel.app/marriage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFormData({ name: "", location: "", message: "" });
      throwConfetti();

      const res = await fetch(
        "https://wed-invitation-umber.vercel.app/marriages"
      );
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {

      console.log(e)
      alert("Oops, failed to add your wish. Try again!");
    }
  };

  return (
    <section className="relative z-10 mx-auto mt-16 max-w-4xl px-6">
      <GlowRing>
        <div className="rounded-3xl p-6 md:p-10">
          <h3 className="text-center text-2xl font-bold text-white/90">
            Send Your Wishes 💌
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white"
            />
            <input
              placeholder="Your Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white"
            />
            <textarea
              placeholder="Your Wishes..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="col-span-1 md:col-span-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
            />
          </div>
          <div className="mt-5 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-rose-500/80 via-fuchsia-500/80 to-teal-400/80 px-8 py-3 text-sm font-semibold text-white shadow-xl"
            >
              Send Wishes ✨
            </motion.button>
          </div>
        </div>
      </GlowRing>
    </section>
  );
}



const FloatingHearts = ({ count = 20 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHearts = () => {
      const arr = Array.from({ length: count }).map(() => ({
        id: Math.random(),
        size: Math.random() * 20 + 15, // 15px to 35px
        left: Math.random() * 100, // %
        duration: Math.random() * 6 + 4, // 4s to 10s
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3,
      }));
      setHearts(arr);
    };
    generateHearts();
  }, [count]);

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: 500, opacity: heart.opacity }}
          animate={{ y: -50, opacity: 0 }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="absolute text-rose-400 text-xl sm:text-2xl lg:text-3xl pointer-events-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          💖
        </motion.div>
      ))}
    </>
  );
};

const InvitationMessages = ({ messages }) => {
  // Pick random messages to show
  const pickMessages = () => {
    const shuffled = [...messages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }; 

  const visible = pickMessages(); 

  return (
    <section className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Floating hearts */}
      <FloatingHearts count={25} />

      <h2 className="mb-12 text-center text-3xl sm:text-4xl font-bold text-white/90 relative z-10">
        Messages From Our Favorite Humans 💌
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence>
          {visible.map((msg, idx) => (
            <motion.div
              key={msg.name + idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg shadow-lg overflow-hidden"
            >
              {/* Gradient glow effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-rose-400/30 via-amber-300/20 to-teal-400/30 opacity-25 blur-xl"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-2">💖</span>
                  <div>
                    <p className="font-semibold text-white">{msg.name}</p>
                    <p className="text-white/60 text-sm">{msg.location}</p>
                  </div>
                </div>
                <p className="text-white/85 text-sm sm:text-base break-words">
                  {msg.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};



export default function InvitationPage() {
  const weddingDate = useMemo(() => new Date("2027-12-25T11:00:00"), []);

  const [messages, setMessages] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const confettiRef = useRef(0);
  const [loading, setLoading] = useState(true);

  // Loader timer
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Fetch wishes
  useEffect(() => {
    fetch("https://wed-invitation-umber.vercel.app/marriages")
      .then((r) => r.json())
      .then((d) => setMessages(Array.isArray(d) ? d : []))
      .catch(() => setMessages([]));
  }, []);

  const throwConfetti = () => {
    const id = ++confettiRef.current;
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: `${id}-${i}`,
      x: 50 + (Math.random() - 0.5) * 30,
      size: 14 + Math.random() * 12,
      rot: Math.random() * 360,
      delay: Math.random() * 0.2,
      dur: 1.2 + Math.random() * 0.8,
      emoji: ["💖", "✨", "🎉", "💫", "🥳"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 2000);
  };

  function QuotesCarousel() {
    const [index, setIndex] = useState(() =>
      Math.floor(Math.random() * quotes.length)
    );

    useEffect(() => {
      const id = setInterval(() => {
        setIndex(() => {
          let random = Math.floor(Math.random() * quotes.length);
          return random;
        });
      }, 3500);

      return () => clearInterval(id);
    }, []);

    return (
      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-rose-400/10 via-fuchsia-400/10 to-teal-400/10 blur-xl" />
        <div className="grid grid-cols-[auto_1fr] gap-4 md:gap-6">
          <div className="text-3xl md:text-4xl">💬</div>
          <div className="min-h-[72px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={quotes[index].t} // ensures re-animation on change
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-balance"
              >
                <p className="text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                  {quotes[index].t}
                </p>
                <p className="mt-2 text-sm text-white/60">{quotes[index].a}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }



  function TimeComp() {

    const { days, hours, mins, secs } = useCountdown(weddingDate);

    // Google Calendar link
    const startDate = "20271225T100000Z"; // Example start time (UTC), format: YYYYMMDDTHHMMSSZ
    const endDate = "20271225T130000Z";   // Example end time
    const title = "Roshan & Steniviya Wedding";
    const details = "Join us for our wedding and reception at Grand Palace, Chennai!";
    const location = "Grand Palace, Chennai";

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    return (
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="bg-gradient-to-r from-rose-300 via-amber-200 to-teal-200 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow md:text-7xl">
            Roshan & Steniviya
          </h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Join us as we upgrade our relationship status to{" "}
            <span className="font-semibold text-rose-300">Permanent Team</span>{" "}
            💍
          </p>
          <p className="mt-1 text-sm text-white/60">
            Marriage: 25 Dec 2027 • Reception: 26 Dec 2027 • Grand Palace,
            Chennai
          </p>
        </motion.div>

        {/* Countdown */}
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          <CountdownCircle label="Days" value={days ?? 0} />
          <CountdownCircle label="Hours" value={hours ?? 0} />
          <CountdownCircle label="Mins" value={mins ?? 0} />
          <CountdownCircle label="Secs" value={secs ?? 0} />
        </div>
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-3xl bg-gradient-to-r from-amber-100 via-cream-50 to-rose-100 
             px-8 py-3 text-rose-700 font-bold shadow-xl transform transition-all duration-300 
             hover:scale-105 hover:shadow-2xl animate-pulse"
        >
          Mark It on Google Calendar 📅
        </a>


      </section>
    )
  }

  if (loading) return <Loader />;

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#101018] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Animated spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute -top-1/3 left-1/2 h-[110vmax] w-[110vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18),transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.15),transparent_60%)]" />
      </div>

      {/* Floating hearts */}
      <BGHearts count={26} />

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 z-40">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ x: "50%", y: "50%", scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                x: `${c.x + (Math.random() - 0.5) * 40}%`,
                y: `${40 + Math.random() * 40}%`,
                scale: 1,
                rotate: c.rot + 180,
                opacity: 1,
              }}
              exit={{ opacity: 0, y: "80%" }}
              transition={{
                duration: c.dur,
                delay: c.delay,
                ease: "easeOut",
              }}
              className="absolute text-2xl"
            >
              {c.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HERO */}
      <TimeComp />

      {/* QUOTES */}
      <section className="relative z-10 mx-auto mt-16 max-w-5xl px-6">
        <GlowRing>
          <div className="relative rounded-3xl px-6 py-8 md:px-10 md:py-10">
            <QuotesCarousel />
          </div>
        </GlowRing>
      </section>

      {/* Celebration + Map */}
      <section className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 items-stretch">
        <GlowRingMap>
          <div className="p-8 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white/90">The Celebration</h2>
            <ul className="mt-5 space-y-4 text-white/80 flex-1">
              <li>💍 Marriage: 25 Dec 2027, 11:00 AM</li>
              <li>🎉 Reception: 26 Dec 2027, 06:30 PM</li>
              <li>📍 Venue: Grand Palace, Chennai</li>
              <li>👗 Dress code: Pastel elegance (optional but cute)</li>
            </ul>
          </div>
        </GlowRingMap>

        <GlowRingMap>
          <div className="overflow-hidden rounded-3xl h-full">
            <iframe
              title="Wedding Location"
              className="w-full h-full"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.7806761080233!2d76.7179877!3d11.1028135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba88b04867e3011%3A0x903a242f8f219c60!2sMy+Village+-+Eco+Rural+Resort!5e0!3m2!1sen!2sin!4v1514524647889"
            />
          </div>
        </GlowRingMap>
      </section>


      {/* Wishes form */}
      <FieldData throwConfetti={throwConfetti} setMessages={setMessages} />

      <InvitationMessages messages={messages} />
    </motion.div>
  )

};