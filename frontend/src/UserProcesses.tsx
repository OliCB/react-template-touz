import { Status } from "./types/Status";
import { User } from "./types/User";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

type UserProcessesProps = {
  filteredUsers: User[];
};

type UserProcessesData = {
  userId: string;
  id: string;
  status: Status;
};

const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.Failed:
      return "red";
      break;
    case Status.Running:
      return "yellow";
      break;
    case Status.Succeeded:
      return "greenyellow";
      break;
  }
};

const getColor = (status: Status) => {
  if (status === Status.Failed) return "white";
};

export const UserProcesses = ({ filteredUsers }: UserProcessesProps) => {
  const userData = filteredUsers.reduce<UserProcessesData[]>(
    (prev, curr) => [
      ...prev,
      ...curr.processes.map((p) => ({ ...p, userId: curr.id })),
    ],
    []
  );

  return (
    <DataGrid
      columns={[
        {
          field: "userId",
          headerName: "User Id",
        },
        {
          field: "id",
          headerName: "Process Id",
          width: 200,
        },
        {
          field: "status",
          headerName: "Process Status",
          valueFormatter: (status) => Status[status],
          renderCell: (params) => (
            <Paper
              elevation={2}
              sx={{
                display: "inline",
                padding: "5px",
                backgroundColor: getStatusColor(params.value),
                color: getColor(params.value),
              }}
            >
              {params.formattedValue}
            </Paper>
          ),
          flex: 1,
        },
      ]}
      rows={userData}
      hideFooter
    />
  );
};
