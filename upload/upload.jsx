import { Cloudinary } from "cloudinary";

const cloudinary = new Cloudinary({
  cloud_name: "your_cloud_name",
  secure: true,
});

const handleImageChange = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_unsigned_preset");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        cloudinary.config().cloud_name
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.secure_url) {
      setForm((prev) => ({ ...prev, image: data.secure_url }));
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
