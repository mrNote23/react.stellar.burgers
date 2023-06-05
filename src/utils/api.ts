const API = "https://norma.nomoreparties.space/api";

type TResponse = {
  [key: string]: unknown;
};

class _Api {
  private _baseUrl = API;

  private _checkResponse = (response: Response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error ${response.status}`);
  };

  private _checkSuccess = (response: TResponse) => {
    return response.success
      ? Promise.resolve(response)
      : Promise.reject(`Response not success ${response}`);
  };

  private _request = (url: string, options = {}) => {
    return fetch(`${this._baseUrl}${url}`, options)
      .then(this._checkResponse)
      .then(this._checkSuccess);
  };

  public loadIngredients = () => {
    return this._request("/ingredients");
  };

  public createOrder = (ingredients: string[]) => {
    return this._request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
  };
}

const Api = new _Api();
export default Api;
