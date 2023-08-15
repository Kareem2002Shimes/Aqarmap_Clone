import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  return (
    <SessionProvider session={session}>
    <ThemeProvider defaultTheme="light">
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
    <Toaster />
  </SessionProvider>
  );
};

export default MyApp;
