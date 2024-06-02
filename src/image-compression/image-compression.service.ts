import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageCompressionService {
  async compressImage(imageBuffer: Buffer, quality: number = 80): Promise<Buffer> {
    try {
      const compressedBuffer = await sharp(imageBuffer)
        .jpeg({ quality })
        .toBuffer();
      return compressedBuffer;
    } catch (error) {
      throw new Error('Error compressing image: ' + error.message);
    }
  }
}
