import { FC, ReactNode, MouseEvent } from "react";

const ModalOverlay: FC<{ onClose: () => void; children?: ReactNode }> = ({
  onClose,
  children,
}) => {
  const closeModal = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
