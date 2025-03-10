import React from 'react';
import {
  FaGithubSquare,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';


const Footer = () => {
  return (
    <div className='bg-white max-w-[1920px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Spartan Swap</h1>
        <p className='py-4'>Spartan Swap revolutionizes MSU’s resale market with a secure, student-only platform. Verified authentication, organized listings, and fair pricing ensure a seamless experience. It fosters a sustainable and efficient marketplace for the MSU community.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/aditya-ramakrishnan-8a3354325/'>
                <FaLinkedin size={30} />
            </a>
            <a target="_blank" rel='noreferrer' href='https://github.com/adityaramki'>
                <FaGithubSquare size={30} />
            </a>
            <a target="_blank" rel='noreferrer' href='https://www.instagram.com/_aditya.ramki_/'>
                <FaInstagram size={30} />
            </a>
        </div>
        <div className='lg:col-span-2 flex justify-between mt-8'>
            <p>Developed by Aditya Ramakrishnan.</p>
        </div>
      </div>
      
      
    </div>
  );
};

export default Footer;