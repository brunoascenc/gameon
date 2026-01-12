"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormError } from "@/hooks/use-form-error";
import { getErrorMessage, signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Digite sua senha"),
});

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { error, showError } = useFormError(form.watch);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Autenticação realizada com sucesso!");
          setLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          showError(getErrorMessage(ctx.error.code));
          toast.error("Erro de autenticação", {
            description: getErrorMessage(ctx.error.code),
          });
        },
      }
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>
          Digite o seu e-mail abaixo para entrar na sua conta
        </CardDescription>
        <CardAction>
          <Link href="/signup">
            <Button variant="link">Criar conta</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  label="E-mail"
                  placeholder="e-mail@exemplo.com"
                  errors={fieldState.error}
                />
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu a sua senha?
                    </a>
                  </div>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    errors={fieldState.error}
                  />
                </div>
              )}
            />
          </FieldGroup>
        </form>
        {error.show && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircleIcon />
            <AlertTitle>Ops... Encontramos um problema</AlertTitle>
            <AlertDescription>{error.description}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          form="login-form"
          isLoading={loading}
        >
          Entrar
        </Button>
        {/* <Button variant="outline" className="w-full">
          Entrar com google
        </Button> */}
      </CardFooter>
    </Card>
  );
}
