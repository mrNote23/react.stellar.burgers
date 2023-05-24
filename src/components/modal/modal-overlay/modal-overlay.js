import PropTypes from "prop-types";

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

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default ModalOverlay;
