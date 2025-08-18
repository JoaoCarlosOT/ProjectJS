import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'src/uploads/user'; 

    if (req.originalUrl.includes('/todos')) {
      folder = 'src/uploads/todo';
    }

    ensureDirExists(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });
