import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    headers();
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true });
}
