import Head from "next/head";
import Navbar from "../../src/components/navbar/navbar";

export default function NavbarLayout(page: any, showBackButton: boolean): JSX.Element {
    page.setNavbarLayout = function (child: any) {
        return (
            <Navbar showBackButton={showBackButton}>
                {child}
            </Navbar>
        );
    }

    return page;
}
