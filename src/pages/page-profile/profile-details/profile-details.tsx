import { FormEvent, Fragment } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "@hooks/use-form";
import { useAppDispatch, useAppSelector } from "@store/store";
import { userUpdate } from "@store/reducers/user-reducer";
import Loader from "@components/loader/loader";

const ProfileDetails = () => {
  const { user, userLoading, error } = useAppSelector((store) => store.user);
  const { form, onChange, resetForm, modified } = useForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userUpdate(form));
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={onChange}
          icon="EditIcon"
          autoFocus
        />
        <EmailInput
          extraClass="mt-5 mb-5"
          name="email"
          value={form.email}
          onChange={onChange}
          isIcon
        />
        <PasswordInput
          name="password"
          value={form.password}
          onChange={onChange}
          icon="EditIcon"
        />
        {error && (
          <p className="text text_type_main-default text_color_error mt-10">
            {error}
          </p>
        )}
        {modified && (
          <div className="d-flex mt-10">
            <Button
              htmlType="submit"
              type="primary"
              size="small"
              extraClass="text_type_main-default mr-5"
              disabled={!modified || userLoading}
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              onClick={resetForm}
              extraClass="text_type_main-default mr-5"
              disabled={!modified || userLoading}
            >
              Отмена
            </Button>
            {userLoading && <Loader simple />}
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default ProfileDetails;
