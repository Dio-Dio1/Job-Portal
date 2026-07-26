import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-bold text-green-700 tracking-tight">404</p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Page not found
        </h1>

        <p className="mt-3 text-gray-500 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 rounded-full px-8 py-3 bg-green-700 text-white font-semibold shadow-md transition-all duration-300 hover:bg-green-800 hover:shadow-lg hover:-translate-y-1 active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
