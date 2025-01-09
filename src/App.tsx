import { useQuery } from "@tanstack/react-query";
import styles from "./styles/App.module.css";
import { User } from "./types/User";

export default function App() {
  const { data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/users");
      return await res.json();
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Process tracker</h1>
      <table className={styles.table}>
        <tr>
          <th>User Id</th>
          <th>Process Id</th>
          <th>Process Status</th>
        </tr>
        {data?.map((user) =>
          user.processes.map((process) => (
            <tr key={`${user.id}-${process.id}`}>
              <td>{user.id}</td>
              <td>{process.id}</td>
              <td>
                <div className={styles[`proc-${process.status.toLowerCase()}`]}>
                  {process.status}
                </div>
              </td>
            </tr>
          ))
        )}
      </table>
    </div>
  );
}
