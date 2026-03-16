"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useAuth } from "@/components/auth-handler";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/modules/auth/hooks";
import { emailSchema, stringSchema } from "@/utils/zod";
import { toast } from "sonner";
import { useState } from "react";
import next from "next";
import DemoCredentialsPopup from "@/components/demoCredentialPopup";

const formSchema = z.object({
  email: emailSchema,
  password: stringSchema("Password"),
});

type LoginSchemaType = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [openDemo, setOpenDemo] = useState(false);


  const { mutate: loginStudent, isPending } = useLogin();
  const { setLoggedInUser } = useAuth();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(values: LoginSchemaType) {
    loginStudent(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (res) => {
          toast.success("Logged in successfully!");

          // Cookies.set(accessTokenName, res?.data?.accessToken, {
          //   sameSite: 'strict',
          //   secure: process.env.NODE_ENV === 'production',
          //   expires: 1,
          // });
          // Cookies.set(refreshTokenName, res?.data?.refreshToken, {
          //   sameSite: 'strict',
          //   secure: process.env.NODE_ENV === 'production',
          //   expires: 7,
          // });

          setLoggedInUser(res?.user);
        },
      },
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            <CardTitle className="text-2xl my-5">Login</CardTitle>
            <Image
              src="/logo.jpg"
              width={120}
              height={80}
              alt="Logo"
              className="object-contain"
              unoptimized
            />
          </CardTitle>
          <CardDescription>
            Login account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              {/* Email Field */}

              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => {
                  return (
                    <Field aria-invalid={fieldState?.invalid}>
                      <FieldLabel htmlFor={field?.name}>Email</FieldLabel>
                      <Input
                        id={field?.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Email"
                        {...field}
                      />
                      {fieldState?.invalid && (
                        <FieldError
                          errors={[fieldState?.error, fieldState?.error?.root]}
                        />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Password Field */}

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => {
                  return (
                    <Field aria-invalid={fieldState?.invalid}>
                      <FieldLabel htmlFor={field?.name}>Password</FieldLabel>

                      <PasswordInput
                        id={field?.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="******"
                        autoComplete="new-password"
                        {...field}
                      />
                      {fieldState?.invalid && (
                        <FieldError
                          errors={[fieldState?.error, fieldState?.error?.root]}
                        />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            {/* <div className="text-right">
              <Link
                href={ROUTES.auth.forgotPassword}
                className="text-sm  hover:underline "
              >
                Forgot Password?
              </Link>
            </div> */}

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Spinner />}
              Login
            </Button>
          </form>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.student.register} className="underline">
              Register
            </Link>
          </div> */}
        </CardContent>
      </Card>
      <Button onClick={() => setOpenDemo(true)} className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full  bg-black text-white py-2.5 text-sm font-medium hover:bg-gray-900 transition ">
        Show Demo Credentials
      </Button>
      {openDemo && <DemoCredentialsPopup setOpen={setOpenDemo} />}
    </div>
  );
}
