'use client';

import { useCheckIsFavoriteQuery, useToggleFavoriteMutation } from '@/api/product_favorite/queries';
import { Button } from '@/components/ui/button';
import { cn, onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { useUserStore } from '@/stores/UserStore';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FavoriteButtonProps {
  productId?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
}

const FavoriteButton = ({ productId, className, variant = 'ghost', size = 'icon', showText = false }: FavoriteButtonProps) => {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if product is in favorites
  const { data: isFavoriteData, refetch } = useCheckIsFavoriteQuery({
    variables: productId,
    enabled: isLoggedIn && Boolean(productId),
    onError: onMutateError,
  });

  // Toggle favorite mutation
  const { mutate: toggleFavorite, isLoading } = useToggleFavoriteMutation({
    onSuccess: () => {
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      // Invalidate favorites queries to refresh lists
      // queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: onMutateError,
  });

  useEffect(() => {
    if (isFavoriteData !== undefined) {
      setIsFavorite(isFavoriteData);
    }
  }, [isFavoriteData]);

  const handleToggleFavorite = () => {
    if (!isLoggedIn || !productId) {
      toast.info('Please login to add items to favorites');
      router.push(ROUTER.SIGN_IN);
      return;
    }

    toggleFavorite({ productId });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('group', isFavorite && 'text-red-500 hover:text-red-600', className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite();
      }}
      disabled={isLoading}
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all',
          isFavorite ? 'fill-current' : 'fill-none group-hover:fill-current group-hover:text-red-500'
        )}
      />
      {showText && <span className="ml-2">{isFavorite ? 'Saved' : 'Save'}</span>}
    </Button>
  );
};

export default FavoriteButton;
