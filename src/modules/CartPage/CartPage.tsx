import { useCartQuery } from "@/api/cart/queries";
import { useUserLogin } from "@/hooks/useUserLogin";
import { useCartStore } from "@/stores/CartStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CartPageWebsite = () => {
  const form = useForm();
  const { carts, isLoading, removeFromCart, updateCartItem } = useCartStore();
  const { user, isLoggedIn } = useUserLogin();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const router = useRouter();

  // Fetch cart from API if user is logged in
  const { data: cartData, isFetching: isCartLoading } = useCartQuery({
    enabled: !!user?.id,
    onSuccess: (data) => {
      if (data?.items?.length) {
        useCartStore.getState().setCart(data.items);
      }
    },
  });
  // Calculate total price
  const totalPrice = carts
    .filter((item) => selectedItems.includes(item._id || ''))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle select all
  useEffect(() => {
    if (isAllSelected) {
      setSelectedItems(carts.map((item) => item._id || ''));
    }
  }, [isAllSelected, carts]);
    // Handle select all checkbox
  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    if (!isAllSelected) {
      setSelectedItems(carts.map((item) => item._id || ''));
    } else {
      setSelectedItems([]);
    }
  };
};

export default CartPageWebsite;
