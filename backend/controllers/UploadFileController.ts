import { Request, Response, NextFunction } from 'express';
import cloudinary from '../core/cloudinary';
import { HTTPError } from '../interface/HttpException';

class UploadFile {
  async upload(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction>{
    try {
      cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error || !result) {
          res.status(500).json({
            status: 'error',
            message: error || 'Cloundinary error'
          });
          return;
        }

        res.status(201).json({
          status: 'success',
          data: {
            url: result.url,
            size: Math.round(result.bytes / 1024),
            height: result.height,
            width: result.width
          }
        });
      }).end(req.file.buffer);
    } catch (error) {
      console.log(error);
      return next(new HTTPError());
    }
  }
}

export const fileUploadController = new UploadFile();