import prisma from "@/lib/prisma";
import Link from "next/link";
import { humanReadableEnum } from "@/app/utils/formatters";

export default async function JobPosts() {
  const jobPosts = await prisma.jobPost.findMany({
    orderBy: {
      deadline: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Posts</h1>
        <Link
          href="/jobPost/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg 
            className="mr-2 -ml-1 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
              clipRule="evenodd" 
            />
          </svg>
          Create Job
        </Link>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {jobPosts.map((jobPost) => (
          <Link key={jobPost.id} href={`/jobPost/${jobPost.id}`}>
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{jobPost.title}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{jobPost.team} / {humanReadableEnum(jobPost.location)}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">{humanReadableEnum(jobPost.type)}</p>
                <p className="mt-1 text-xs/5 text-gray-500">
                  Application Deadline: <time dateTime={jobPost.deadline.toISOString()}>{jobPost.deadline.toLocaleDateString()}</time>
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
