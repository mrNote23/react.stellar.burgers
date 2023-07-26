import store from "../store";
import { userLogin } from "./user-reducer";

const mockData = {
  userLoginRegister: {
    success: true,
    accessToken:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGVmZTE2OGE0YjYyMDAxYzg1ZWJmZiIsImlhdCI6MTY5MDI5NjEwOCwiZXhwIjoxNjkwMjk3MzA4fQ.da7dIDKEcPbmWNFfeKiSUC4YmQirO67qAv_W4Aa1opU",
    refreshToken:
      "51e2962bd1cd3d364bd2532a2d0e00551ac1c89c452c1de5cd6845380baf33d684a72f19b7486cc5",
    user: {
      email: "admin@mail.ru",
      name: "Андрей",
    },
  },

  userAuthorize: {
    success: true,
    user: {
      email: "admin@mail.ru",
      name: "Андрей",
    },
  },
};

describe("User Reducer Test", () => {
  it("userLogin", () => {
    store.dispatch({ type: "user/login/pending" });
    let result = store.getState().user;
    expect(result.userLoading).toBe(true);

    store.dispatch({
      type: "user/login/rejected",
      error: { message: "Error" },
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.error).toBe("Error");

    store.dispatch({
      type: "user/login/fulfilled",
      payload: mockData.userLoginRegister,
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.authorized).toBe(true);
    expect(result.success).toBe(true);
    expect(result.accessToken).toBe(mockData.userLoginRegister.accessToken);
    expect(result.user.name).toBe(mockData.userLoginRegister.user.name);
    expect(result.user.email).toBe(mockData.userLoginRegister.user.email);
  });

  it("userAuthorize", () => {
    store.dispatch({ type: "user/authorize/pending" });
    let result = store.getState().user;
    expect(result.authProcess).toBe(true);

    store.dispatch({
      type: "user/authorize/rejected",
    });
    result = store.getState().user;
    expect(result.authProcess).toBe(false);

    store.dispatch({
      type: "user/authorize/fulfilled",
      payload: mockData.userAuthorize,
    });
    result = store.getState().user;
    expect(result.authProcess).toBe(false);
    expect(result.authorized).toBe(true);
    expect(result.success).toBe(true);
    expect(result.user.name).toBe(mockData.userLoginRegister.user.name);
    expect(result.user.email).toBe(mockData.userLoginRegister.user.email);
  });

  it("userRegister", () => {
    store.dispatch({ type: "user/register/pending" });
    let result = store.getState().user;
    expect(result.userLoading).toBe(true);

    store.dispatch({
      type: "user/register/rejected",
      error: { message: "Error" },
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.error).toBe("Error");

    store.dispatch({
      type: "user/register/fulfilled",
      payload: mockData.userLoginRegister,
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.authorized).toBe(true);
    expect(result.success).toBe(true);
    expect(result.user.name).toBe(mockData.userLoginRegister.user.name);
    expect(result.user.email).toBe(mockData.userLoginRegister.user.email);
  });

  it("userUpdate", () => {
    store.dispatch({ type: "user/update/pending" });
    let result = store.getState().user;
    expect(result.userLoading).toBe(true);

    store.dispatch({
      type: "user/update/rejected",
      error: { message: "Error" },
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.error).toBe("Error");

    store.dispatch({
      type: "user/update/fulfilled",
      payload: mockData.userLoginRegister,
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.authorized).toBe(true);
    expect(result.success).toBe(true);
    expect(result.user.name).toBe(mockData.userLoginRegister.user.name);
    expect(result.user.email).toBe(mockData.userLoginRegister.user.email);
  });

  it("userLogout", () => {
    store.dispatch({
      type: "user/logout/rejected",
    });
    let result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.authorized).toBe(false);

    store.dispatch({
      type: "user/logout/fulfilled",
    });
    result = store.getState().user;
    expect(result.userLoading).toBe(false);
    expect(result.authorized).toBe(false);
  });
});
