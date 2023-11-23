export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToAdd._id && (productToAdd.size == cartItem.size)
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToAdd._id && (productToAdd.size == cartItem.size)
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem._id === cartItemToRemove._id &&
      cartItem.size === cartItemToRemove.size
  );

  // check if the item is found
  if (!existingCartItem) {
    return cartItems; // If item is not found, do nothing
  }

  // check if quantity is equal to 1, if it is, remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem._id !== cartItemToRemove._id ||
      cartItem.size !== cartItemToRemove.size
    );
  }

  // return updated cart items with matching cart item and reduced quantity
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id && (cartItemToRemove.size == cartItem.size)
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(
    (cartItem) =>
      cartItem._id !== cartItemToClear._id ||
      cartItem.size !== cartItemToClear.size
  );




