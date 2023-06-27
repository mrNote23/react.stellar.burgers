import { FormEvent, Fragment, useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Api from "@utils/api";
import { useForm } from "@hooks/use-form";
import { TRootState } from "@store/store";
import { deleteCookie, getCookie } from "@utils/cookie";
import { PATH, RESET_PASSWORD_COOKIE_NAME } from "@config/constants";

const PageResetPassword = () => {
  const { authorized } = useSelector((store: TRootState) => store.user);
  const { form, onChange, resetForm } = useForm({ token: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    Api.userSetPassword(form.token, form.password)
      .then(() => {
        setLoading(false);
        deleteCookie(RESET_PASSWORD_COOKIE_NAME);
        navigate(PATH.LOGIN, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        resetForm();
      });
  };

  return (
    <Fragment>
      {authorized || !getCookie(RESET_PASSWORD_COOKIE_NAME) ? (
        <Navigate to={PATH.HOME} />
      ) : (
        <form
          className="d-flex items-center justify-center direction-column w-100"
          onSubmit={onSubmit}
        >
          <p className="text text_type_main-medium m-5">
            Восстановление пароля
          </p>
          {error && (
            <p className="text text_type_main-default text_color_error m-3">
              {error}
            </p>
          )}
          <PasswordInput
            extraClass="m-5"
            placeholder="Введите новый пароль"
            name="password"
            value={form.password}
            onChange={onChange}
          />
          <Input
            extraClass="mb-5"
            placeholder="Введите код из письма"
            name="token"
            value={form.token}
            onChange={onChange}
            autoFocus
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading}
          >
            Сохранить
          </Button>

          <p className="text text_type_main-default text_color_inactive mt-15">
            Вспомнили пароль?&nbsp;
            <Link to={PATH.LOGIN}>Войти</Link>
          </p>
        </form>
      )}
    </Fragment>
  );
};

export default PageResetPassword;
