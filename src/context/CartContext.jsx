import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (product, selectedSize, selectedToppings, quantity = 1) => {
      const cartItemId = `${product.id}-${
        selectedSize?.name || "default"
      }-${selectedToppings.map((t) => t.name).join(",")}`;

      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.cartItemId === cartItemId
        );

        if (existingItem) {
          return prevItems.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        const basePrice = product.price;
        const sizePrice = selectedSize?.price || 0;
        const toppingsPrice = selectedToppings.reduce(
          (sum, t) => sum + t.price,
          0
        );
        const itemPrice = basePrice + sizePrice + toppingsPrice;

        return [
          ...prevItems,
          {
            cartItemId,
            product,
            selectedSize,
            selectedToppings,
            quantity,
            itemPrice,
          },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((cartItemId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId)
    );
  }, []);

  const updateQuantity = useCallback(
    (cartItemId, newQuantity) => {
      if (newQuantity < 1) {
        removeItem(cartItemId);
        return;
      }
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
