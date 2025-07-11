import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { Ghost, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-[#f9f9f9] p-10 rounded-xl shadow-md max-w-md w-full text-center space-y-6 border border-gray-200">
        <Ghost className="mx-auto h-16 w-16 text-[#7209b7]" />
        <h1 className="text-3xl font-bold text-[#1E1E1E]">
          Lost in the job jungle?
        </h1>
        <p className="text-gray-700">
          The page you're looking for might have taken a vacation.
        </p>
        <div className="text-sm text-[#F83002] font-semibold">
          {error?.status} {error?.statusText || error?.message}
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7209b7] text-white rounded-md hover:bg-white hover:text-[#7209b7] border border-transparent hover:border-[#7209b7] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to safety
        </Link>
        <p className="text-xs text-gray-500 italic">
          Or stay here and ponder the meaning of 404s...
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
