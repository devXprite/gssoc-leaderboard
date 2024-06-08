import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ timeStamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) });
}
