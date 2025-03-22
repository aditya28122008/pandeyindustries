import { auth } from "@/auth";
import vars from "@/vars";
import { NextResponse } from "next/server";

export async function POST(request, {params}) {
    const session = await auth();
    if (session.user.email === vars.ADMINEMAIL) {
        const formData = await request.formData();
        const userCategories = await prisma.$queryRaw`SELECT enum_range(NULL::UserCategory)`;
        return new NextResponse({formData}, {status: 200});
        
    } else {
        return {status: 401, body: JSON.stringify({success: false})};
    }
}