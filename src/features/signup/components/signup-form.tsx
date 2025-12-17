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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.email("E-mail inválido"),
    username: z.string().min(1, "Username inválido"),
    name: z.string().min(4, "Nome inválido"),
    password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
    terms: z.boolean().refine((value) => value === true, {
      message: "Você precisa aceitar os termos de uso",
    }),
    confirmPassword: z
      .string()
      .min(6, "Sua senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      name: "",
      terms: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          username: data.username,
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            router.push("/");
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>
          Preencha o formulário para criar a sua conta
        </CardDescription>
        <CardAction>
          <Link href="/signin">
            <Button variant="link">Entrar</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  label="Nome"
                  placeholder="Digite o seu nome"
                  autoComplete="new-password"
                  errors={fieldState.error}
                />
              )}
            />
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
                  autoComplete="new-password"
                  errors={fieldState.error}
                />
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="username"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  label="Nome de usuário"
                  placeholder="Digite seu nome de usuário"
                  autoComplete="new-password"
                  errors={fieldState.error}
                />
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  errors={fieldState.error}
                  placeholder="Digite a sua senha"
                  label="Senha"
                  autoComplete="new-password"
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  errors={fieldState.error}
                  label="Confirmar senha"
                  autoComplete="new-password"
                  placeholder="Confirme a sua senha"
                />
              )}
            />
            <Controller
              name="terms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="flex w-full gap-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                      id="terms"
                      aria-invalid={fieldState.invalid}
                    />
                    <div className="grid gap-1">
                      <FieldLabel htmlFor="terms">
                        Aceitar termos de uso
                      </FieldLabel>
                      <p className="text-muted-foreground text-sm">
                        Ao clicar nesse checkbox, você concorda com os termos de
                        uso.
                      </p>
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="signup-form">
          Realizar cadastro
        </Button>
      </CardFooter>
    </Card>
  );
}
