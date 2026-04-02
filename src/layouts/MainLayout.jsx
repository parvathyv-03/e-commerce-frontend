import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
function MainLayout({children}){
    return(
        <>
            <Navbar/>
            <main><Outlet/></main>
        </>
    );
}

export default MainLayout;