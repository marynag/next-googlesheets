"use client";
import { useSendData } from "@/hooks/useDataSend";
import React from "react";
import { Controller } from "react-hook-form";

export const Form = () => {
  const { control, handleSubmit, errors, onSubmit } = useSendData();

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-900"
          >
            First name
          </label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="firstName"
                type="text"
                required
                autoComplete="firstName"
                className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            )}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="lastName"
                type="text"
                autoComplete="lastName"
                className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            )}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-1 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-900"
          >
            Message
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="message"
                type="text"
                required
                autoComplete="message"
                className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            )}
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};
