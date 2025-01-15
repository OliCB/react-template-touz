import { useQuery } from "@tanstack/react-query";
import styles from "./styles/App.module.css";
import { User } from "./types/User";
import { useMemo, useState } from "react";
import { UserProcesses } from "./UserProcesses";

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
    () =>
      (userFilter ? data?.filter((user) => user.id === userFilter) : data) ??
      [],
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
      <UserProcesses filteredUsers={filteredUsers} />
    </div>
  );
}
