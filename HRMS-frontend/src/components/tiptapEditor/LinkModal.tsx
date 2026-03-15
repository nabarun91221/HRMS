// components/LinkModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify-icon/react';
import { useEffect, useEffectEvent, useState } from 'react';
import { toast } from 'sonner';

interface LinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLinkSet: (url: string, openInNewTab: boolean) => void;
  onLinkRemove: () => void;
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  isEditing?: boolean;
}

const LinkModal = ({
  open,
  onOpenChange,
  onLinkSet,
  onLinkRemove,
  initialUrl = '',
  initialOpenInNewTab = true,
  isEditing = false,
}: LinkModalProps) => {
  const [url, setUrl] = useState(initialUrl);
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab);

  const setUrlEffectEvent = useEffectEvent((value: string) => setUrl(value));

  const setOpenInNewTabEffectEvent = useEffectEvent((value: boolean) => setOpenInNewTab(value));
  useEffect(() => {
    if (open) {
      setUrlEffectEvent(initialUrl);
      setOpenInNewTabEffectEvent(initialOpenInNewTab);
    }
  }, [open, initialUrl, initialOpenInNewTab]);

  const handleSubmit = () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    // Add https:// if no protocol is specified
    let finalUrl = url.trim();
    if (!finalUrl.match(/^https?:\/\//)) {
      finalUrl = `https://${finalUrl}`;
    }

    // Basic URL validation
    try {
      new URL(finalUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    onLinkSet(finalUrl, openInNewTab);
    onOpenChange(false);
  };

  const handleRemove = () => {
    onLinkRemove();
    onOpenChange(false);
  };

  const handleCancel = () => {
    setUrl(initialUrl);
    setOpenInNewTab(initialOpenInNewTab);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Link' : 'Add Link'}</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='url'>URL</Label>
            <Input
              id='url'
              type='url'
              placeholder='https://example.com'
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              autoFocus
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='new-tab'
              checked={openInNewTab}
              onCheckedChange={checked => setOpenInNewTab(checked as boolean)}
            />
            <Label htmlFor='new-tab' className='text-sm'>
              Open in new tab
            </Label>
          </div>
        </div>

        <DialogFooter className='flex justify-between'>
          <div>
            {isEditing && (
              <Button variant='destructive' size='sm' onClick={handleRemove}>
                <Icon icon='tabler:trash' className='w-4 h-4 mr-2' />
                Remove Link
              </Button>
            )}
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Icon icon='tabler:link' className='w-4 h-4 mr-2' />
              {isEditing ? 'Update' : 'Add'} Link
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;
