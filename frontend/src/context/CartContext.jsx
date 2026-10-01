import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("fitkit-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("fitkit-cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const showToast = useCallback((options) => {
    setToast({
      id: Date.now(),
      title: options.title || "Cart Updated",
      message: options.message,
      type: options.type || "success",
      duration: options.duration || 3500,
      action:
        options.action !== undefined
          ? options.action
          : { label: "View Cart →", to: "/cart" },
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      const productId = product._id || product.id;
      const existingItem = cartItems.find(
        (item) => (item._id || item.id) === productId,
      );

      const currentQty = existingItem ? existingItem.quantity : 0;
      const maxStock = typeof product.stock === "number" ? product.stock : 999;

      if (maxStock <= 0) {
        showToast({
          title: "Out of Stock",
          message: `"${product.name}" is currently sold out.`,
          type: "warning",
          action: null,
        });
        return false;
      }

      if (currentQty >= maxStock) {
        showToast({
          title: "Maximum Stock In Cart",
          message: `You already have all ${maxStock} available units of "${product.name}".`,
          type: "warning",
        });
        return false;
      }

      const availableToAdd = maxStock - currentQty;
      const qtyToAdd = Math.min(quantity, availableToAdd);

      setCartItems((currentItems) => {
        if (existingItem) {
          return currentItems.map((item) =>
            (item._id || item.id) === productId
              ? {
                  ...item,
                  quantity: item.quantity + qtyToAdd,
                }
              : item,
          );
        }

        return [...currentItems, { ...product, quantity: qtyToAdd }];
      });

      const isPlural = qtyToAdd > 1;
      showToast({
        title: "Added to Cart!",
        message: `${isPlural ? `${qtyToAdd}x ` : ""}"${product.name}" added to your bag.`,
        type: "success",
        action: { label: "View Cart →", to: "/cart" },
      });

      return true;
    },
    [cartItems, showToast],
  );

  const increaseQuantity = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => (item._id || item.id) !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const { totalQuantity, subtotal } = useMemo(() => {
    let qty = 0;
    let sum = 0;
    for (const item of cartItems) {
      qty += item.quantity || 0;
      sum += (item.price || 0) * (item.quantity || 0);
    }
    return { totalQuantity: qty, subtotal: sum };
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      toast,
      showToast,
      hideToast,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalQuantity,
      subtotal,
    }),
    [
      cartItems,
      toast,
      showToast,
      hideToast,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalQuantity,
      subtotal,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
