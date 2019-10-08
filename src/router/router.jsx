import Home from "../pages/Home.jsx";
import Home2 from "../pages/Home2.jsx";

export default [
    {
        path: "/",
        component: Home,
        childs: [
            {
                path: "/home2",
                component: Home2
            }
        ]
    }
];
