import React from 'react'
import jobguy from '../assets/jobguy.png'

const Landing = () => {
  return (
    <div className='min-h-96 mt-4 px-6 md:px-12 lg:px-36 w-full flex flex-col lg:flex-row justify-between items-center rounded-2xl bg-gradient-to-br from-white via-green-50 to-white shadow-md overflow-hidden relative'>

      {/* Left Content */}
      <div className='flex flex-col items-center gap-4 z-10 text-center lg:text-left'>

        <p className='text-base md:text-lg text-gray-500 font-medium'>
          One platform. Endless opportunities.
        </p>

        <h2 className='text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900'>
          Find Work That <span className='text-green-600'>Fits</span> You.
        </h2>

        <p className='text-base md:text-xl text-gray-500 max-w-xl'>
          Explore careers, build connections, and grow with companies hiring across Nepal.
        </p>


        <div className='flex flex-col sm:flex-row mt-4 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm w-full max-w-3xl'>

          <input
            className='px-6 py-4 flex-1 outline-none border-b sm:border-b-0 sm:border-r border-gray-200'
            placeholder='Job Title'
          />

          <input
            className='px-6 py-4 flex-1 outline-none'
            placeholder='Location'
          />

          <button className='m-2 px-8 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition'>
            Search
          </button>

        </div>

      </div>



      {/* Right Visual */}
      <div className='relative h-80 md:h-96 w-full lg:w-[500px] flex items-center justify-center mt-8 lg:mt-0'>

        {/* Glow */}
        <div className='absolute w-64 md:w-80 h-64 md:h-80 bg-green-200 rounded-full blur-3xl opacity-40'></div>


        {/* Card 1 */}
        <div className='hidden sm:block absolute left-0 top-10 md:top-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-4 md:px-5 py-3 md:py-4 border border-gray-100 z-0'>

          <p className='text-xs md:text-sm text-gray-500'>
            New Match
          </p>

          <p className='text-sm md:text-base font-semibold text-gray-900'>
            Frontend Developer
          </p>

          <div className='mt-2 flex gap-2'>
            <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full'>
              React
            </span>

            <span className='text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full'>
              Remote
            </span>
          </div>

        </div>



        {/* Card 2 */}
        <div className='hidden sm:block absolute right-0 bottom-10 md:bottom-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-4 md:px-5 py-3 md:py-4 border border-gray-100 z-0'>

          <p className='text-xs md:text-sm text-gray-500'>
            Hiring Now
          </p>

          <p className='text-2xl md:text-3xl font-bold text-gray-900'>
            500+
          </p>

          <p className='text-xs md:text-sm text-gray-500'>
            Open Positions
          </p>

        </div>



        {/* Person */}
        <img
          src={jobguy}
          className='h-full max-w-[90%] object-contain relative z-10 drop-shadow-xl hover:scale-105 transition duration-500'
        />

      </div>

    </div>
  )
}

export default Landing