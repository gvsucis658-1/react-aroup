import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jobPost = await prisma.jobPost.findUnique({
    where: { id: parseInt(id) },
  });

  if (!jobPost) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{jobPost.title}</h1>
        <p className="text-gray-600 text-center">by {jobPost.team}</p>
        <div className="prose prose-gray mt-8">
          {jobPost.type}
        </div>
      </article>
    </div>
  );
}
