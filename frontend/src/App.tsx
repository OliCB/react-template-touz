import { useQuery } from "@tanstack/react-query";
import styles from "./styles/App.module.css";
import { User } from "./types/User";
import { Status } from "./types/Status";
import { useMemo, useState } from "react";

export default function App() {
  const { data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5208/users");
      return await res.json();
    },
    refetchInterval: 5000,
  });

  const [userFilter, setUserFilter] = useState<string | undefined>();
  const filteredUsers = useMemo(
    () => (userFilter ? data?.filter((user) => user.id === userFilter) : data),
    [data, userFilter]
  );
  const userIds = useMemo(() => data?.map((user) => user.id), [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Process tracker</h1>
      <form style={{ marginBottom: "1rem" }}>
        <label>User: </label>
        <select
          onChange={(e) => {
            e.stopPropagation();
            setUserFilter(e.target.value);
          }}
          value={userFilter}
        >
          {[
            <option key="filter-default"></option>,
            ...(userIds?.map((u) => (
              <option key={`filter-${u}`} value={u}>
                {u}
              </option>
            )) ?? []),
          ]}
        </select>
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Process Id</th>
            <th>Process Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) =>
            user.processes.map((process) => (
              <tr key={`${user.id}-${process.id}`}>
                <td>{user.id}</td>
                <td>{process.id}</td>
                <td>
                  <div
                    className={
                      styles[`proc-${Status[process.status].toLowerCase()}`]
                    }
                  >
                    {Status[process.status]}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
