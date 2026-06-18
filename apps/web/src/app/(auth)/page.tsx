"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@Docify/ui/components/card";
import { Separator } from "@Docify/ui/components/separator";
import Image from "next/image";

import { PasswordField } from "../../components/password-field";
import { Button } from "@Docify/ui/components/button";
import { Login } from "@/actions";
import { useActionState } from "react";

export default function Auth() {
  const [state, formAction, pending] = useActionState(Login, {
    success: false,
  });

  return (
    <div className="wrapper pt-20">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <div className="mx-auto flex size-24 items-center justify-center overflow-hidden rounded-lg">
            <Image
              className="h-full w-full object-contain"
              width={96}
              height={96}
              src="/Logo.webp"
              alt="Docify logo"
              priority
            />
          </div>
          <CardTitle className="text-4xl text-center">Docify</CardTitle>
          <CardDescription className="text-center">
            Введите данные — и готовый документ у вас через секунды. Без сложной терминологии.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4 h-px" />
          <form action={formAction}>
            <PasswordField errors={state.error} disabled={pending} />
            <Button loading={pending} fullWidth className={"mt-4"} type="submit">
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
