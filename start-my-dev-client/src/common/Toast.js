import PropTypes from "prop-types";
import { cssTransition } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Fade = cssTransition({ enter: "fadeIn", exit: "fadeOut" });

export const CloseButton = ({ closeToast }) => (
  <FontAwesomeIcon
    icon={faXmark}
    className="my-2 fs-11"
    style={{ opacity: 0.5 }}
    onClick={closeToast}
  />
);

CloseButton.propTypes = { closeToast: PropTypes.func };
