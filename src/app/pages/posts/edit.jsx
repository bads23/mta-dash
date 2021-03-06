import React, { useState, useEffect } from "react";
import Input, { Editor } from "../../common/inputs";
import Api from "../../config/settings";
import { Uploader } from "../../common/inputs";

const Edit = ({ props }) => {
  const [post, setPost] = useState([]);
  const [cover, setCover] = useState("");
  const [image, setImage] = useState("");

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
      .put(props.match.params.id, post)
      .then((res) => {
        if (cover !== "") {
          var payload = new FormData();
          payload.append("category", "posts");
          payload.append("post_id", props.match.params.id);
          payload.append("image", image);

          Api.images
            .post(payload)
            .then((res) => {
              btn.innerText = "Saved!";
            })
            .catch((error) => {
              btn.disabled = "";
              console.log(error);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getItem = (id) => {
    Api.news.get(`${id}/`).then((res) => {
      setPost(res.data);
      setCover(`${process.env.REACT_APP_MEDIA_URL}${res.data.Cover_Image}`);
    });
  };

  const showImage = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setCover(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const deletePost = () => {
    Api.news.delete(props.match.params.id).then(() => {
      window.location.href = "/posts";
    });
  };

  useEffect(() => {
    getItem(props.match.params.id);
  }, []);

  return (
    <>
      <div className="midsection_full">
        <h2 className="playfair-lg">Edit Post</h2>

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
          <Editor
            label="Article"
            value={post.Content}
            onChange={handleArticle}
          />
          <Uploader url={cover} postId={post.id} onChange={showImage} />
          <div className="flex fl-btw">
            <button type="submit" className="btn btn-black" id="editBtn">
              Save
            </button>
            <br />
            <br />
            <button
              type="reset"
              className="btn btn-red"
              id="delBtn"
              onClick={deletePost}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
