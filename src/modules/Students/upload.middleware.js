import multer from "multer";
// store file in memory
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow only images/videos/docs

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/avif",
    "video/mp4",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 20 * 1024 * 1024, // 20 MB
  },
});
