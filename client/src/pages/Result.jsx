import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext);
  const { state } = useLocation();

  // Provider/style: prefer from navigation state, then localStorage, then defaults
  const provider = state?.provider ?? localStorage.getItem('provider') ?? 'stability';
  const styleSuffix = state?.styleSuffix ?? localStorage.getItem('styleSuffix') ?? '';

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const img = await generateImage(input, { provider, styleSuffix, size: '1024x1024', n: 1 });
      if (img) {
        setImage(img);
        setIsImageLoaded(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForAnother = () => {
    setIsImageLoaded(false);
    setInput('');
    setImage(assets.sample_img_1);
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <div className='relative'>
          <img src={image} alt="generation" className='max-w-sm rounded' />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? 'w-full transition-all duration-[10s]' : 'w-0'
            }`}
          />
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading......</p>
      </div>

      {/* Provider & style info */}
      {!isImageLoaded && (
        <div className='text-center mt-6 mb-2 text-sm text-gray-700'>
          <p><strong>Provider:</strong> {provider}</p>
          {styleSuffix && <p><strong>Style:</strong> {styleSuffix}</p>}
        </div>
      )}

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-2 rounded-full'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
          />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
            {loading ? 'Generating…' : 'Generate'}
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p
            onClick={resetForAnother}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate Another
          </p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
