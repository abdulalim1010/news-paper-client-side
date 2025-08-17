import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

const AddArticle = () => {
  const { user } = UseAuth();
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const tagOptions = [
    { value: "politics", label: "Politics" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" },
    { value: "education", label: "Education" },
  ];

  useEffect(() => {
    axios
      .get("https://y-ruby-three.vercel.app/publishers")
      .then((res) => {
        const options = res.data.map((pub) => ({
          value: pub.name,
          label: pub.name,
        }));
        setPublishers(options);
      })
      .catch((err) => {
        console.error("❌ Failed to load publishers", err);
        Swal.fire("Error", "Failed to load publishers", "error");
      });
  }, []);

  // ✅ Image upload handler
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", imageFile);

    setLoadingImage(true);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      const url = response.data.data.url;
      setImageUrl(url);
      console.log("📷 Uploaded Image URL:", url);
      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      console.error("Image upload failed", error);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !imageUrl || !selectedPublisher || tags.length === 0 || !description) {
      Swal.fire("Error", "সব ফিল্ড পূরণ করুন!", "error");
      return;
    }

    const articleData = {
      title,
      image: imageUrl,
      publisher: selectedPublisher?.value,
      tags: tags.map((t) => t.value),
      description,
      authorEmail: user?.email,
      status: "pending",
      isPremium: false,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("https://y-ruby-three.vercel.app/articles", articleData);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("✅ Success", "Article submitted for approval!", "success");
        setTitle("");
        setImageUrl("");
        setSelectedPublisher(null);
        setTags([]);
        setDescription("");
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      Swal.fire("Error", "Failed to submit article", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold">📝 Add New Article</h2>

      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
      />

      {/* ✅ File upload input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input file-input-bordered w-full"
      />
      {loadingImage && <p className="text-blue-500">Uploading image...</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-32 h-20 object-cover rounded"
        />
      )}

      <div>
        <label className="font-medium block mb-1">Publisher</label>
        <Select
          options={publishers}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
        />
      </div>

      <div>
        <label className="font-medium block mb-1">Tags</label>
        <Select
          isMulti
          options={tagOptions}
          value={tags}
          onChange={setTags}
          placeholder="Select Tags"
        />
      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full"
        rows={5}
      />

      <button type="submit" className="btn btn-primary w-full">
        Submit Article
      </button>
    </form>
  );
};

export default AddArticle;
