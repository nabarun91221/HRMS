import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import {
  useSendPersonalEmailOpt,
  useVerifyPersonalEmailOpt,
} from "../../hooks";
import { employeeFormSchemaType } from "../EmployeeCreateUpdateForm";

const UserCredentials = () => {
  const { control, trigger, watch, setValue } =
    useFormContext<employeeFormSchemaType>();

  const isEmailVerified = watch("isEmailVerified");

  const [otp, setOtp] = useState<string>("");

  const {
    mutate: sendPersonalEmail,
    isPending: isSendPersonalEmailOtpPending,
  } = useSendPersonalEmailOpt();

  const {
    mutate: verifyPersonalEmailOtp,
    isPending: isVerifyPersonalEmailOtpPending,
  } = useVerifyPersonalEmailOpt();

  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const [coolDownTime, setCoolDownTime] = useState(0);

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleSendOpt = async (email: string) => {
    const res = await trigger(["personalEmail"]);

    if (!res) {
      return;
    }

    sendPersonalEmail(
      { email },
      {
        onSuccess: (res) => {
          if (res?.data?.isVerified) {
            toast.success("Email already verified");
            setValue("isEmailVerified", true);
          } else {
            toast.success("Opt sent successfully");
            setOtp("");
            setOpenOtpDialog(true);
            setCoolDownTime(120);
            startTimer();
          }
        },
      },
    );
  };

  const handleVerifyOtp = (email: string, otp: string) => {
    verifyPersonalEmailOtp(
      { email, otp: Number(otp) },
      {
        onSuccess: () => {
          toast.success("Otp verified successfully");
          setOpenOtpDialog(false);
          clearInterval(timer);
          setCoolDownTime(0);

          setValue("isEmailVerified", true);
        },
      },
    );
  };

  const startTimer = () => {
    const _timer = setInterval(() => {
      setCoolDownTime((prev) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Credentials</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name="userCredentials.name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input placeholder="Enter Name" {...field} />
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="userCredentials.email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="Enter Email" {...field} />
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="personalEmail"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Personal Email</FieldLabel>
                <FieldContent>
                  <div className="flex gap-2">
                    <Input
                      disabled={isEmailVerified}
                      placeholder="Enter Personal Email"
                      {...field}
                    />

                    <Button
                      type="button"
                      onClick={() => handleSendOpt(field.value)}
                      disabled={
                        isSendPersonalEmailOtpPending ||
                        coolDownTime > 0 ||
                        isVerifyPersonalEmailOtpPending ||
                        isEmailVerified
                      }
                    >
                      {isSendPersonalEmailOtpPending && <Spinner />}

                      {isEmailVerified ? (
                        <>
                          <Icon icon={"lucide:check"} />
                          Verified
                        </>
                      ) : coolDownTime > 0 ? (
                        `Resend OTP in ${coolDownTime} seconds`
                      ) : (
                        "Verify"
                      )}
                    </Button>

                    {isEmailVerified && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setValue("isEmailVerified", false)}
                      >
                        Change
                      </Button>
                    )}
                  </div>

                  <AlertDialog
                    open={openOtpDialog}
                    onOpenChange={setOpenOtpDialog}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Verify Email</AlertDialogTitle>
                        <AlertDialogDescription>
                          Enter the 4-digit OTP sent to your email.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex flex-col gap-6 py-4">
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={4}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={otp}
                            onChange={(value) => setOtp(value)}
                            onKeyDown={(e) => {
                              if (
                                !/^[0-9]$/.test(e.key) &&
                                e.key !== "Backspace"
                              ) {
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
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            type="button"
                            disabled={
                              isSendPersonalEmailOtpPending ||
                              coolDownTime > 0 ||
                              isVerifyPersonalEmailOtpPending
                            }
                            onClick={() => handleSendOpt(field.value)}
                          >
                            {isSendPersonalEmailOtpPending
                              ? "Sending OTP..."
                              : coolDownTime > 0
                                ? `Resend OTP in ${coolDownTime} seconds`
                                : "Resend OTP"}
                          </Button>
                          <Button
                            disabled={
                              isSendPersonalEmailOtpPending ||
                              isVerifyPersonalEmailOtpPending ||
                              otp?.length < 4
                            }
                            onClick={() => handleVerifyOtp(field.value, otp)}
                            type="button"
                          >
                            {isVerifyPersonalEmailOtpPending && <Spinner />}
                            Submit
                          </Button>
                        </div>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </FieldContent>
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default UserCredentials;
