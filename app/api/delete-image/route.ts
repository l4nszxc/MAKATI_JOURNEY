import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    // Convert public URL to file path
    // e.g., /uploads/Album_Name/123456_photo.jpg -> public/uploads/Album_Name/123456_photo.jpg
    const filepath = path.join(process.cwd(), 'public', imageUrl);

    // Delete the file
    await unlink(filepath);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
