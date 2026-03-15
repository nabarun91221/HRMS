import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Spinner } from './ui/spinner';

export type ConfirmActionsType = {
  open: (options: {
    title?: string;
    contentSlot?: ReactNode;
    accept: () => void;
    reject: () => void;
  }) => void;
  close: () => void;
  setIsLoading: (value: boolean) => void;
};

const ConfirmModal = forwardRef<ConfirmActionsType>(({}, ref) => {
  const [isOpen, setIsOpen] = useState(false),
    [isLoading, setIsLoading] = useState(false);

  const [callBacks, setCallBacks] = useState<
    { accept?: () => void; reject?: () => void } | undefined
  >(undefined);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [contentSlot, setContentSlot] = useState<ReactNode>(undefined);

  const handleButtonClick = async (isConfirm: boolean) => {
    if (isConfirm) {
      callBacks?.accept?.();
    } else {
      callBacks?.reject?.();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      open: options => {
        if (options?.title) setTitle(options?.title);
        if (options?.contentSlot) setContentSlot(options?.contentSlot);
        setCallBacks({ accept: options?.accept, reject: options?.reject });
        setIsOpen(true);
      },

      close: () => {
        setIsOpen(false);
      },

      setIsLoading: (value: boolean) => {
        setIsLoading(value);
      },
    };
  });

  return (
    // <FreeFormModal
    //   open={isOpen}
    //   title={title}
    //   contentSlot={
    //     contentSlot
    //   }
    //   close={()=>handleButtonClick(false)}
    //   actionsSlot={
    //     <div className="flex justify-end gap-2">
    //       <Button disabled={isLoading} onClick={() => handleButtonClick(false)} >No</Button>
    //       <Button loading={isLoading}
    //         loadingPosition="start" onClick={() => handleButtonClick(true)} color="error" >Yes</Button>
    //     </div>
    //   }
    // />
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{contentSlot}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={() => handleButtonClick(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={() => handleButtonClick(true)}>
            {isLoading && <Spinner />}
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;
