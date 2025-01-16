import { Email, FormValues } from "@/Email";

export const MailerSend = () => {
  const handleSubmit = async (data: FormValues) => {
    await fetch("http://localhost:5208/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return <Email onSubmit={handleSubmit} />;
};
