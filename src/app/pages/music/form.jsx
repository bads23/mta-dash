import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import _ from "underscore";

import Input, { Select, Checkbox, File, ErrorDiv } from "../../common/inputs";
import Api from "../../config/settings";

const Form = ({ getMusic, styles }) => {
  const [song, setSong] = useState({});
  const [media, setMedia] = useState({});
  const [artists, setArtists] = useState([]);
  const [edit, setEdit] = useState(false);

  let { url } = useRouteMatch();
  let history = useHistory();
  let { id } = useParams();
  let { state } = useLocation();

  const handleInput = (e) => {
    setSong({ ...song, [e.target.id]: e.target.value });
    console.log(song);
  };

  const handleCheck = (e) => {
    setSong({ ...song, active: e.target.checked });
    console.log(song);
  };

  const handleBtn = (message, timeout) => {
    var def = "Save";
    let btn = document.getElementById("submitBtn");
    btn.innerText = message;

    if (timeout > 0) {
      setTimeout(() => {
        btn.innerText = def;
      }, timeout);
    }
  };

  const handleMedia = (e) => {
    var fd = new FormData();
    fd.append("category", e.target.id);
    fd.append("image", e.target.files[0]);
    fd.append("id", id);
    setMedia({ ...media, [e.target.id]: fd });
    console.log(media);
  };

  const UploadMedia = () => {
    _.each(media, (value) => {
      Api.images.post(value).then((res) => {
        console.log(res.data);
        getSong();
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBtn("Saving...", 0);
    {
      edit
        ? Api.music.put(id, song).then((res) => {
            handleBtn("Saved!", 3000);
            UploadMedia(res.data.id);
          })
        : Api.music.post(song).then((res) => {
            handleBtn("Saved!", 3000);
            setEdit(true);
            history.push({ pathname: "/music/edit/" + res.data.id });
          });
    }
  };

  const getArtists = () => {
    Api.clients.get("?category=1").then((res) => {
      setArtists(res.data);
    });
  };

  const getSong = () => {
    Api.music.get(`${id}`).then((res) => {
      setSong(res.data);
    });
  };

  useEffect(() => {
    getArtists();

    if (url === "/music/new") {
    } else {
      setEdit(true);
      getSong();
    }
  }, [edit]);

  return (
    <div style={styles}>
      <div className="mg-b-50">
        <Link to="/music">
          <p className="lato-m ">
            <i className="fas fa-arrow-left mg-h-5"></i>
            Go Back
          </p>
        </Link>
      </div>
      <h2 className="playfair-lg">{edit ? "Edit Song" : "Add new Song"}</h2>
      <span>{}</span>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          ph="Song name"
          id="name"
          value={song.name}
          onChange={handleInput}
          label="Song Name"
          required="true"
        />
        <Select
          id="artist"
          value={song.artist}
          options={artists}
          onChange={handleInput}
          label="Artist"
          required="true"
        />

        {edit ? (
          <>
            <File
              label="Cover Art"
              accept="image/*"
              onChange={handleMedia}
              id="thumbs"
              value={song.image}
            />
            <File
              label="Audio File"
              accept="audio/*"
              onChange={handleMedia}
              id="audio"
              value={song.audio}
            />
            <File
              label="Video File (200MB max)"
              accept="video/*"
              onChange={handleMedia}
              id="video"
              value={song.video}
            />
          </>
        ) : (
          <></>
        )}

        <Checkbox
          id="active"
          value={song.active}
          label="Active"
          onChange={handleCheck}
          checked={song.active}
        />

        <ErrorDiv />

        <button type="submit" id="submitBtn" className="btn btn-black">
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
