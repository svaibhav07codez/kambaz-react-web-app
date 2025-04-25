import { useEffect, useState } from "react";
import { findUsersForCourse } from "../client";
import { useParams } from "react-router";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const loadUsers = async () => {
      const enrolledUsers = await findUsersForCourse(cid!);
      setUsers(enrolledUsers);
    };
    loadUsers();
  }, [cid]);
  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} />
    </div>
  );
}
