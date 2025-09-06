export const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME = "dbhygjkra"; // replace
  const UPLOAD_PRESET = "ydopinis"; // replace

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // return image URL
};
