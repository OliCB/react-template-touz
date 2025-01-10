import { useQuery } from "@tanstack/react-query";
import styles from "./styles/App.module.css";
import { User } from "./types/User";
import { Status } from "./types/Status";

export default function App() {
  const { data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5208/users");
      return await res.json();
    },
    refetchInterval: 5000,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Process tracker</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Process Id</th>
            <th>Process Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) =>
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
