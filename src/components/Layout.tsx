import Nav from "./nav-component";
import { Outlet } from "react-router-dom";
import { ComponentInterface } from "../interfaces/component-interface";

const Layout: React.FC<ComponentInterface> = ({
  currentUser,
  setCurrentUser,
}) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
