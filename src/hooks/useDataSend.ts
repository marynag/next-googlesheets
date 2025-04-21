import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schema, FormData } from "@/components/form/form.service";

export const useSendData = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (sendData: FormData) => {
    const data: Partial<FormData> = {};

    if (sendData) {
      if (sendData.email) data.email = sendData.email;
      if (sendData.firstName) data.firstName = sendData.firstName;
      if (sendData.lastName) data.lastName = sendData.lastName;
      if (sendData.message) data.message = sendData.message;
    }
    console.log("data", data);
    // mutate({ data });
  };

  return {
    control,
    handleSubmit,
    errors,
    reset,
    onSubmit,
  } as const;
};
