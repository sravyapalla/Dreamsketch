import React, { useState } from "react";
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Generate from '../components/Generate'
import StylePicker, { STYLE_PRESETS } from "../components/stylePicker";
import { motion } from "framer-motion";


const Home = () => {
    const [style, setStyle] = useState("none");
  const [provider, setProvider] = useState("stability");
  return (
    
   <div>
    <Header/>
    <Steps/>
    
    <Description/>
    
<div className="px-4 my-3">
  <motion.p
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center text-2xl md:text-4xl font-extrabold mb-5
               text-transparent bg-clip-text
               bg-gradient-to-r from-black-200 via-teal-500 to-orange-600
               drop-shadow-sm"
  >
    Pick your vibe, choose your wizard, and let’s conjure some pixels!
  </motion.p>

  <StylePicker
    style={style}
    setStyle={setStyle}
    provider={provider}
    setProvider={setProvider}
  />
</div>

  <Generate
  provider={provider}
  styleSuffix={STYLE_PRESETS?.[style] ?? ""}
/>

   </div>
  )
}

export default Home
