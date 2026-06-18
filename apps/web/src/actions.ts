"use server";

import { env } from "@Docify/env/server";
import { loginSchema } from "./schemas/login.schema";
import type { LoginState } from "./types/login-state.type";
import { redirect } from "next/navigation";

export async function Login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return { success: false, error: result.error.issues };
  }

  if (result.data.password !== env.PASSWORD) {
    return { success: false, error: [{ message: "Не верный пароль" }] };
  }

  redirect("/dashboard");
}
