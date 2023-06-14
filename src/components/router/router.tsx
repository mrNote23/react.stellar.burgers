import { Routes, useLocation, Route } from "react-router-dom";
import getRoutes from "./routes";

const Router = () => {
  const location = useLocation();

  const prevLocation = location.state && location.state.prevLocation;

  return (
    <>
      <Routes location={prevLocation || location}>
        {getRoutes().map(
          (item, index) =>
            !item.modal && (
              <Route key={index} path={item.path} element={item.element} />
            )
        )}
      </Routes>
      {!!prevLocation && (
        <Routes>
          {getRoutes().map(
            (item, index) =>
              item.modal && (
                <Route
                  key={`m${index}`}
                  path={item.path}
                  element={item.element}
                />
              )
          )}
        </Routes>
      )}
    </>
  );
};

export default Router;
