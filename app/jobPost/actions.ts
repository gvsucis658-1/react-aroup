'use server';

import prisma from "@/lib/prisma";
import { JobType, Location } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title");
    const team = formData.get("team");
    const location = formData.get("location");
    const type = formData.get("type");
    const deadline = formData.get("deadline");

    if (!title || !team || !location || !type || !deadline) {
      console.log("All fields are required");
      return;
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
    console.log(error);
  }

  redirect("/jobPost");
}

export async function updatePost(formData: FormData) {
  const id = formData.get("id");
  try {
    const title = formData.get("title");
    const team = formData.get("team");
    const location = formData.get("location");
    const type = formData.get("type");
    const deadline = formData.get("deadline");
    
    if (!title || !team || !location || !type || !deadline) {
      console.error("All fields are required");
      return;
    }

    await prisma.jobPost.update({
      where: { id: parseInt(id as string) },
      data: {
        title: title as string,
        team: team as string,
        location: location as Location,
        type: type as JobType,
        deadline: new Date(deadline as string),
      },
    });

    revalidatePath(`/jobPost/${id}`);
  } catch (error) {
    console.log(error);
  }

  redirect(`/jobPost/${id}`);
}

export async function deletePost(id: number) {
  try {
    await prisma.jobPost.delete({
      where: { id },
    });

    revalidatePath("/jobPost");
  } catch (error) {
    console.log(error);
  }

  redirect("/jobPost");
} 