"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { schema, FormData } from "@/components/form/form.service";

export type RowData = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
};

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
        reset({
          email: "",
          firstName: "",
          lastName: "",
          message: "",
        });
        toast("Your feedback was send", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.error("Error", err);
        toast("something went wrong", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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

export const useGetData = async (): Promise<RowData[]> => {
  try {
    const response = await fetch(`/api/getPostData`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: RowData[] = await response.json();

    return data;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
};
