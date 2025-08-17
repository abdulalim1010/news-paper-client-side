import axios from "axios";
import UseAuth from "../../hooks/UseAuth";

const DummyArticleButton = () => {
  const { user } = UseAuth();

  const handleCreate = async () => {
    const article = {
      title: "Demo Article",
      content: "This article is for testing collection creation.",
      authorEmail: user?.email || "test@example.com"
    };

    try {
      const res = await axios.post("https://y-ruby-three.vercel.app/articles", article);
      console.log("Article saved:", res.data);
      alert("✅ Article created!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={handleCreate} className="btn btn-success">
      Create Dummy Article
    </button>
  );
};

export default DummyArticleButton;
