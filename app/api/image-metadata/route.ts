import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
  }

  try {
    console.log(`🖼️  Fetching image metadata for: ${imageUrl}`);

    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bay Area Aviation Weather)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract EXIF data using a simple EXIF parser
    const exifData = extractExifData(buffer);
    
    console.log(`✅ EXIF data extracted:`, exifData);

    return NextResponse.json({
      success: true,
      exif: exifData,
      imageSize: buffer.length,
      imageDataUrl: `data:image/jpeg;base64,${buffer.toString('base64')}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error extracting image metadata:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Simple EXIF data extraction function
function extractExifData(buffer: Buffer): Record<string, string> | { error: string } {
  try {
    // Look for EXIF marker (0xFFE1) in JPEG
    const exifMarker = Buffer.from([0xFF, 0xE1]);
    const exifIndex = buffer.indexOf(exifMarker);
    
    if (exifIndex === -1) {
      return { error: 'No EXIF data found' };
    }

    // Look for "Exif" string after the marker
    const exifString = Buffer.from('Exif\0\0');
    const exifStringIndex = buffer.indexOf(exifString, exifIndex);
    
    if (exifStringIndex === -1) {
      return { error: 'Invalid EXIF format' };
    }

    // Start of TIFF header
    const tiffStart = exifStringIndex + 6;
    
    if (tiffStart + 8 > buffer.length) {
      return { error: 'Truncated EXIF data' };
    }

    // Read TIFF header to determine byte order
    const byteOrder = buffer.readUInt16BE(tiffStart);
    const isLittleEndian = byteOrder === 0x4949;
    
    // Read IFD offset
    const ifdOffset = isLittleEndian 
      ? buffer.readUInt32LE(tiffStart + 4)
      : buffer.readUInt32BE(tiffStart + 4);

    const ifdStart = tiffStart + ifdOffset;
    
    if (ifdStart + 2 > buffer.length) {
      return { error: 'Invalid IFD offset' };
    }

    // Read number of directory entries
    const numEntries = isLittleEndian
      ? buffer.readUInt16LE(ifdStart)
      : buffer.readUInt16BE(ifdStart);

    const exifData: Record<string, string> = {};
    
    // Parse directory entries
    for (let i = 0; i < numEntries; i++) {
      const entryStart = ifdStart + 2 + (i * 12);
      
      if (entryStart + 12 > buffer.length) break;

      const tag = isLittleEndian
        ? buffer.readUInt16LE(entryStart)
        : buffer.readUInt16BE(entryStart);

      const type = isLittleEndian
        ? buffer.readUInt16LE(entryStart + 2)
        : buffer.readUInt16BE(entryStart + 2);

      const count = isLittleEndian
        ? buffer.readUInt32LE(entryStart + 4)
        : buffer.readUInt32BE(entryStart + 4);

      // Look for DateTime Original tag (0x9003)
      if (tag === 0x9003 && type === 2) { // ASCII string
        const valueOffset = isLittleEndian
          ? buffer.readUInt32LE(entryStart + 8)
          : buffer.readUInt32BE(entryStart + 8);

        const dateTimeStart = tiffStart + valueOffset;
        
        if (dateTimeStart + count <= buffer.length) {
          const dateTimeString = buffer.toString('ascii', dateTimeStart, dateTimeStart + count - 1);
          exifData.DateTimeOriginal = dateTimeString;
        }
      }

      // Look for DateTime tag (0x0132) as fallback
      if (tag === 0x0132 && type === 2) { // ASCII string
        const valueOffset = isLittleEndian
          ? buffer.readUInt32LE(entryStart + 8)
          : buffer.readUInt32BE(entryStart + 8);

        const dateTimeStart = tiffStart + valueOffset;
        
        if (dateTimeStart + count <= buffer.length) {
          const dateTimeString = buffer.toString('ascii', dateTimeStart, dateTimeStart + count - 1);
          exifData.DateTime = dateTimeString;
        }
      }
    }

    return exifData;

  } catch (error) {
    return { error: `EXIF parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
