'use server';

import prisma from "@/lib/prisma";
import { JobType, Location } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FormState {
  message: string;
}

export async function createPost(prevState: FormState, formData: FormData) {
  try {
    const title = formData.get("title");
    const team = formData.get("team");
    const location = formData.get("location");
    const type = formData.get("type");
    const deadline = formData.get("deadline");

    if (!title || !team || !location || !type || !deadline) {
      return { message: "All fields are required" };
    }

    await prisma.jobPost.create({
      data: {
        title: title as string,
        team: team as string,
        location: location as Location,
        type: type as JobType,
        deadline: new Date(deadline as string),
      },
    });

    revalidatePath("/jobPost");
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }

  redirect("/jobPost");
}

export async function updatePost(id: number, prevState: FormState, formData: FormData) {
  try {
    const title = formData.get("title");
    const team = formData.get("team");
    const location = formData.get("location");
    const type = formData.get("type");
    const deadline = formData.get("deadline");

    if (!title || !team || !location || !type || !deadline) {
      return { message: "All fields are required" };
    }

    await prisma.jobPost.update({
      where: { id },
      data: {
        title: title as string,
        team: team as string,
        location: location as Location,
        type: type as JobType,
        deadline: new Date(deadline as string),
      },
    });

    revalidatePath("/jobPost");
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }

  redirect("/jobPost");
} 