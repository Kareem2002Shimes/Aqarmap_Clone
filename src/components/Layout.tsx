import { User } from "next-auth";
import Footer from "./footer/Footer";
import MainNavigation from "./header/MainNavigation";

type LayoutProps = {
  children: React.ReactNode;
  userSession:string | null
};
const Layout = ({ children ,userSession}: LayoutProps) => {
  return (
    <>
      <MainNavigation userSession={userSession}/>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
