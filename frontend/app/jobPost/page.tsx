import prisma from "@/lib/prisma";
import Link from "next/link";
import { humanReadableEnum } from "@/app/utils/formatters";

 const Posts = async () => {
  const jobPosts = await prisma.jobPost.findMany({
    orderBy: {
      deadline: 'desc',
    },
  });

  return (
    <div className="flex flex-col justify-center px-16">
      <ul role="list" className="divide-y divide-gray-100">
        <h1 className="text-2xl font-bold mt-4 mb-4">Job Posts</h1>
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

export default Posts;
