import React from 'react'

const Statistics = () => {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-700 to-emerald-800 py-14 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-10 lg:gap-0 text-white">

          <div className="w-full lg:w-52 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-12">
            <h1 className="text-5xl font-bold tracking-tight">25K+</h1>
            <h1 className="mt-2 text-lg font-medium text-white/80">Active</h1>
            <h1 className="text-lg font-medium text-white/80">Users</h1>
          </div>

          <div className="w-full lg:w-52 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-12">
            <h1 className="text-5xl font-bold tracking-tight">9.6K+</h1>
            <h1 className="mt-2 text-lg font-medium text-white/80">Jobs</h1>
            <h1 className="text-lg font-medium text-white/80">Posted</h1>
          </div>

          <div className="w-full lg:w-52 text-center lg:text-left border-b sm:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-12">
            <h1 className="text-5xl font-bold tracking-tight">120+</h1>
            <h1 className="mt-2 text-lg font-medium text-white/80">Companies</h1>
            <h1 className="text-lg font-medium text-white/80">Hiring</h1>
          </div>

          <div className="w-full lg:w-52 text-center lg:text-left">
            <h1 className="text-5xl font-bold tracking-tight">2.4K+</h1>
            <h1 className="mt-2 text-lg font-medium text-white/80">Successful</h1>
            <h1 className="text-lg font-medium text-white/80">Hires</h1>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Statistics
