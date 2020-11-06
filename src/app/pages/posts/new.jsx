import React, { useState } from "react";
import Input, { Editor } from "../../common/inputs";
import Api from "../../config/settings";

const New = ({ props }) => {
  const [post, setPost] = useState([]);

  const handleTitle = (e) => {
    var np = { ...post };
    np.Title = e.target.value;
    setPost(np);
  };

  const handleSubtitle = (e) => {
    var np = { ...post };
    np.Subtitle = e.target.value;
    setPost(np);
  };

  const handleArticle = (e) => {
    var np = { ...post };
    np.Content = e.editor.getData();
    setPost(np);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    var btn = document.getElementById("editBtn");
    btn.innerText = "Saving...";
    btn.disabled = "disabled";

    Api.news
      .post(post)
      .then((res) => {
        btn.innerText = "Saved!";
        setTimeout(() => {
          window.location.href = "/posts/edit/" + res.data.id;
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="midsection_full">
        <h2 className="playfair-lg">New Post</h2>

        <form onSubmit={handleSubmit} className="mg-v-20">
          <Input
            type="text"
            label="Title"
            onChange={handleTitle}
            value={post.Title}
          />
          <Input
            type="Text"
            label="Subtitle"
            onChange={handleSubtitle}
            value={post.Subtitle}
          />
          {/* <Textarea label="Article" onChange={handleArticle} /> */}
          <Editor
            label="Article"
            value={post.Content}
            onChange={handleArticle}
          />
          <button className="btn btn-black" id="editBtn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default New;
