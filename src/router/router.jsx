import Home from "../pages/Home.jsx";
// import Home2 from "../pages/Home2.jsx";
import React from "react";
const Home2 = React.lazy(() =>
    import(/* webpackChunkName:"Home2" */ "../pages/Home2.jsx")
);

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
