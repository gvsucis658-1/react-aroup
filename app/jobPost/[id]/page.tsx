import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { humanReadableEnum } from "@/app/utils/formatters";
import Link from "next/link";
import { deletePost } from "../actions";

export default async function JobPostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobPost = await prisma.jobPost.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!jobPost) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {jobPost.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {jobPost.team}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/jobPost/${jobPost.id}/update`}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
              >
                Update
              </Link>
              <form action={async () => {
                'use server';
                await deletePost(jobPost.id);
              }}>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="mt-1 text-lg text-gray-900">
                {humanReadableEnum(jobPost.location)}
              </p>
            </div>
            <div className="col-span-1">
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="mt-1 text-lg text-gray-900">
                {humanReadableEnum(jobPost.type)}
              </p>
            </div>
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Application Deadline</h3>
              <p className="mt-1 text-lg text-gray-900">
                {jobPost.deadline.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/jobPost"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              ← Back to Job Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
