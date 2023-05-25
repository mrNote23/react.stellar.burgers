const API = "https://norma.nomoreparties.space/api";

class Api {
  static loadIngredients = () => {
    return new Promise((resolve, reject) => {
      fetch(`${API}/ingredients`)
        .then((response) => response.json())
        .catch(() => reject(false))
        .then((data) => resolve(data))
        .catch(() => reject(false));
    });
  };
}

export default Api;
