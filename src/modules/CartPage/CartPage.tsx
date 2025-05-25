import { useCartQuery } from "@/api/cart/queries";
import { useUserLogin } from "@/hooks/useUserLogin";
import { useCartStore } from "@/stores/CartStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    // Handle item selection
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
      setIsAllSelected(false);
    } else {
      setSelectedItems([...selectedItems, id]);
      if (selectedItems.length + 1 === carts.length) {
        setIsAllSelected(true);
      }
    }
  };
    // Handle remove item
    const handleRemoveItem = async (id: string) => {
      try {
        await removeFromCart(id);
        toast.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
      } catch (error) {
        toast.error('Xóa sản phẩm khỏi giỏ hàng thất bại!');
      }
    };
      const handleUpdateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await updateCartItem(id, quantity);
    } catch (error) {
      toast.error('Cập nhật số lượng sản phẩm thất bại!');
    }
  };
};

export default CartPageWebsite;
