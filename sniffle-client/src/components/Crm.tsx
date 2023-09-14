import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../services/usersServices";
import { successMsg } from "../services/feedbacksServices";

interface CrmProps {}

const Crm: FunctionComponent<CrmProps> = () => {
  let [users, setUsers] = useState<User[]>([]);
  let [usersChanged, setUsersChanged] = useState<boolean>(false);
  let navigate = useNavigate();

  let render = () => {
    setUsersChanged(!usersChanged);
  };
  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [usersChanged]);

  let handleDelete = (user: User) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(user._id as string)
        .then((res) => {
          successMsg("User removed successfully");

          render();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {users.length ? (
        <table className="table">
          <thead>
            <tr className="table-success">
              <td>User Id</td>
              <td>Name</td>
              <td>Mail</td>
              <td>Password</td>
              <td>role</td>

              <td>Edit User</td>
              <td>Delete User</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/user-profile/${user._id}`}>
                    <i className="fa-regular fa-pen-to-square" />
                  </Link>
                </td>
                <td>
                  <Link to="" onClick={() => handleDelete(user)}>
                    <i className="fa-solid fa-trash" style={{ color: "#d23737" }}></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>There are no users</h3>
      )}
    </>
  );
};

export default Crm;
