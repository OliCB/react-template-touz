import { Process } from "./Process";

export type User = {
  id: string;
  processes: Process[];
};
