import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      Job Board
      <Link className="text-blue-500" href="/jobPost">See all posts</Link>
    </div>
  );
}
