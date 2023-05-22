import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
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
