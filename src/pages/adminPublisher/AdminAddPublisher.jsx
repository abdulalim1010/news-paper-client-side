import React, { useState } from "react";
import axios from "axios";

const AdminAddPublisher = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formDataImg
      );
      const imageUrl = res.data.data.url;
      setFormData((prev) => ({ ...prev, logo: imageUrl }));
      setMessage("✅ Logo uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed", error);
      setMessage("❌ Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.logo) {
      setMessage("❗ Name and Logo are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://y-ruby-three.vercel.app/publishers", formData);
      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Publisher added successfully!");
        setFormData({ name: "", logo: "", description: "" });
      }
    } catch (error) {
      setMessage("❌ Failed to add publisher.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Publisher</h2>

      {message && (
        <p className={`mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Publisher Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter publisher name"
          required
        />

        <label className="block mb-2 font-semibold">Logo Image Upload *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        {formData.logo && (
          <img src={formData.logo} alt="Logo preview" className="w-24 h-24 object-cover mb-4" />
        )}

        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Short description (optional)"
          rows="3"
        />

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Publisher"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddPublisher;
