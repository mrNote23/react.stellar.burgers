import { useEffect } from "react";
import { OrderInfo } from "@components/order-info/order-info";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useModal } from "@hooks/use-modal";
import Modal from "@components/modal/modal";

const PageOrderInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { isModalOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    openModal();
  }, []);

  if (!location.state) {
    return (
      <div
        className="d-flex direction-column items-center justify-center"
        style={{ width: "640px", margin: "0 auto" }}
      >
        <p className="text text_type_digits-default">#{params.id}</p>
        <OrderInfo orderId={params.id ? +params.id : null} />
      </div>
    );
  }

  return (
    <>
      {isModalOpen ? (
        <Modal
          onClose={() => {
            closeModal();
            navigate(-1);
          }}
          title={<p className="text text_type_digits-default">#{params.id}</p>}
        >
          <OrderInfo orderId={params.id ? +params.id : null} />
        </Modal>
      ) : null}
    </>
  );
};

export default PageOrderInfo;
