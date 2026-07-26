import React, { useState } from "react";

const JobApplicationForm = ({
  jobTitle = "Software Engineer",
  company = "Butterfly Technologies",
}) => {
  const [resume, setResume] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Apply for {jobTitle}
          </h2>
          <p className="text-gray-500 mt-1">
            Submit your application to {company}
          </p>
        </div>

        <form className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
                placeholder="Jane"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
                placeholder="Doe"
              />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
              placeholder="jane@example.com"
            />
          </div>


          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume / CV
            </label>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 transition">

              <div className="text-center space-y-2">

                <label className="cursor-pointer">
                  <span className="text-gray-500">
                    Upload a file or drag and drop
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </label>


                {resume && (
                  <div className="text-sm text-gray-600 mt-3">
                    <p className="font-medium">
                      {resume.name}
                    </p>

                    <p>
                      {(resume.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

              </div>

            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>

            <textarea
              rows="5"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
              placeholder="Tell the company why you are a great fit..."
            ></textarea>
          </div>


          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">

            <button
              type="button"
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Submit Application
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default JobApplicationForm;