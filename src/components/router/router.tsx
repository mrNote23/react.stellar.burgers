import { useRoutes } from "react-router-dom";
import getRoutes from "./routes";

const Router = () => {
  return useRoutes(getRoutes());
};

export default Router;
