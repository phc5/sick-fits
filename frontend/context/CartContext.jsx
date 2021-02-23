import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  return (
    <CartContext.Provider
      value={{ isCartOpen, closeCart, openCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
