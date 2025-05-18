import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';

interface ReviewImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
}

const ReviewImageDialog = ({ open, onOpenChange, imageUrl }: ReviewImageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-[60vh] w-full">
          {imageUrl && <Image src={imageUrl} alt="Review image" fill className="object-contain" />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewImageDialog;
