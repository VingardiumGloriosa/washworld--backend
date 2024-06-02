import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageCompressionService {
  async compressImage(imageBuffer: Buffer, quality: number = 80, resize: { x: number, y: number } = { x: 240, y: 160 }): Promise<Buffer> {
    try {
      await sharp(imageBuffer).metadata();
      const compressedBuffer = resize ?
          await sharp(imageBuffer).resize(resize.x, resize.y).jpeg({ quality }).toBuffer()
        :
          await sharp(imageBuffer).jpeg({ quality }).toBuffer()
      return compressedBuffer;
    } catch (error) {
      throw new Error('Error compressing image: ' + error.message);
    }
  }
}
