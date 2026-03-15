'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/routes';
import { createPasswordSchema } from '@/utils/zod';
import { Icon } from '@iconify-icon/react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useResetPassHook } from '../hooks';

const FormSchema = z
  .object({
    password: createPasswordSchema,
    confirmPassword: z.string({ error: 'Password is required' }).min(1, 'Password is required'),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const ResetPasswordPage = () => {
  const router = useRouter();
  const token = useParams()?.token as string;

  const { mutate: resetMutation, isPending } = useResetPassHook();

  const { control, handleSubmit } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  if (!token) {
    router.push(ROUTES.auth.login);
    return;
  }

  const onSubmit = async (data: FormSchemaType) => {
    resetMutation(
      {
        password: data?.password,
        verificationToken: token,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.auth.login);
          toast.success(`Password reset successfully`);
        },
      }
    );
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
      <Card className='w-full max-w-sm shadow-lg'>
        <CardContent className='space-y-4 p-4'>
          <div className='text-left'>
            <h1 className='mb-2 text-2xl font-normal tracking-tight'>Reset Password? 🔒</h1>
            <p className='text-muted-foreground text-sm'>Set your new password below.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <FieldGroup>
              <Controller
                control={control}
                name='password'
                render={({ field, fieldState }) => {
                  return (
                    <Field aria-invalid={fieldState?.invalid}>
                      <FieldLabel htmlFor={field?.name}>Password</FieldLabel>

                      <PasswordInput
                        id={field?.name}
                        aria-invalid={fieldState?.invalid}
                        placeholder='******'
                        autoComplete='new-password'
                        {...field}
                      />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  );
                }}
              />

              <Controller
                control={control}
                name='confirmPassword'
                render={({ field, fieldState }) => {
                  return (
                    <Field aria-invalid={fieldState?.invalid}>
                      <FieldLabel htmlFor={field?.name}>Confirm Password</FieldLabel>

                      <PasswordInput
                        id={field?.name}
                        aria-invalid={fieldState?.invalid}
                        placeholder='******'
                        autoComplete='new-password'
                        {...field}
                      />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  );
                }}
              />

              <Button type='submit' disabled={isPending} className='w-full'>
                {isPending && <Spinner />}
                Set New Password
              </Button>
            </FieldGroup>
          </form>

          <div className='text-center'>
            <Link href={ROUTES.auth.login}>
              <Button variant='link' className='text-sm font-medium '>
                <Icon icon='lucide:arrow-left' /> Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
