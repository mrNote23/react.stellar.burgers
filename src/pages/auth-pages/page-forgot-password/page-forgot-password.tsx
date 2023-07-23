import { FormEvent, Fragment, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useForm } from "@hooks/use-form";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Api from "@utils/api";
import { useAppSelector } from "@store/store";
import { setCookie } from "@utils/cookie";
import {
  PATH,
  RESET_PASSWORD_COOKIE_NAME,
  RESET_PASSWORD_COOKIE_OPTIONS,
} from "@config/constants";

const PageForgotPassword = () => {
  const { authorized } = useAppSelector((store) => store.user);
  const { form, onChange } = useForm({ email: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    Api.userResetPassword(form.email)
      .then(() => {
        setLoading(false);
        setCookie(
          RESET_PASSWORD_COOKIE_NAME,
          true,
          RESET_PASSWORD_COOKIE_OPTIONS
        );
        navigate(PATH.RESET_PASSWORD, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <Fragment>
      {authorized ? (
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
          <EmailInput
            extraClass="m-5"
            name="email"
            value={form.email}
            onChange={onChange}
            autoFocus
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading}
          >
            Восстановить
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

export default PageForgotPassword;
