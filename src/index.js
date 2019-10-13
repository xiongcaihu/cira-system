import React from "react";
import ReactDom from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routerConfig from "./router/router.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import initStore from "./store/store.jsx";
import reducer from "./reducers/reducer.jsx";

var store = createStore(reducer, initStore);

/**
 * 遍历路由
 * @param {*} props
 */
var RouteWalker = props => {
    if (props.routes == null) return <></>;
    return (
        <Switch>
            {props.routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact ? true : false}
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
        </Switch>
    );
};

ReactDom.render(
    <Provider store={store}>
        <Router>
            <RouteWalker routes={routerConfig}></RouteWalker>
        </Router>
    </Provider>,
    document.querySelector("#root")
);
