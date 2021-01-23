import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = path.join(__dirname, '../uploads');
    cb(null, dir)
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage});
export { upload };