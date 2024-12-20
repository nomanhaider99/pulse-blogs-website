import { db } from "@/drizzle/drizzle";
import { blogs } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params; 

        if (!id) {
            return NextResponse.json({ message: "ID not provided" }, { status: 400 });
        }

        const foundBlog = await db
                    .select()
                    .from(blogs)
                    .where(eq(blogs.id, id));

        return NextResponse.json({ data: foundBlog });
    } catch (error) {
        console.error("Error retrieving blog:", error);
        return NextResponse.json({ message: "An error occurred while fetching the blog" }, { status: 500 });
    }
}
