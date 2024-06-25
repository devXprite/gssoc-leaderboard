import getProjectsStats from '@/utils/getProjectsStats';
import { NextResponse } from 'next/server';

export async function GET() {
    const projects = await getProjectsStats();

    return NextResponse.json(projects);
}
