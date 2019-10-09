import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import routerConfig from "./src/router/router.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";

import initStore from "./src/store/store.jsx";
import reducer from "./src/reducers/reducer.jsx";

var store = createStore(reducer, initStore);

/**
 * 遍历路由
 * @param {*} props
 */
function RouteWalker(props) {
    if (props.routes == null) return <></>;
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
    <Provider store={store}>
        <HashRouter>
            <RouteWalker routes={routerConfig}></RouteWalker>
        </HashRouter>
    </Provider>,
    document.querySelector(".app")
);
