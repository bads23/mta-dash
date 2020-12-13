import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Api from "../../config/settings";

import Table from "./table";
import Form from "./form";

const Music = () => {
  const [music, setMusic] = useState([]);
  let { url } = useRouteMatch();

  const getMusic = () => {
    Api.music.get().then((res) => {
      setMusic(res.data);
    });
  };

  useEffect(() => {
    getMusic();
  }, []);

  return (
    <Switch>
      <Route exact path={`${url}`}>
        <Table music={music} />
      </Route>

      <Route path={`${url}/edit/:id`}>
        <Form getMusic={getMusic} />
      </Route>

      <Route path={`${url}/new`}>
        <Form getMusic={getMusic} />
      </Route>
    </Switch>
  );
};

const Styles = {
  container: {
    width: "100%",
  },
  table: {
    width: "calc(100% - 400px)",
  },
  form: {
    width: "350px",
  },
};

export default Music;
