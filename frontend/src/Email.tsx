import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

type FormValues = {
  recipientEmail: string;
  subject: string;
  body: string;
};

export const Email = () => {
  const { control, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const rawResponse = await fetch("http://localhost:5208/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();
    console.log(rawResponse);
  };

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
