import { FormEvent, Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "@hooks/use-form";
import { resetError, userLogin } from "@store/reducers/user-reducer";
import { useAppDispatch, useAppSelector } from "@store/store";
import { PATH } from "@config/constants";

const PageLogin = () => {
  const { form, onChange, resetForm } = useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();

  const { userLoading, authorized, error } = useAppSelector(
    (store) => store.user
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  useEffect(() => {
    const returnPath = (location.state && location.state.redirect) || "/";
    if (authorized) {
      navigate(returnPath, { replace: true, state: null });
    }
    if (error !== "") {
      resetForm();
    }
  }, [error, authorized]);

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
