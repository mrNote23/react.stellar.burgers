import { FC, Fragment, lazy, ReactNode, Suspense } from "react";
import MainLayout from "../../layouts/main-layout";
import BlankLayout from "../../layouts/blank-layout";
import PageError from "../../pages/page-error";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";
import { TRootState } from "../../services/store";
import { Navigate, useLocation } from "react-router-dom";

const Loadable = (Component: FC) => () =>
  (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );

const PageHome = Loadable(lazy(() => import("../../pages/page-home")));
const PageIngredientDetails = Loadable(
  lazy(() => import("../../pages/page-ingredient-details"))
);

const PageProfile = Loadable(
  lazy(() => import("../../pages/profile/page-profile"))
);
const PageFeed = Loadable(lazy(() => import("../../pages/page-feed")));
const PageLogin = Loadable(lazy(() => import("../../pages/page-login")));
const PageRegister = Loadable(lazy(() => import("../../pages/page-register")));
const PageForgotPassword = Loadable(
  lazy(() => import("../../pages/page-forgot-password"))
);
const PageResetPassword = Loadable(
  lazy(() => import("../../pages/page-reset-password"))
);

const routes = [
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/ingredients/:id",
    element: <PageIngredientDetails />,
  },
  {
    path: "/ingredients/:id",
    layout: "none",
    element: <PageIngredientDetails />,
    modal: true,
  },
  {
    path: "/profile",
    element: <PageProfile />,
    protected: true,
  },
  {
    path: "/profile/orders",
    element: <PageProfile />,
    protected: true,
  },
  {
    path: "/profile/orders/:id",
    element: <PageProfile />,
    protected: true,
  },
  {
    path: "/feed",
    element: <PageFeed />,
    protected: true,
  },
  {
    path: "/feed/:id",
    element: <PageFeed />,
    protected: true,
  },
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/register",
    element: <PageRegister />,
  },
  {
    path: "/forgot-password",
    element: <PageForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <PageResetPassword />,
  },
  {
    path: "*",
    layout: "blank",
    element: <PageError />,
  },
];

const ProtectedRouteElement: FC<{ children?: ReactNode }> = ({ children }) => {
  const { authorized } = useSelector((store: TRootState) => store.user);
  const location = useLocation();

  if (authorized) {
    return <Fragment>{children}</Fragment>;
  } else {
    return (
      <Navigate to="/login" replace state={{ redirect: location.pathname }} />
    );
  }
};

const getRoutes = () => {
  const layouts: { [key: string]: FC } = {
    blank: BlankLayout,
    main: MainLayout,
    none: Fragment,
  };
  return routes.map((route) => {
    const Layout = route.layout ? layouts[route.layout] : MainLayout;
    return {
      ...route,
      element: route.protected ? (
        <ProtectedRouteElement>
          <Layout>{route.element}</Layout>
        </ProtectedRouteElement>
      ) : (
        <Layout>{route.element}</Layout>
      ),
    };
  });
};

export default getRoutes;
