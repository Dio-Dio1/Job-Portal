import React from 'react'
import jobguy from '../assets/jobguy.png'
const Landing = () => {
  return (
    <div className='h-96 bg-white mt-4 shadow-sm flex justify-between w-full px-36 items-center'>
        <div className='flex flex-col  items-center '>
            <p className='text-2xl'>One platform. Endless opportunities.</p>
            <h2 className='text-7xl font-bold'>Find Work That <span className='text-green-700'>Fits</span> You.</h2>
            <p className='text-2xl'>Explore careers, build connections, and grow with companies hiring across Nepal.</p>

            
                 <div className='flex border rounded-lg overflow-hidden mt-3 items-center'>
                    <input type='text' className='px-6 w-96 py-6 outline-none border-r ' placeholder='Job Title'/>
                    <input type='text' className='px-6 w-96 py-6 outline-none  ' placeholder='Location'/>

                    <button className='px-8 py-4 border rounded-lg bg-green-700 text-white mr-2 text-xl cursor-pointer'>Search</button>
                
                </div>
        </div>

        <img src={jobguy} className='h-full  object-contain'></img>
        
    </div>
  )
}

export default Landing