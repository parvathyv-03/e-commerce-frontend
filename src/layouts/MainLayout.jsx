import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
function MainLayout({}){
    return(
        <>
            <Navbar/>
            <main><Outlet/></main>
        </>
    );
}

export default MainLayout;