import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import NotFound from "@/pages/404";

const Home = lazy(async () => await import("../pages/Home").then(module => ({ default: module.Home })))
const Login = lazy(async () => await import("../pages/Login").then(module => ({ default: module.Login })))

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<ProtectedRoute />}> */}
            <Route path="/" element={<Home />} />
            {/* </Route> */}
            <Route path="*" element={<NotFound />} />
        </>
    )
)

// () =>{
//     return (
//         <Switch>
//             <Route path='/' nest>
//                 <ProtectedRoute>
//                     <Route path="/" component={Home} />
//                 </ProtectedRoute>
//             </Route>
//             <Route><NotFound /></Route>
//         </Switch>
//     )
// }