import React from 'react';

const CreateJobPost = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-3xl h-fit">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
          <p className="text-gray-500 mt-1">Fill out the details below to find your next great hire.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition" placeholder="e.g. Senior Software Engineer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Workplace Type</label>
              <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white">
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition" placeholder="e.g. $120k - $150k" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            <textarea rows="6" className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition" placeholder="Describe the responsibilities, requirements, and benefits..."></textarea>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
              Publish Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPost;