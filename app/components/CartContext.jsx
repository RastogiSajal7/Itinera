// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.name === item.name);
      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.name === itemName);
      if (existingItemIndex > -1) {
        const item = prevItems[existingItemIndex];
        if (item.quantity > 1) {
          // Decrease quantity if more than 1
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity -= 1;
          return updatedItems;
        } else {
          // Remove item if quantity is 1
          return prevItems.filter((i) => i.name !== itemName);
        }
      }
      return prevItems;
    });
  };

  const getCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
