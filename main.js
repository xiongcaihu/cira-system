import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import routerConfig from "./src/router/router.jsx";

/**
 * 遍历路由
 * @param {*} props
 */
function RouteWalker(props) {
    if (props.routes == null) return;
    return (
        <>
            {props.routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        render={props => {
                            return (
                                <route.component {...props}>
                                    <RouteWalker
                                        routes={route.childs}
                                    ></RouteWalker>
                                </route.component>
                            );
                        }}
                    ></Route>
                );
            })}
        </>
    );
}

ReactDom.render(
    <HashRouter>
        <RouteWalker routes={routerConfig}></RouteWalker>
    </HashRouter>,
    document.querySelector(".app")
);
