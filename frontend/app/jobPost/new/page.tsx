'use client';

import { JobType, Location } from "@prisma/client";
import { createPost } from "../actions";
import { humanReadableEnum } from "@/app/utils/formatters";


export default function NewPost() {
  return (
    <div className="flex flex-col justify-center px-16 w-1/2">
      <h1 className="text-2xl font-bold mb-2 mt-6">Create Job Post</h1>
      <form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
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
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
