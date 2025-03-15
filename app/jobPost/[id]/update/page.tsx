import { JobType, Location } from "@prisma/client";
import { updatePost } from "../../actions";
import { humanReadableEnum } from "@/app/utils/formatters";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function UpdatePost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const jobPost = await prisma.jobPost.findUnique({
        where: { id },
    });

    if (!jobPost) {
        notFound();
    }
    
    const formattedDeadline = jobPost.deadline.toISOString().split('T')[0];

    return (
        <div className="flex flex-col justify-center px-16 w-1/2">
            <h1 className="text-2xl font-bold mb-2 mt-6">Update Job Post</h1>
            <form action={updatePost} className="space-y-6">
                <input type="hidden" name="id" value={id} />
                <div>
                    <label htmlFor="title" className="block text-lg mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={jobPost.title}
                        placeholder="Enter your post title"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="team" className="block text-lg mb-2">
                        Team <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="team"
                        name="team"
                        required
                        defaultValue={jobPost.team}
                        placeholder="Enter your team"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-lg mb-2">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="location"
                        name="location"
                        required
                        defaultValue={jobPost.location}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Select a location</option>
                        {Object.values(Location).map((loc) => (
                            <option key={loc} value={loc}>
                                {humanReadableEnum(loc)}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="type" className="block text-lg mb-2">
                        Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="type"
                        name="type"
                        required
                        defaultValue={jobPost.type}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Select a job type</option>
                        {Object.values(JobType).map((type) => (
                            <option key={type} value={type}>
                                {humanReadableEnum(type)}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="deadline" className="block text-lg mb-2">
                        Deadline <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        required
                        defaultValue={formattedDeadline}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
}
