'use client';

import { JobType, Location } from "@prisma/client";
import FormError from "@/app/components/FormError";
import { updatePost } from "../../actions";
import { humanReadableEnum } from "@/app/utils/formatters";
import { useEffect, useState, useTransition } from "react";
import { notFound } from "next/navigation";
import { use } from "react";

interface JobPostData {
    id: number;
    title: string;
    team: string;
    location: Location;
    type: JobType;
    deadline: string;
    published: boolean;
}

export default function UpdatePost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = parseInt(resolvedParams.id);
    const [jobPost, setJobPost] = useState<JobPostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function fetchJobPost() {
            try {
                const response = await fetch(`/api/jobpost/${id}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch job post');
                }
                
                data.deadline = new Date(data.deadline).toISOString().split('T')[0];
                setJobPost(data);
            } catch (error) {
                console.error("Error fetching job post:", error);
                notFound();
            } finally {
                setLoading(false);
            }
        }

        fetchJobPost();
    }, [id]);

    async function handleSubmit(formData: FormData) {
        setError("");
        startTransition(async () => {
            try {
                const result = await updatePost(id, { message: "" }, formData);
                if (result?.message) {
                    setError(result.message);
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : "Something went wrong");
            }
        });
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center w-1/2 px-16 mt-16">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex animate-pulse space-x-4">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!jobPost) {
        return notFound();
    }

    return (
        <div className="flex flex-col justify-center px-16 w-1/2">
            <h1 className="text-2xl font-bold mb-2 mt-6">Update Job Post</h1>
            <form action={handleSubmit} className="space-y-6">
                {error && <FormError message={error} />}
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
                        defaultValue={jobPost.deadline}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full bg-blue-500 text-white py-3 rounded-lg ${
                        isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                >
                    {isPending ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
}
