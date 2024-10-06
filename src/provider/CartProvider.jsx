'use client';
import { AddToCartContext } from '@/context';
import useToastHook from '@/hook/useToastHook';
import { useState, useEffect } from 'react';

// CartProvider to wrap your application

const CartProvider = ({ children }) => {
  const showToast = useToastHook();
  // Initialize the cart state with localStorage data or an empty array
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const increaseCartQty = (id, productPrice) => {
    const updatedCart = cart.map(item => {
      const rounded = item.amount + productPrice;
      if (item.id === id) {
        item.quantity += 1;
        item.amount = parseFloat(rounded.toFixed(2));
      }
      return item;
    });
    setCart(updatedCart);
  };
  const decreaseCartQty = (id, productPrice) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          const amountLess = item.amount - productPrice;
          item.quantity -= 1;
          item.amount = parseFloat(amountLess.toFixed(2));
        } else {
          removeFromCart(id);
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Add a product to the cart
  const addToCart = (id, productName, price, image) => {
    const isExists = cart.some(item => item.id === id);

    if (isExists) {
      increaseCartQty(id, price);
      showToast({
        variant: 'toastInfo',
        title: `${productName}`,
        description: `increase ${productName} quantity`,
      });
    } else {
      setCart(prevCart => [
        ...prevCart,
        {
          id,
          productName,
          amount: parseFloat(price.toFixed(2)),
          price,
          quantity: 1,
          image,
        },
      ]);
      showToast({
        variant: 'toastSuccess',
        title: 'Add To Cart',
        description: `${productName} Successfully added`,
      });
    }
  };

  const removeFromCart = (productId, productName) => {
    const deleteCart = cart.filter(item => item.id !== productId);

    showToast({
      variant: 'toastSuccess',
      title: 'remove from cart',
      description: `${productName} removed`,
    });

    setCart(deleteCart);
  };

  return (
    <AddToCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseCartQty,
        decreaseCartQty,
      }}>
      {children}
    </AddToCartContext.Provider>
  );
};

export default CartProvider;
