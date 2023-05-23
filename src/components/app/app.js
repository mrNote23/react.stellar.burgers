import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <main className="container">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </BrowserRouter>
  );
}

export default App;
