import Head from "next/head";
import Navbar from "../components/navbar";

export default function NavbarLayout(page: any): JSX.Element {
    page.setNavbarLayout = function (child: any) {
        return (
            <Navbar>
                {child}
            </Navbar>
        );
    }

    return page;
}
