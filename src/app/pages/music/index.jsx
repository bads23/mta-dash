import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
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

export default Music;
