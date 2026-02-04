import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const albumName = formData.get('albumName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create album folder name (sanitized)
    const sanitizedAlbumName = albumName.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Create organized folder structure: public/uploads/{albumName}/
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', sanitizedAlbumName);
    
    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${timestamp}_${originalName}`;
    const filepath = path.join(uploadDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the public URL path
    const publicUrl = `/uploads/${sanitizedAlbumName}/${filename}`;

    return NextResponse.json({ 
      success: true, 
      imageUrl: publicUrl 
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
