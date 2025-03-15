import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to the{" "}
            <span className="text-blue-600">Job Board</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find your next opportunity or post a job opening. Our platform connects talented professionals with great companies.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/jobPost"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Browse Jobs
            </Link>
            <Link
              href="/jobPost/new"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
