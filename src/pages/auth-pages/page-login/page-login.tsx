import { FormEvent, Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../../hooks/use-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../services/reducers/user";
import { TDispatch, TRootState } from "../../../services/store";
import { PATH } from "../../../config/constants";

const PageLogin = () => {
  const { form, onChange, resetForm } = useForm({ email: "", password: "" });
  const dispatch = useDispatch<TDispatch>();

  const { userLoading, authorized, error } = useSelector(
    (store: TRootState) => store.user
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    () => {
      const returnPath = (location.state && location.state.redirect) || "/";
      if (authorized) {
        navigate(returnPath!, { replace: true, state: null });
      }
      if (error !== "") {
        resetForm();
      }
    },
    // eslint-disable-next-line
    [error, authorized]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userLogin(form));
  };

  return (
    <Fragment>
      <form
        className="d-flex items-center justify-center direction-column w-100"
        onSubmit={onSubmit}
      >
        <p className="text text_type_main-medium m-5">Вход</p>
        {error && (
          <p className="text text_type_main-default text_color_error m-3">
            {error}
          </p>
        )}
        <EmailInput
          name="email"
          value={form.email}
          onChange={onChange}
          autoFocus
        />
        <PasswordInput
          extraClass="m-5"
          name="password"
          value={form.password}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={userLoading}
        >
          Войти
        </Button>

        <p className="text text_type_main-default text_color_inactive mt-15">
          Вы - новый пользователь?&nbsp;
          <Link to={PATH.REGISTER}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-5">
          Забыли пароль?&nbsp;
          <Link to={PATH.FORGOT_PASSWORD}>Восстановить пароль</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default PageLogin;
