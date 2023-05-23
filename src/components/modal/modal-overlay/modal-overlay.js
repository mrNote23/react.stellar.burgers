const ModalOverlay = ({ onClose, children }) => {
  const closeModal = (e) => {
    if (e.target.className === "modal-overlay") {
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
