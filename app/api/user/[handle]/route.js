import { NextResponse } from 'next/server';
import { getProfilesCollection } from '@/lib/profiles';
import { normalizeHandle } from '@/lib/profile-validation';

export async function GET(request, { params }) {
    try {
        const { handle: originalHandle } = await params;

        if (!originalHandle) {
            return NextResponse.json({ message: 'Handle is required' }, { status: 400 });
        }

        
        const handle = normalizeHandle(originalHandle);
        const collection = await getProfilesCollection();
        const userData = await collection.findOne({ handle }, { projection: { _id: 0 } });

        if (!userData) {
           
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(userData, { status: 200 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
