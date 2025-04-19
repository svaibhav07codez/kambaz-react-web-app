import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import * as courseclient from "../Courses/client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();
  console.log("Users", uid);
  const fetchUsers = async () => {
    if (!uid) {
      console.warn("⛔️ No UID present for fetching users");
      return;
    }
    console.log("boss are you here");
    const users = await courseclient.findUsersForCourse(uid);
    setUsers(users);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    const fetch = async () => {
      if (uid) {
        const users = await courseclient.findUsersForCourse(uid);
        setUsers(users);
      } else {
        const users = await client.findAllUsers();
        setUsers(users);
      }
    };
    fetch();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <select
            value={role}
            onChange={(e) => filterUsersByRole(e.target.value)}
            className="form-select w-25"
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>

          <FormControl
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
            placeholder="Search people"
            className="w-25"
          />
        </div>

        <button onClick={createUser} className="btn btn-danger wd-add-people">
          <FaPlus className="me-2" />
          Users
        </button>
      </div>

      <PeopleTable users={users} />
    </div>
  );
}
