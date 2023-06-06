import { FC, lazy, Suspense } from "react";
import MainLayout from "../../layouts/main-layout";
import BlankLayout from "../../layouts/blank-layout";
import PageError from "../../pages/page-error";
import Loader from "../loader/loader";

const Loadable = (Component: FC) => () =>
  (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );

const PageHome = Loadable(lazy(() => import("../../pages/page-home")));
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
    path: "/profile",
    element: <PageProfile />,
  },
  {
    path: "/profile/details",
    element: <PageProfile />,
  },
  {
    path: "/profile/orders",
    element: <PageProfile />,
  },
  {
    path: "/profile/orders/:id",
    element: <PageProfile />,
  },
  {
    path: "/feed",
    element: <PageFeed />,
  },
  {
    path: "/feed/:id",
    element: <PageFeed />,
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
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "*",
    layout: "blank",
    element: <PageError />,
  },
];

const getRoutes = () => {
  const layouts: { [key: string]: FC } = {
    blank: BlankLayout,
    main: MainLayout,
  };
  return routes.map((route) => {
    const Layout = route.layout ? layouts[route.layout] : MainLayout;
    return { ...route, element: <Layout>{route.element}</Layout> };
  });
};

export default getRoutes;
