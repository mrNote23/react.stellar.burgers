import { FC, Fragment, lazy, ReactNode, Suspense } from "react";
import { useAppSelector } from "@store/store";
import { Navigate, useLocation } from "react-router-dom";
import { PATH } from "@config/constants";
import Loader from "@components/loader/loader";
import MainLayout from "@layouts/main-layout";
import BlankLayout from "@layouts/blank-layout";
import PageError from "@pages/page-error/page-error";

const Loadable = (Component: FC) => () =>
  (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );

const PageHome = Loadable(lazy(() => import("@pages/page-home/page-home")));

const PageIngredientDetails = Loadable(
  lazy(() => import("@pages/page-ingredient-details/page-ingredient-details"))
);

const PageOrderInfo = Loadable(
  lazy(() => import("@pages/page-order-info/page-order-info"))
);

const PageProfile = Loadable(
  lazy(() => import("@pages/page-profile/page-profile"))
);

const PageFeed = Loadable(lazy(() => import("@pages/page-feed/page-feed")));

const PageLogin = Loadable(
  lazy(() => import("@pages/auth-pages/page-login/page-login"))
);

const PageRegister = Loadable(
  lazy(() => import("@pages/auth-pages/page-register/page-register"))
);

const PageForgotPassword = Loadable(
  lazy(
    () => import("@pages/auth-pages/page-forgot-password/page-forgot-password")
  )
);

const PageResetPassword = Loadable(
  lazy(
    () => import("@pages/auth-pages/page-reset-password/page-reset-password")
  )
);

const routes = [
  {
    path: PATH.HOME,
    element: <PageHome />,
  },
  {
    path: `${PATH.INGREDIENTS}/:id`,
    element: <PageIngredientDetails />,
  },
  {
    path: `${PATH.INGREDIENTS}/:id`,
    layout: "none",
    element: <PageIngredientDetails />,
    modal: true,
  },
  {
    path: PATH.PROFILE,
    element: <PageProfile />,
    protected: true,
  },
  {
    path: PATH.PROFILE_ORDERS,
    element: <PageProfile />,
    protected: true,
  },
  {
    path: `${PATH.PROFILE_ORDERS}/:id`,
    element: <PageOrderInfo />,
    protected: true,
  },
  {
    path: `${PATH.PROFILE_ORDERS}/:id`,
    layout: "none",
    element: <PageOrderInfo />,
    modal: true,
    protected: true,
  },
  {
    path: PATH.FEED,
    element: <PageFeed />,
  },
  {
    path: `${PATH.FEED}/:id`,
    layout: "none",
    element: <PageOrderInfo />,
    modal: true,
  },
  {
    path: `${PATH.FEED}/:id`,
    element: <PageOrderInfo />,
  },
  {
    path: PATH.LOGIN,
    element: <PageLogin />,
  },
  {
    path: PATH.REGISTER,
    element: <PageRegister />,
  },
  {
    path: PATH.FORGOT_PASSWORD,
    element: <PageForgotPassword />,
  },
  {
    path: PATH.RESET_PASSWORD,
    element: <PageResetPassword />,
  },
  {
    path: PATH.ERROR,
    layout: "blank",
    element: <PageError />,
  },
  {
    path: "*",
    layout: "blank",
    element: <PageError />,
  },
];

const ProtectedRouteElement: FC<{ children?: ReactNode }> = ({ children }) => {
  const { authorized } = useAppSelector((store) => store.user);
  const location = useLocation();

  if (authorized) {
    return <Fragment>{children}</Fragment>;
  } else {
    return (
      <Navigate
        to={PATH.LOGIN}
        replace
        state={{ redirect: location.pathname }}
      />
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
