import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "@components/modal/modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./modal.module.css";

type TModalProps = {
  children?: ReactNode;
  onClose: () => void;
  title?: string;
};

const Modal: FC<TModalProps> = ({ children, onClose, title = "" }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClose={() => onClose()}>
      <div className={`${styles.modal} p-4`}>
        <div className={styles.header}>
          <p className="text text_type_main-large pl-5">{title}</p>
          <button className={styles.closeBtn} onClick={() => onClose()}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal-window") as HTMLElement
  );
};

export default Modal;
