import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-28 bg-white text-black flex items-center justify-around shadow-md'>
            <div className='text-4xl'>
                <h1>SkillGig:</h1>
            </div>
            <div className='flex justify-between items-center text-2xl gap-30'>
                <ul className='flex justify-between items-center gap-14 '>
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Cover</a></li>
                    <li><a href="#">Statistics</a></li>
                    <li><a href="#">Contact</a></li>
                    
                </ul>
                
                <div className='flex items-center gap-4'>
                    <h1 className='cursor-pointer'>Login</h1>
                    <h1 className='border rounded-full px-8 py-3 bg-green-700 text-white cursor-pointer'>SignUp</h1>
                </div>
                
            </div>
    </nav>
  )
}

export default Navbar