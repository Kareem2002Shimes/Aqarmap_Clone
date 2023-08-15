import * as z from "zod";


export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(40),
});


export type ILogin = z.infer<typeof loginSchema>;
