import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as BooksyIcon } from "../../../../../../../../../assets/Booksy.svg";

const SocialSection = ({ instagramUrl, booksyUrl }) => {
  return (
    <div className="py-3 flex flex-col px-5">
      <h6 className="font-semibold pb-5 text-left">SOCIAL MEDIA</h6>
      <div className="flex flex-row justify-center items-center gap-5">
        <a href={instagramUrl}>
          <InstagramIcon fontSize="large" />
        </a>
        <a href={booksyUrl} className="w-28">
          <BooksyIcon />
        </a>
      </div>
    </div>
  );
};

export default SocialSection;
