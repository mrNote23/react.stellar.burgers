import { useForm } from "../hooks/use-form";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TRootState } from "../services/store";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, Fragment, useEffect } from "react";
import { userRegister } from "../services/reducers/user";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const PageRegister = () => {
  const { form, onChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<TDispatch>();

  const { userLoading, success, error } = useSelector(
    (store: TRootState) => store.user
  );

  const navigate = useNavigate();

  useEffect(
    () => {
      success && navigate("/");
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
          <Link to="/login">Войти</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default PageRegister;
