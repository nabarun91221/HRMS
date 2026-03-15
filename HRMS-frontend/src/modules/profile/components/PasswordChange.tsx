import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
import { useChangePassHook } from '@/modules/auth/hooks';
import { createPasswordSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password required' }),

    newPassword: createPasswordSchema,

    confirmPassword: z.string().min(1, { message: 'Confirm password required' }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordChangeFormType = z.infer<typeof passwordSchema>;

const PasswordChange = () => {
  const { control, handleSubmit } = useForm<PasswordChangeFormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { mutate: changePassword, isPending } = useChangePassHook();

  const onSubmit = (data: PasswordChangeFormType) => {
    changePassword(
      {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success('Password changed successfully');
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Change</CardTitle>
      </CardHeader>
      <CardContent className='max-w-[500px]'>
        <FieldGroup>
          <Controller
            control={control}
            name='currentPassword'
            render={({ field, fieldState }) => {
              return (
                <Field aria-invalid={fieldState?.invalid}>
                  <FieldLabel htmlFor={field?.name}>Current Password</FieldLabel>

                  <PasswordInput
                    id={field?.name}
                    aria-invalid={fieldState.invalid}
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
            name='newPassword'
            render={({ field, fieldState }) => {
              return (
                <Field aria-invalid={fieldState?.invalid}>
                  <FieldLabel htmlFor={field?.name}>New Password</FieldLabel>

                  <PasswordInput
                    id={field?.name}
                    aria-invalid={fieldState.invalid}
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
                    aria-invalid={fieldState.invalid}
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
        </FieldGroup>
      </CardContent>

      <CardFooter>
        <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
          {isPending && <Spinner />}
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordChange;
