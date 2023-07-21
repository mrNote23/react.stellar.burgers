import { TUserLogin, TUserRegister } from "@config/types";
import { deleteCookie, getCookie, setCookie } from "@utils/cookie";
import {
  ACCESS_COOKIE_OPTIONS,
  ACCESS_TOKEN_NAME,
  API_URL,
  REFRESH_TOKEN_NAME,
} from "@config/constants";

type TResponse = Record<string, unknown>;

class _Api {
  private _baseUrl = API_URL;

  private _checkAuth = async (
    response: Response | Promise<Response>,
    url: string,
    options: RequestInit
  ) => {
    if (
      (response as Response).status >= 400 &&
      localStorage.getItem(REFRESH_TOKEN_NAME)
    ) {
      await this._refreshToken()
        .then(() => {
          response = this._fetch(url, options);
        })
        .catch(() => {
          response = Promise.reject("Not authorized");
        });
    }
    return response;
  };

  private _checkResponse = (response: Response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((err) => Promise.reject(err.message));
    }
  };

  private _checkSuccess = (response: TResponse) => {
    return response.success
      ? Promise.resolve(response)
      : Promise.reject(`Response not success ${response}`);
  };

  private _fetch = (url: string, options: RequestInit) => {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };
    const accessToken = getCookie(ACCESS_TOKEN_NAME);
    if (accessToken) {
      headers["Authorization"] = accessToken;
    }
    return fetch(`${this._baseUrl}${url}` as string, {
      ...options,
      headers,
    });
  };

  private _request = (url: string, options: RequestInit = {}) => {
    return this._fetch(url, options)
      .then((response) => this._checkAuth(response, url, options))
      .then(this._checkResponse)
      .then(this._checkSuccess);
  };

  private _refreshToken = async () => {
    await fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN_NAME) }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCookie(ACCESS_TOKEN_NAME, data.accessToken, ACCESS_COOKIE_OPTIONS);
          localStorage.setItem(REFRESH_TOKEN_NAME, data.refreshToken);
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        deleteCookie(ACCESS_TOKEN_NAME);
        localStorage.removeItem(REFRESH_TOKEN_NAME);
        return Promise.reject();
      });
  };

  public loadIngredients = () => {
    return this._request("/ingredients");
  };

  public loadOrderInfo = (id: number) => {
    return this._request(`/orders/${id}`);
  };

  public createOrder = (ingredients: string[]) => {
    return this._request("/orders", {
      method: "POST",
      body: JSON.stringify({ ingredients }),
    });
  };

  public userLogin = (data: TUserLogin) => {
    return this._request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  public userRegister = (data: TUserRegister) => {
    return this._request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  public userResetPassword = (email: string) => {
    return this._request("/password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  public userSetPassword = (token: string, password: string) => {
    return this._request("/password-reset/reset", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  };

  public userLogout = (token: string) => {
    return this._request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  };

  public userAuthorize = () => {
    return this._request("/auth/user", {
      method: "GET",
    });
  };

  public userUpdateProfile = (data: TUserRegister) => {
    return this._request("/auth/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };
}

const Api = new _Api();
export default Api;
