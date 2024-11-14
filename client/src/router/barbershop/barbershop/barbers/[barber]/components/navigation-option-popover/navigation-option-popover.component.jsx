import Popover from "../../../../../../../components/popover/popover.component";
import NearMeIcon from "@mui/icons-material/NearMe";
import {
  generateAppleMapsLink,
  generateGoogleMapsLink,
} from "../info-card/info-card.helper-functions";

const NavigationPopover = ({ closeTrigger, address }) => {
  return (
    <Popover closeTrigger={closeTrigger}>
      <div className="flex flex-col bg-white rounded-lg p-10 min-w-[340px] max-w-[550px] h-64 gap-2">
        <h5 className="pb-5 pt-2 text-lg font-semibold text-left">
          Navigation Options:
        </h5>
        <a
          className="flex border pl-3 cursor-pointer hover:bg-gray-200 justify-between items-center rounded-lg"
          href={generateGoogleMapsLink(address)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google maps
          <div className="border rounded p-3">
            <NearMeIcon />
          </div>
        </a>
        <a
          className="flex border pl-3 cursor-pointer hover:bg-gray-200 justify-between items-center rounded-lg"
          href={generateAppleMapsLink(address)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apple maps
          <div className="border rounded p-3">
            <NearMeIcon />
          </div>
        </a>
      </div>
    </Popover>
  );
};

export default NavigationPopover;
