import React from 'react';

const CreateCommunityPost = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden h-fit">
        {/* Header matches the dark green banner from the image */}
        <div className="bg-[#0c6b4b] p-6 text-white">
          <h2 className="text-xl font-bold">Create a Post</h2>
          <p className="text-green-100 text-sm mt-1">Ask questions, share updates, and market your gig.</p>
        </div>

        <form className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition" placeholder="What's on your mind?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea rows="5" className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition" placeholder="Write your post here..."></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="px-6 py-2 rounded-full bg-white text-green-700 border border-green-600 font-medium hover:bg-green-50 transition">
              Post to Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityPost;