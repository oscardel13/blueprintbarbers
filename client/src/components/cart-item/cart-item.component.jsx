import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { clearItemFromCart } from '../../store/cart/cart.reducer';

const CartItem = memo(({ item }) => {
  const dispatch = useDispatch();
  const product = item;
  const [isRemoving, setIsRemoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    if (touchStartX - touchX > 50) {
      setIsRemoving(true);
    } else {
      setIsRemoving(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onRemove = () => {
    if (!isHovered && !isRemoving) {
      return;
    }
    dispatch(clearItemFromCart(product));
  };

  return (
    <div
      className={`w-full flex h-20 mb-4 ${isHovered ? 'hover:bg-gray-100' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={product.images[0]} alt={`${product.name}`} className="w-16 object-cover rounded-md"/>
      <div className="w-70 flex flex-col items-start justify-center p-3">
        <span className="text-base">{product.name}</span>
        <span className="text-base">Size: {product.size[0]}</span>
        <span className="text-base">{product.quantity} x ${product.pricing}</span>
      </div>
      <button
        onClick={() => onRemove()}
        className={`border-0 bg-red-500 cursor-pointer font-bold text-gray-300 h-full w-0 ${
          isRemoving || isHovered ? 'w-16 px-2 text-white' : ''
        }`}
      >
        X
      </button>
    </div>
  );
});

export default CartItem;
