import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await connectDB();
}

loadDB();

export async function GET(request){
    try {
        const emails = await EmailModel.find({});
        return NextResponse.json({ success: true, emails });
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch emails" }, { status: 500 });
    }
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    await EmailModel.findByIdAndDelete(id);

    return NextResponse.json({success: true, message: 'Email Deleted'})
}

export async function POST(request){
    const formData = await request.formData();

    const emailData = {
        email: `${formData.get("email")}`,
    }

    await EmailModel.create(emailData);

    return NextResponse.json({ success: true, message: 'Email Subscribed'})
}