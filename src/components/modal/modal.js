import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ children, visible, setVisible }) => {
  useEffect(
    () => {
      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    },
    // eslint-disable-next-line
    []
  );

  const onKeyDown = (e) => {
    e.key === "Escape" && onClose();
  };

  const onClose = () => {
    setVisible(false);
  };

  return createPortal(
    <>
      {visible && (
        <ModalOverlay onClose={onClose}>
          <div className={`${styles.modal} p-4`}>
            <button className={styles.closeBtn} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
        </ModalOverlay>
      )}
    </>,
    document.getElementById("modal-window")
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
export default Modal;
