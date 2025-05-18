import type { IReview } from '@/api/review/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ReviewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: IReview | null;
  onShowImage: (url: string) => void;
}

const ReviewDetailDialog = ({ open, onOpenChange, review, onShowImage }: ReviewDetailDialogProps) => {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              {review.user.avatar ? (
                <Image src={review.user.avatar} alt={review.user.username} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-medium text-gray-500 text-sm uppercase">
                  {review.user.username.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{review.user.username}</p>
              <p className="text-gray-500 text-xs">{review.user.email}</p>
            </div>
            <div className="ml-auto flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-700 text-sm">Comment:</p>
            <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">{review.comment}</p>
          </div>

          {review.images && review.images.length > 0 && (
            <div>
              <p className="mb-2 font-medium text-gray-700 text-sm">Images:</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {review.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square cursor-pointer overflow-hidden rounded-md border"
                    onClick={() => onShowImage(img)}
                  >
                    <Image src={img} alt={`Review image ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium text-gray-500 text-xs">Status</p>
              <p className={`font-medium text-sm ${review.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                {review.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium text-gray-500 text-xs">Verification</p>
              <p className={`font-medium text-sm ${review.isVerified ? 'text-blue-600' : 'text-gray-500'}`}>
                {review.isVerified ? 'Verified' : 'Unverified'}
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium text-gray-500 text-xs">Purchase Status</p>
              <p className={`font-medium text-sm ${review.isPurchased ? 'text-purple-600' : 'text-gray-500'}`}>
                {review.isPurchased ? 'Purchased' : 'Not Purchased'}
              </p>
            </div>
          </div>

          <div className="text-right text-gray-500 text-xs">
            Created: {format(new Date(review.createdAt), 'dd MMM yyyy HH:mm')}
            <br />
            Updated: {format(new Date(review.updatedAt), 'dd MMM yyyy HH:mm')}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailDialog;
