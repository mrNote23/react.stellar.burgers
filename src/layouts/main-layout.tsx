import { FC, ReactNode, Fragment } from "react";
import AppHeader from "../components/app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MainLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className="container">{children}</main>
      </DndProvider>
    </Fragment>
  );
};

export default MainLayout;
