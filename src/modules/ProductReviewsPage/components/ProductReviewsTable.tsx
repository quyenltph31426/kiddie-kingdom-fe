import type { IReview } from '@/api/review/types';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TablePagination } from '@/components/ui/table';
import type { IMetaResponse } from '@/types';
import { format } from 'date-fns';
import { Eye, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductReviewsTableProps {
  reviews: IReview[];
  isLoading: boolean;
  pagination?: IMetaResponse;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const ProductReviewsTable = ({ reviews, isLoading, pagination, onPageChange, onPageSizeChange }: ProductReviewsTableProps) => {
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const handleShowImage = (url: string) => {
    setImageUrl(url);
    setShowImageDialog(true);
  };

  const handleViewReview = (review: IReview) => {
    setSelectedReview(review);
    setShowReviewDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return <div className="py-8 text-center text-gray-500">Không có đánh giá nào cho sản phẩm này.</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Comment</th>
              <th className="p-3">Images</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                      {review.user.avatar ? (
                        <Image src={review.user.avatar} alt={review.user.username} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-medium text-gray-500 text-xs uppercase">
                          {review.user.username.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{review.user.username}</p>
                      <p className="text-gray-500 text-xs">{review.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </td>
                <td className="max-w-xs p-3">
                  <p className="line-clamp-2 cursor-pointer hover:text-blue-500" onClick={() => handleViewReview(review)}>
                    {review.comment}
                  </p>
                </td>
                <td className="p-3">
                  {review.images && review.images.length > 0 ? (
                    <div className="flex gap-1">
                      {review.images.slice(0, 3).map((img, idx) => (
                        <div
                          key={idx}
                          className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-md border"
                          onClick={() => handleShowImage(img)}
                        >
                          <Image src={img} alt={`Review image ${idx + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                      {review.images.length > 3 && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-gray-100 text-xs">
                          +{review.images.length - 3}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">No images</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${review.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      <span className="text-xs">{review.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${review.isVerified ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                      <span className="text-xs">{review.isVerified ? 'Verified' : 'Unverified'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${review.isPurchased ? 'bg-purple-500' : 'bg-gray-300'}`}></span>
                      <span className="text-xs">{review.isPurchased ? 'Purchased' : 'Not Purchased'}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-gray-500 text-xs">
                    {format(new Date(review.createdAt), 'dd MMM yyyy')}
                    <p>{format(new Date(review.createdAt), 'HH:mm')}</p>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleViewReview(review)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="mt-4">
          <TablePagination pagination={pagination} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
        </div>
      )}

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Image</DialogTitle>
          </DialogHeader>
          <div className="relative h-[60vh] w-full">
            {imageUrl && <Image src={imageUrl} alt="Review image" fill className="object-contain" />}
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Detail Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  {selectedReview.user.avatar ? (
                    <Image src={selectedReview.user.avatar} alt={selectedReview.user.username} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-medium text-gray-500 text-sm uppercase">
                      {selectedReview.user.username.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{selectedReview.user.username}</p>
                  <p className="text-gray-500 text-xs">{selectedReview.user.email}</p>
                </div>
                <div className="ml-auto flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1 font-medium text-gray-700 text-sm">Comment:</p>
                <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">{selectedReview.comment}</p>
              </div>

              {selectedReview.images && selectedReview.images.length > 0 && (
                <div>
                  <p className="mb-2 font-medium text-gray-700 text-sm">Images:</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {selectedReview.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-md border"
                        onClick={() => handleShowImage(img)}
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
                  <p className={`font-medium text-sm ${selectedReview.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {selectedReview.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="rounded-md bg-gray-50 p-3">
                  <p className="font-medium text-gray-500 text-xs">Verification</p>
                  <p className={`font-medium text-sm ${selectedReview.isVerified ? 'text-blue-600' : 'text-gray-500'}`}>
                    {selectedReview.isVerified ? 'Verified' : 'Unverified'}
                  </p>
                </div>
                <div className="rounded-md bg-gray-50 p-3">
                  <p className="font-medium text-gray-500 text-xs">Purchase Status</p>
                  <p className={`font-medium text-sm ${selectedReview.isPurchased ? 'text-purple-600' : 'text-gray-500'}`}>
                    {selectedReview.isPurchased ? 'Purchased' : 'Not Purchased'}
                  </p>
                </div>
              </div>

              <div className="text-right text-gray-500 text-xs">
                Created: {format(new Date(selectedReview.createdAt), 'dd MMM yyyy HH:mm')}
                <br />
                Updated: {format(new Date(selectedReview.updatedAt), 'dd MMM yyyy HH:mm')}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviewsTable;
