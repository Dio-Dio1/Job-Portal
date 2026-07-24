import React, { useState } from "react";
import butterfly from "../assets/logos/butterfly.jpg";
import bird from "../assets/logos/bird.jpg";

const Trends = () => {
  const [trendingJobs] = useState([
    {
      logo: butterfly,
      title: "Software Engineer",
      company: "Butterfly Technologies",
      location: "Remote",
      salary: "$120k - $150k",
      description:
        "Build scalable software solutions using modern technologies.",
    },
    {
      logo: bird,
      title: "Hardware Engineer",
      company: "Bird Labs",
      location: "Hybrid",
      salary: "$95k - $130k",
      description:
        "Design and develop next-generation embedded hardware systems.",
    },
    {
      logo: butterfly,
      title: "CottonCandy Engineer",
      company: "SweetWorks",
      location: "On-site",
      salary: "$80k - $110k",
      description:
        "Create innovative candy production systems for global markets.",
    },
    {
      logo: bird,
      title: "Cement Engineer",
      company: "SolidBuild",
      location: "Remote",
      salary: "$90k - $120k",
      description:
        "Develop durable construction materials for future infrastructure.",
    },
  ]);

  return (
    <section className="px-6 lg:px-20 py-16 bg-gray-50">

      <div className="mb-10">

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
          Trending Jobs Right Now
        </h1>


        <p className="mt-3 text-base lg:text-lg text-gray-500 max-w-2xl">
          Discover the latest opportunities from companies hiring this week.
        </p>

      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        {trendingJobs.map((job, index) => (

          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >


            {/* Header */}
            <div className="flex items-start justify-between">


              <div className="flex gap-3">


                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">

                  <img
                    src={job.logo}
                    alt={job.title}
                    className="w-11 h-11 rounded-lg object-cover"
                  />

                </div>



                <div>

                  <h2 className="text-base font-semibold text-gray-900">
                    {job.title}
                  </h2>


                  <p className="text-sm text-green-600 font-medium mt-1">
                    {job.company}
                  </p>

                </div>


              </div>



              <span className="text-xs text-gray-400 font-medium">
                NEW
              </span>


            </div>





            {/* Description */}
            <p className="mt-5 text-gray-600 leading-6 text-sm">
              {job.description}
            </p>





            {/* Job Info */}
            <div className="flex justify-between border-t border-gray-200 mt-5 pt-3 text-sm text-gray-500">

              <span>
                {job.location}
              </span>

              <span>
                {job.salary}
              </span>

            </div>





            {/* Buttons */}
            <div className="flex gap-3 mt-5">


              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium transition">

                Apply

              </button>



              <button className="px-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition">

                Details

              </button>


            </div>


          </div>

        ))}


      </div>


    </section>
  );
};

export default Trends;