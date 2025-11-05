import { useState, useEffect } from 'react';

interface ImageValidationResult {
  isValid: boolean;
  isLoading: boolean;
  error: string | null;
  imageDate: string | null;
  lastChecked: string | null;
}

const LAWRENCE_HALL_IMAGE_URL = 'https://www.ocf.berkeley.edu/~thelawrence/images/newview.jpg';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useLawrenceHallImage(): ImageValidationResult {
  const [result, setResult] = useState<ImageValidationResult>({
    isValid: false,
    isLoading: true,
    error: null,
    imageDate: null,
    lastChecked: null,
  });

  useEffect(() => {
    let isMounted = true;

    const validateImage = async () => {
      try {
        console.log('🖼️  Validating Lawrence Hall image...');
        
        setResult(prev => ({ ...prev, isLoading: true, error: null }));

        // Call our API endpoint to extract EXIF data
        const response = await fetch(`/api/image-metadata?url=${encodeURIComponent(LAWRENCE_HALL_IMAGE_URL)}`);
        
        if (!response.ok) {
          throw new Error(`Metadata API returned ${response.status}`);
        }

        const data = await response.json();
        console.log('🔍 Image metadata:', data);
        
        if (!isMounted) return;

        if (!data.success) {
          throw new Error(data.error || 'Failed to extract image metadata');
        }

        // Extract date from EXIF data
        const exifDate = data.exif?.DateTimeOriginal || data.exif?.DateTime;
        
        if (!exifDate) {
          console.warn('⚠️  No date information found in EXIF data');
          setResult({
            isValid: false,
            isLoading: false,
            error: 'No date information available in image',
            imageDate: null,
            lastChecked: new Date().toISOString(),
          });
          return;
        }

        // Parse EXIF date (format: "YYYY:MM:DD HH:MM:SS")
        const parsedDate = parseExifDate(exifDate);
        
        if (!parsedDate) {
          throw new Error(`Invalid date format in EXIF: ${exifDate}`);
        }

        // Check if the image is from today (Pacific Time)
        const isFromToday = isImageFromToday(parsedDate);
        
        console.log(`📅 Image date: ${parsedDate.toISOString()}, Is from today: ${isFromToday}`);

        setResult({
          isValid: isFromToday,
          isLoading: false,
          error: null,
          imageDate: parsedDate.toISOString(),
          lastChecked: new Date().toISOString(),
        });

      } catch (error) {
        console.error('❌ Error validating Lawrence Hall image:', error);
        
        if (!isMounted) return;

        setResult({
          isValid: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          imageDate: null,
          lastChecked: new Date().toISOString(),
        });
      }
    };

    // Initial validation
    validateImage();

    // Set up periodic re-validation
    const interval = setInterval(validateImage, CACHE_DURATION);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return result;
}

// Parse EXIF date string (format: "YYYY:MM:DD HH:MM:SS")
function parseExifDate(exifDateString: string): Date | null {
  try {
    // Replace colons in date part with dashes for proper parsing
    const normalizedDate = exifDateString.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
    const date = new Date(normalizedDate);
    
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date;
  } catch {
    return null;
  }
}

// Check if the image date is from today in Pacific Time
function isImageFromToday(imageDate: Date): boolean {
  try {
    // Get current date in Pacific Time
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    
    // Get image date in Pacific Time (assuming the image timestamp is in local time)
    const imagePacificTime = new Date(imageDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    
    // Compare just the date parts (year, month, day)
    const todayDateString = pacificTime.toDateString();
    const imageDateString = imagePacificTime.toDateString();
    
    return todayDateString === imageDateString;
  } catch {
    return false;
  }
}
