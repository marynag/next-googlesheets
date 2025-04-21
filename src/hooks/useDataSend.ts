"use client";
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

  const onSubmit = async (sendData: FormData) => {
    const data: Partial<FormData> = {};

    if (sendData) {
      if (sendData.email) data.email = sendData.email;
      if (sendData.firstName) data.firstName = sendData.firstName;
      if (sendData.lastName) data.lastName = sendData.lastName;
      if (sendData.message) data.message = sendData.message;
    }

    await fetch(`/api/getPostData?email=${sendData.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  return {
    control,
    handleSubmit,
    errors,
    reset,
    onSubmit,
  } as const;
};
