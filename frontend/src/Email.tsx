import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

export type FormValues = {
  recipientEmail: string;
  subject: string;
  body: string;
};

export const Email = ({
  onSubmit,
}: {
  onSubmit: (values: FormValues) => Promise<void>;
}) => {
  const { control, handleSubmit, reset } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="recipientEmail"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Recipient"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="subject"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Subject" variant="outlined" fullWidth />
        )}
      />

      <Controller
        name="body"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
      >
        Submit
      </Button>
    </form>
  );
};
