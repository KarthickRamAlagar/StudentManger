import cloudinary from "../../config/cloudinary.js";

export const uploadToCloudinary = async (
  fileBuffer,
  folder = "students",
  resourceType = "image",
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
};

// After Succeeds Cloudinary Returns
// {
//   public_id: "products/abc123",
//   secure_url: "https://res.cloudinary.com/...",
//   format: "jpg",
//   width: 1200,
//   height: 1200,
//   bytes: 204800,
//   resource_type: "image"
// }
