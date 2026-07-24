import React from "react";

const Navbar = () => {
  return (
    <nav className="h-20 bg-white text-black flex items-center justify-between px-5 md:px-10 lg:px-16 shadow-sm transition-all duration-300">

      {/* Logo */}
      <div className="text-2xl md:text-3xl font-bold tracking-tight animate-fadeIn">
        <h1>
          Skill<span className="text-green-700">Gig:</span>
        </h1>
      </div>


      {/* Navigation */}
      <div className="hidden lg:flex items-center gap-8 text-base font-medium">

        <ul className="flex items-center gap-7">

          {["Overview", "Home", "Cover", "Statistics", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href="#"
                  className="relative transition-colors duration-300 hover:text-green-700 group"
                >
                  {item}

                  <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-green-700 transition-all duration-300 group-hover:w-full"></span>

                </a>
              </li>
            )
          )}

        </ul>


        {/* Buttons */}
        <div className="flex items-center gap-4">

          <button className="cursor-pointer transition-all duration-300 hover:text-green-700 hover:-translate-y-0.5">
            Login
          </button>


          <button className="rounded-full px-6 py-2.5 bg-green-700 text-white shadow-md transition-all duration-300 hover:bg-green-800 hover:shadow-lg hover:-translate-y-1 active:scale-95">

            SignUp

          </button>

        </div>


      </div>


      {/* Mobile */}
      <div className="lg:hidden text-xl cursor-pointer">
        ☰
      </div>


    </nav>
  );
};

export default Navbar;