import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const Row = ({ item }) => {
  let { url } = useRouteMatch();
  const location = {
    pathname: url + "/edit/" + item.id,
    state: {
      edit: true,
      song: item,
    },
  };
  // pathname:{`${url}/edit/${item.id}`}, state: {}}
  return (
    <tr>
      <td>{item.name}</td>
      <td> {item.artist_name} </td>
      <td> {item.plays} </td>
      <td>
        <span className="mg-h-5">
          {item.audio !== null ? <i className="fas fa-headphones"></i> : ""}
        </span>
        <span className="mg-h-5">
          {item.video !== null ? <i className="fas fa-video"></i> : ""}
        </span>
      </td>
      <td> {item.active ? "Active" : "Inactive"} </td>
      <td>
        <Link to={location}> Edit </Link>
      </td>
    </tr>
  );
};

const Table = ({ music }) => {
  let { url } = useRouteMatch();
  return (
    <div>
      <div className="fl-btw">
        <h2 className="playfair-lg">Music</h2>
        <Link to={`${url}/new`}>
          <button className="btn btn-black">Add new song</button>
        </Link>
      </div>
      <table className="lato-sm-b">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Plays</th>
            <th>Files</th>
            <th>Status</th>
            <th>Action </th>
          </tr>
          {music.length > 0 ? (
            music.map((item) => <Row item={item} key={item.id} />)
          ) : (
            <tr>
              <td colSpan="5"> No Music to show.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Styles = {
  table: {
    width: "calc(100% - 400px)",
  },
};

export default Table;
