import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/store";
import { setIngredientDetails } from "@store/reducers/ingredient-details-reducer";
import { useModal } from "@hooks/use-modal";
import Modal from "@components/modal/modal";
import IngredientDetails from "@components/ingredient-details/ingredient-details";
import { PATH } from "@config/constants";

const PageIngredientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const { isModalOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    const ingredient = ingredients.filter((item) => item._id === params.id);
    if (!ingredient.length) {
      navigate(PATH.ERROR);
    } else {
      dispatch(setIngredientDetails(ingredient[0]));
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
