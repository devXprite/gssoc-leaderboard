import getUserPr from '@/utils/getUserPr';
import { NextResponse } from 'next/server';

export async function GET(req, { params: { username } }) {
    const response = await getUserPr(username);
    return NextResponse.json(response);
}
