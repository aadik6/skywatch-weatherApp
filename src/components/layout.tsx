import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header/>
      <main className="min-h-screen container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto text-center text-gray-400">
        &copy; {new Date().getFullYear()} SkyWatch. All rights reserved | Developed by <span><a href="https://aadarshkushwaha.com.np/">Aadi</a></span> 
        </div>
      </footer>
    </div>
  );
};

export default Layout;
