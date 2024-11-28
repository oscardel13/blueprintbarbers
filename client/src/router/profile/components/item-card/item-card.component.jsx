import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import IosShareIcon from "@mui/icons-material/IosShare";
import { Link } from "react-router-dom";

const ItemCard = ({ product, item }) => {
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    setShow(!show);
  };

  //   copy current url without paths to clipboard
  const copyToClipboard = () => {
    const url = window.location.href;
    const urlWithoutPaths = url.split("/").slice(0, 3).join("/");
    navigator.clipboard.writeText(
      urlWithoutPaths + `/store/${product.name}/${item._id}`
    );
    setShow(false);
  };

  return (
    <div className="relative">
      <Link
        to={`/store/${product.name}/${item._id}`}
        className="flex flex-row p-5 bg-gray-200 border border-gray-500 shadow rounded-lg gap-3"
      >
        <div className="flex items-center">
          <img src={product.images[0]} className="h-16 lg:h-28" />
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-lg font-semibold"> {product.name}</h5>
          <div className="">size: {item.size}</div>
          <div className="flex flex-wrap">Items ID: {item._id}</div>
        </div>
      </Link>
      <MoreVertIcon
        className="absolute top-3 right-2 text-3xl"
        onClick={handleShow}
      />
      <div
        className={`${
          show ? "inline" : "hidden"
        } absolute top-10 w-32 right-2 bg-white border rounded-lg`}
      >
        <span
          className="flex justify-center items-center p-2 hover:bg-gray-200 cursor-pointer"
          onClick={copyToClipboard}
        >
          Copy Link
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
