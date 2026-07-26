import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { 
  FiTrendingUp, 
  FiMessageSquare, 
  FiShare2, 
  FiPlus, 
  FiChevronDown, 
  FiX, 
  FiImage 
} from "react-icons/fi";

import pfp1 from "../assets/users/pfp1.jpg";
import pfp2 from "../assets/users/pfp2.jpg";
import pfp3 from "../assets/users/pfp3.jpg";
import post1 from "../assets/posts/post1.jpg";
import post2 from "../assets/posts/post2.jpg";

const CommunityFeed = () => {
  // Toggle form visibility
  const [isPosting, setIsPosting] = useState(false);

  // Form input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const posts = [
    {
      id: 1,
      user: {
        name: "SaleEducation",
        username: "@SaleEducational4675",
        avatar: pfp1,
      },
      timePosted: "2 hours ago",
      postTitle: "Build a platform for skilled people to connect.",
      postDescription:
        "Hi all, I've built a website for all skilled people to connect with each other via both text and calls.",
      image: post1,
      elevate: 10,
      comments: 4,
    },
    {
      id: 2,
      user: {
        name: "WallFlower",
        username: "@apeksofwallflower",
        avatar: pfp2,
      },
      timePosted: "5 hours ago",
      postTitle: "Just got my first internship!",
      postDescription:
        "Yay guys, I finally got an internship after trying so hard. Thank you all for supporting!",
      image: post2,
      elevate: 34,
      comments: 12,
    },
    {
      id: 3,
      user: {
        name: "DestinyKid",
        username: "@destiny_kid",
        avatar: pfp3,
      },
      timePosted: "8 hours ago",
      postTitle: "Looking for a UI/UX collaborator for a Fintech side project",
      postDescription:
        "Hey everyone! I'm currently building a micro-investing app using React Native and Node.js. If you're a designer looking to build your portfolio, drop a message below!",
      image: null,
      elevate: 18,
      comments: 7,
    },
    {
      id: 4,
      user: {
        name: "Swarup Shakya",
        username: "@shakyaswarup",
        avatar: pfp1,
      },
      timePosted: "1 day ago",
      postTitle: "Top 5 Tailwind CSS tricks you probably aren't using",
      postDescription:
        "Just published a new breakdown on custom arbitrary variants, `@apply` best practices, and fluid typography in Tailwind v3+. Check out the full writeup!",
      image: post1,
      elevate: 52,
      comments: 23,
    },
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle post logic here (API call / state update)
    setTitle("");
    setDescription("");
    setIsPosting(false);
  };

  return (
    <div className="min-h-screen bg-emerald-50/30 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full items-start">
        
        {/* Left Sidebar / Auth Box */}
        <aside className="hidden lg:block lg:w-[380px] lg:sticky lg:top-10 shrink-0">
          <div className="w-full bg-white border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-3xl p-8 flex flex-col items-center space-y-5">
            <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 leading-snug">
              Ready to Register your{" "}
              <span className="text-emerald-700 underline decoration-emerald-300/80 decoration-2 underline-offset-4">
                GiG?
              </span>
            </h1>

            <p className="text-center text-sm text-gray-500 leading-relaxed">
              Login to officially showcase your skills to the world of opportunities.
            </p>

            {/* OAuth Buttons */}
            <div className="w-full space-y-3 pt-2">
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold shadow-2xs hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>

              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#1877F2] text-white text-sm font-semibold shadow-2xs hover:bg-[#166fe5] transition-all cursor-pointer">
                <FaFacebookF className="text-base" />
                Continue with Facebook
              </button>

              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-2xs hover:bg-black transition-all cursor-pointer">
                <FaApple className="text-lg" />
                Continue with Apple
              </button>
            </div>

            <p className="pt-2 text-center text-xs leading-relaxed text-gray-400">
              By continuing, you agree to our{" "}
              <a href="#" className="text-emerald-700 font-medium hover:underline">
                User Agreement
              </a>{" "}
              and acknowledge that you understand the{" "}
              <a href="#" className="text-emerald-700 font-medium hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </aside>

        {/* Right / Main Feed */}
        <main className="flex-1 w-full max-w-3xl space-y-6">
          {/* Community Hub Banner */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-700 p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Community Hub</h1>
              <p className="text-emerald-100 text-sm">
                Ask questions, share updates, and market your gig.
              </p>
            </div>

            <button 
              onClick={() => setIsPosting(!isPosting)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-full font-semibold text-sm shadow-xs transition-colors cursor-pointer shrink-0"
            >
              {isPosting ? <FiX className="text-base" /> : <FiPlus className="text-base" />}
              {isPosting ? "Cancel" : "Create"}
            </button>
          </div>

          {/* Inline Create Post Form (Renders directly inside the feed space when clicked) */}
          {isPosting && (
            <div className="w-full bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Create a Community Post</h2>
                <button 
                  onClick={() => setIsPosting(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post Title..."
                    className="w-full text-base font-semibold text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's on your mind? Share updates, ask questions..."
                    rows={4}
                    className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-600 cursor-pointer transition-colors">
                    <FiImage className="text-base text-emerald-700" />
                    <span>Add Photo</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPosting(false)}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300 space-y-5"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      className="w-11 h-11 object-cover rounded-full ring-2 ring-emerald-500/20"
                      src={post.user.avatar}
                      alt={post.user.name}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-gray-900">{post.user.name}</h2>
                        <span className="text-xs text-gray-400">{post.user.username}</span>
                      </div>
                      <p className="text-xs text-gray-400">{post.timePosted}</p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {post.postTitle}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {post.postDescription}
                  </p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <img
                      src={post.image}
                      alt={post.postTitle}
                      className="w-full max-h-[420px] object-cover hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer">
                      <FiTrendingUp className="text-sm text-emerald-700" />
                      <span>Elevate</span>
                      <span className="bg-emerald-200/60 text-emerald-900 px-1.5 py-0.5 rounded-md text-[11px]">
                        {post.elevate}
                      </span>
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-medium transition-colors cursor-pointer">
                      <FiMessageSquare className="text-sm text-gray-500" />
                      <span>Comment</span>
                      <span className="text-gray-400">({post.comments})</span>
                    </button>
                  </div>

                  <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-medium transition-colors cursor-pointer">
                    <FiShare2 className="text-sm text-gray-500" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="pt-4 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 rounded-2xl font-semibold text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer">
              <span>View More Posts</span>
              <FiChevronDown className="text-base" />
            </button>
          </div>
        </main>

      </div>
    </div>
  );
};

export default CommunityFeed;