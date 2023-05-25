import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

const Modal: FC<{
  children?: ReactNode;
  visible: boolean;
  setVisible: (value: boolean) => void;
  title?: string;
}> = ({ children, visible, setVisible, title = "" }) => {
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

  const onKeyDown = (e: KeyboardEvent) => {
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
            <div className={styles.header}>
              <p className="text text_type_main-large pl-5">{title}</p>
              <button className={styles.closeBtn} onClick={onClose}>
                <CloseIcon type="primary" />
              </button>
            </div>
            {children}
          </div>
        </ModalOverlay>
      )}
    </>,
    document.getElementById("modal-window") as HTMLElement
  );
};

export default Modal;
