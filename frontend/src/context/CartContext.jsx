import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("fitkit-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("fitkit-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, quantity = 1) {
    setCartItems((currentItems) => {
      const productId = product._id || product.id;
      const existingItem = currentItems.find(
        (item) => (item._id || item.id) === productId,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          (item._id || item.id) === productId
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, item.stock),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        { ...product, quantity: Math.min(quantity, product.stock) },
      ];
    });
  }

  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item,
      ),
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => (item._id || item.id) !== productId),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalQuantity,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
