'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/routes';
import { phoneNumberSchema } from '@/utils/zod';
import { Icon } from '@iconify-icon/react';

import PhoneInput from '@/components/phone-input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForgotPassHook, useForgotPassVerifyOtpHook } from '../hooks';

const FormSchema = z.object({
  phone: phoneNumberSchema,
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const [coolDownTime, setCoolDownTime] = useState(0);

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const [otp, setOtp] = useState('');

  const { mutate: forgotPassword, isPending: isForgotPasswordPending } = useForgotPassHook();

  const { mutate: forgotPasswordVerifyOtp, isPending: isForgotPasswordVerifyOtpPending } =
    useForgotPassVerifyOtpHook();

  const { control, handleSubmit, getValues } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    forgotPassword(
      {
        phone: data?.phone,
      },
      {
        onSuccess: () => {
          toast.success('Link sent successfully');
          setOpenOtpDialog(true);
          setCoolDownTime(120);
          startTimer();
        },
      }
    );
  };

  const startTimer = () => {
    const _timer = setInterval(() => {
      setCoolDownTime(prev => {
        if (prev <= 1) {
          clearInterval(_timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(_timer);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onOtpSubmit = () => {
    if (!otp) return;

    forgotPasswordVerifyOtp(
      {
        otp,
        purpose: 'PASSWORD_RESET',
        identifier: getValues('phone'),
      },
      {
        onSuccess: res => {
          toast.success('OTP verified successfully, redirecting...');
          setOpenOtpDialog(false);
          router.push(ROUTES.auth.resetPassword(res?.data?.verificationToken));
        },
      }
    );
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <Card className='w-full max-w-sm '>
        <CardContent className='space-y-4'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='tracking-left text-2xl font-normal'>Forgot Password?🔒</h1>
            <p className='text-muted-foreground mb-3 text-sm'>
              Enter your email and we will send you instructions to reset your password.
            </p>
          </div>

          <FieldGroup>
            <Controller
              control={control}
              name='phone'
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Phone</FieldLabel>
                    <PhoneInput {...field} />
                    {fieldState?.invalid && (
                      <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                    )}
                  </Field>
                );
              }}
            />

            <Field>
              <Button
                disabled={isForgotPasswordPending || coolDownTime > 0}
                className='w-full'
                onClick={handleSubmit(onSubmit)}
                type='submit'
              >
                {isForgotPasswordPending && <Spinner />}

                {coolDownTime > 0 ? `Resend OTP in ${coolDownTime} seconds` : 'Send OTP'}
              </Button>
            </Field>
          </FieldGroup>

          <div className='mt-2 text-center'>
            <Link href={ROUTES.auth.login}>
              <Button variant='link'>
                <Icon icon='lucide:arrow-left' /> Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openOtpDialog}>
        <DialogContent className='sm:max-w-[425px] [&>button:last-child]:hidden'>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>Please check your email for the OTP.</DialogDescription>
          </DialogHeader>
          <div className='flex justify-center flex-col gap-4 items-center py-2'>
            <InputOTP
              maxLength={4}
              pattern='[0-9]*'
              inputMode='numeric'
              value={otp}
              onChange={setOtp}
              onKeyDown={e => {
                if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>

            <div>
              <Button
                disabled={
                  isForgotPasswordVerifyOtpPending || isForgotPasswordPending || coolDownTime > 0
                }
                variant={'link'}
                onClick={handleSubmit(onSubmit)}
                className='text-muted-foreground'
              >
                {isForgotPasswordPending
                  ? 'Sending OTP...'
                  : coolDownTime > 0
                    ? `Resend OTP in ${coolDownTime} seconds`
                    : 'Resend OTP'}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isForgotPasswordVerifyOtpPending}
                onClick={() => setOpenOtpDialog(false)}
                type='button'
                variant='outline'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isForgotPasswordVerifyOtpPending || otp?.length < 4}
              onClick={onOtpSubmit}
              type='button'
            >
              {isForgotPasswordVerifyOtpPending && <Spinner />}
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
