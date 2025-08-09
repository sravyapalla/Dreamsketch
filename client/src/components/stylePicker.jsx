import { memo } from "react";
import { motion } from "motion/react";

export const STYLE_PRESETS = {
  none: "",
  ghibli: " — whimsical, soft lighting, pastel palettes, cel-shaded animation style inspired by classic Japanese animated films",
  anime: " — vibrant anime look, dynamic lines, cel shading, expressive eyes",
  watercolor: " — delicate watercolor wash, textured paper, soft edges",
  pixel: " — retro pixel art, 32x32 game sprite aesthetic",
  cyberpunk: " — neon-lit cyberpunk, rain-soaked streets, high contrast",
  lowpoly: " — low-poly 3D render, flat shading, geometric shapes",
  isometric: " — isometric game art, orthographic perspective, crisp lines",
  lineart: " — clean black-and-white line art, minimal shading",
  sketch: " — pencil sketch, cross-hatching, rough paper texture",
  "3drender": " — physically-based 3D render, global illumination, studio lighting",
};

const styleOptions = [
  ["none", "None (as typed)"],
  ["ghibli", "Ghibli"],
  ["anime", "Anime"],
  ["watercolor", "Watercolor"],
  ["pixel", "Pixel Art"],
  ["cyberpunk", "Cyberpunk"],
  ["lowpoly", "Low-poly"],
  ["isometric", "Isometric"],
  ["lineart", "Line Art"],
  ["sketch", "Sketch"],
  ["3drender", "3D Render"],
];

const providerOptions = [
  ["stability", "Stability AI"],
  ["clipdrop", "ClipDrop"],
];


const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 14, staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 }
};

function StylePicker({ style, setStyle, provider, setProvider }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="relative mx-auto w-full max-w-3xl"
    >
      {/* dark gradient card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="flex flex-wrap items-center gap-4 rounded-3xl 
                   bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                   p-4 shadow-xl ring-1 ring-white/10"
      >
        <LabeledSelect
          label="Style"
          value={style}
          onChange={setStyle}
          options={styleOptions}
        />
        <LabeledSelect
          label="Provider"
          value={provider}
          onChange={setProvider}
          options={providerOptions}
        />

        {/* glowing dot animation */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-auto hidden md:block"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.7)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <motion.label
      variants={itemVariants}
      className="group relative inline-flex flex-col text-sm font-medium text-white"
    >
      <span className="mb-1 px-1 text-xs tracking-wide text-gray-400">{label}:</span>

      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 2.0 }} className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-xl border border-gray-700 bg-gray-900/80 px-3 py-2 pr-9
                     shadow-inner outline-none transition-all
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40
                     hover:border-gray-500 text-white"
        >
          {options.map(([val, text]) => (
            <option key={val} value={val}>{text}</option>
          ))}
        </select>

        <span
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400"
          aria-hidden
        >
          ▾
        </span>
      </motion.div>
    </motion.label>
  );
}

export default memo(StylePicker);
