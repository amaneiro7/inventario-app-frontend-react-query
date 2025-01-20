import { lazy, memo } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(async () => await import("./Header").then((m) => ({ default: m.Header })))
const Footer = lazy(async () => await import("./Footer").then(m => ({ default: m.Footer })))
const Main = lazy(async () => await import("./Main").then(m => ({ default: m.Main })))


export const Layout = memo(() => {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    )
})