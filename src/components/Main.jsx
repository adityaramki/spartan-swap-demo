import React from 'react';
import { ReactTyped } from "react-typed";

const Main = () => {
    return (
        <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <h1 className='md:text-6xl sm:text-5xl text-3xl font-bold md: py-6'>It's not just a tool, it's a tradition.</h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-4xl sm:text-3xl text-xl font-bold text-[#00df9a]'>Ready to </p>
                    <ReactTyped 
                    className='md:text-4xl sm:text-3xl text-xl font-bold text-[#00df9a] md:pl-4 pl-2'
                    strings={['buy?', 'sell?', 'negotiate?']} 
                    typeSpeed={120} 
                    backSpeed={140} 
                    loop/>
                </div>
            </div>
        </div>
    )
}

export default Main