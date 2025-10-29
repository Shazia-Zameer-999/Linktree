import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
    try {
        
        const originalHandle = params.handle;

        if (!originalHandle) {
            return NextResponse.json({ message: 'Handle is required' }, { status: 400 });
        }

        
        const handle = originalHandle.toLowerCase();

        const client = await clientPromise;
        const db = client.db("bittree");

       
        const userData = await db.collection("links").findOne({ handle: handle });

        if (!userData) {
           
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(userData, { status: 200 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}