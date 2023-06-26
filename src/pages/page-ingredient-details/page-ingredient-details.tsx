import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../services/store";
import { useEffect } from "react";
import { detailsSet } from "../../services/reducers/details";
import { useModal } from "../../hooks/use-modal";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { PATH } from "../../config/constants";

const PageIngredientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const ingredients = useSelector(
    (store: TRootState) => store.ingredients.ingredients
  );
  const { isModalOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    const ingredient = ingredients.filter((item) => item._id === params.id);
    if (!ingredient.length) {
      navigate(PATH.ERROR);
    } else {
      dispatch(detailsSet(ingredient[0]));
      openModal();
    }
  }, [ingredients, dispatch, params, navigate, openModal]);

  if (!location.state) {
    return (
      <div className="d-flex direction-column items-center justify-center w-100">
        <p className="text text_type_main-large">Детали ингредиента</p>
        <IngredientDetails />
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
          title="Детали ингредиента"
        >
          <IngredientDetails />
        </Modal>
      ) : null}
    </>
  );
};

export default PageIngredientDetails;
