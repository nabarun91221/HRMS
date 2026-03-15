import { convertDateStringToReadableFormat, getCurrentLocation } from '@/lib/utils';
import { useClockIn, useClockOut, useGetMyTodayAttendance } from '@/modules/attendance/hooks';
import { TAttendanceSchema } from '@/modules/attendance/schema';
import { UserRoleEnum } from '@/modules/auth/schema';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from './auth-handler';
import ConfirmModal, { ConfirmActionsType } from './ConfirmDialog';
import { Button } from './ui/button';

const AttendanceHeader = () => {
  const { loggedInUser } = useAuth();
  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const [myTodayAttendance, setMyTodayAttendance] = useState<TAttendanceSchema['Doc']>();
  const { data: todayAttendanceData, isLoading: isAttendancePending } = useGetMyTodayAttendance(
    loggedInUser?.role === UserRoleEnum.EMPLOYEE
  );

  useEffect(() => {
    if (isAttendancePending || !todayAttendanceData?.data) return;
    setMyTodayAttendance(todayAttendanceData?.data);
  }, [todayAttendanceData, isAttendancePending]);

  const { mutate: clockIn } = useClockIn();
  const { mutate: clockOut } = useClockOut();

  const handleClockIn = () => {
    confirmModalRef.current?.open({
      title: 'Clock In',
      contentSlot: 'Are you sure you want to clock in now',
      accept: async () => {
        const geoLocation = await getCurrentLocation();

        if (!geoLocation) {
          toast.error('Location per');
          confirmModalRef?.current?.close();
          return;
        }

        confirmModalRef?.current?.setIsLoading(true);
        clockIn(
          {
            latitude: geoLocation?.coords?.latitude,
            longitude: geoLocation?.coords?.longitude,
          },
          {
            onSuccess: res => {
              toast.success('Clocked in successfully');
              setMyTodayAttendance(res?.data);
              confirmModalRef?.current?.close();
            },
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
          }
        );
      },
      reject: () => {
        confirmModalRef?.current?.setIsLoading(false);
        confirmModalRef?.current?.close();
      },
    });
  };

  const handleClockOut = () => {
    confirmModalRef.current?.open({
      title: 'Clock Out',
      contentSlot: 'Are you sure you want to clock out now',
      accept: async () => {
        const geoLocation = await getCurrentLocation();

        if (!geoLocation) {
          toast.error('Location per');
          confirmModalRef?.current?.close();
          return;
        }

        confirmModalRef?.current?.setIsLoading(true);
        clockOut(
          {
            latitude: geoLocation?.coords?.latitude,
            longitude: geoLocation?.coords?.longitude,
          },
          {
            onSuccess: res => {
              toast.success('Clocked out in successfully');
              setMyTodayAttendance(res?.data);
              confirmModalRef?.current?.close();
            },
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
          }
        );
      },
      reject: () => {
        confirmModalRef?.current?.setIsLoading(false);
        confirmModalRef?.current?.close();
      },
    });
  };

  const currentStatus = useMemo(() => {
    if (isAttendancePending) {
      return 'loading';
    } else {
      if (myTodayAttendance) {
        if (myTodayAttendance?.clockIn && myTodayAttendance?.clockOut) {
          return 'clockedOut';
        } else {
          return 'clockedIn';
        }
      } else {
        return 'noAttendance';
      }
    }
  }, [myTodayAttendance, isAttendancePending]);

  return (
    <div className='w-full'>
      {loggedInUser?.role === UserRoleEnum.EMPLOYEE && (
        <>
          {currentStatus === 'loading' && (
            <div className='flex justify-center'>
              <p className='text-sm '>Loading...</p>
            </div>
          )}

          {currentStatus === 'noAttendance' && (
            <div className='flex justify-end '>
              <Button onClick={handleClockIn}>Clock In</Button>
            </div>
          )}

          {currentStatus === 'clockedIn' && myTodayAttendance && (
            <div className='flex gap-4 items-center justify-between'>
              <div />
              <div className='flex gap-2 items-center'>
                <p className='text-sm text-muted-foreground'>Clocked in at </p>
                <div className='border rounded-md px-2'>
                  <p className='text-sm text-muted-foreground'>
                    {convertDateStringToReadableFormat(myTodayAttendance?.clockIn, true)}
                  </p>
                </div>
              </div>
              <Button onClick={handleClockOut}>Clock Out</Button>
            </div>
          )}

          {currentStatus === 'clockedOut' && myTodayAttendance?.clockOut && (
            <div className='flex gap-2 items-center justify-center'>
              <p className='text-sm text-muted-foreground'>Clocked out at </p>
              <div className='border rounded-md px-2'>
                <p className='text-sm text-muted-foreground'>
                  {convertDateStringToReadableFormat(myTodayAttendance?.clockOut, true)}
                </p>
              </div>

              <div className='border rounded-md px-2'>
                <p className='text-sm text-muted-foreground'>
                  Total Working Hours : {Math.round(myTodayAttendance?.totalWorkingHours)}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
};

export default AttendanceHeader;
