import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Api from "../../config/settings";
import { FormatDate } from "../../common/functions/formatter";
import Edit from "./right/edit";

const index = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    Api.users.get().then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="midsection_full">
        <Route
          exact
          path="/users"
          render={() => (
            <>
              <h2 className="playfair-lg">Users</h2>

              <table className="lato-sm-b">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last Login</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                  {users.map((user) => (
                    <>
                      <tr>
                        <td>{user.id}</td>
                        <td>
                          {user.last_name}, {user.first_name}
                        </td>
                        <td>{user.email}</td>
                        <td>
                          {user.last_login
                            ? FormatDate(user.last_login)
                            : "Not Logged in yet"}
                        </td>
                        <td>{user.is_active ? "Active" : "Inactive"}</td>
                        <td>
                          <a href={`/users/edit/${user.id}`}>Edit</a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </>
          )}
        />

        <Route
          exact
          path="/users/edit/:id"
          render={(props) => <Edit props={props} />}
        />
      </div>
    </>
  );
};

export default index;
