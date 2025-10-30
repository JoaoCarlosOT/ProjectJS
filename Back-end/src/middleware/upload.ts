import multer from "multer";
import path from "path";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) cb(null, true);
    else cb(new Error("Apenas arquivos PNG, JPG e JPEG são permitidos"));
  },
});

export const uploadToS3 = async (req: Request) => {
  if (!req.file) throw new Error("Arquivo não encontrado");

  const folder = req.originalUrl.includes("/todo") ? "todo" : "user";
  const key = `${folder}/${Date.now()}${path.extname(req.file.originalname)}`;

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: key,
      Body: req.file.buffer,
    },
  });

  await upload.done();

  return key;
};

export const getSignedImageUrl = async (key: string, expiresInSeconds = 3600) => {
  if (key.startsWith("http")) {
    return key;
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
  return url;
};

