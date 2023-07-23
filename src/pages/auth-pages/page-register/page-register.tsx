import { FormEvent, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "@hooks/use-form";
import { useAppDispatch, useAppSelector } from "@store/store";
import { resetError, userRegister } from "@store/reducers/user-reducer";
import { PATH } from "@config/constants";

const PageRegister = () => {
  const { form, onChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const { userLoading, success, error } = useAppSelector((store) => store.user);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  useEffect(
    () => {
      success && navigate(PATH.HOME);
      if (error !== "") {
        resetForm();
      }
    },
    // eslint-disable-next-line
    [error, success]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userRegister(form));
  };

  return (
    <Fragment>
      <form
        className="d-flex items-center justify-center direction-column w-100"
        onSubmit={onSubmit}
      >
        <p className="text text_type_main-medium m-5">Регистрация</p>
        {error && (
          <p className="text text_type_main-default text_color_error m-3">
            {error}
          </p>
        )}
        <Input
          extraClass="mb-5"
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={onChange}
          autoFocus
        />
        <EmailInput name="email" value={form.email} onChange={onChange} />
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
          Зарегистрироваться
        </Button>

        <p className="text text_type_main-default text_color_inactive mt-15">
          Уже зарегистрированы?&nbsp;
          <Link to={PATH.LOGIN}>Войти</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default PageRegister;
