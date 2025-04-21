import { z } from "zod";

export const schema = z.object({
  email: z.string({ message: "This Required Field" }),
  firstName: z.string({ message: "This Required Field" }),
  lastName: z.string({ message: "This Required Field" }),
  message: z.string({ message: "This Required Field" }),
});

export type FormData = z.infer<typeof schema>;
