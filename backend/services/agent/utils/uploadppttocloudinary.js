import cloudinary from "../config/cloudinary.js";

export const uploadPptToCloudinary = async (filePath, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: "ppt-agent",
      use_filename: true,
      unique_filename: true,
      filename_override: fileName,
      overwrite: false,
    });

    if (!result?.secure_url) {
      throw new Error("Cloudinary upload did not return a secure URL.");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", {
      message: error.message,
      http_code: error.http_code,
      apiError: error.error,
    });
    const detail = error.error?.message || error.message;
    throw new Error(`Failed to upload PPT to Cloudinary: ${detail}`);
  }
};
