import React, { Suspense } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// 路由守卫
var RouteFilter = props => {
    var { user, location } = props;
    var nowPath = location.pathname;
    if (nowPath === "/") {
        return <Redirect to="/home"></Redirect>;
    }
    if (
        nowPath !== "/login" &&
        (user.token === null || user.token === undefined || user.token === 0)
    ) {
        return <Redirect to="/login"></Redirect>;
    }
    return (
        <Suspense fallback={<div>loading comp...</div>}>
            {props.children}
        </Suspense>
    );
};
RouteFilter = connect(state => ({ user: state.user }))(RouteFilter);

var routeConfig = [
    {
        path: "/",
        component: RouteFilter,
        childs: [
            {
                path: "/home",
                component: React.lazy(() =>
                    import(
                        /* webpackChunkName:"Home" */ "../pages/Home/Home.jsx"
                    )
                ),
                childs: [
                    {
                        path: "/home/dashboard",
                        component: React.lazy(() =>
                            import(
                                /* webpackChunkName:"DashBoard" */ "../pages/DashBoard.jsx"
                            )
                        )
                    },
                    {
                        path: "/home/taskManage",
                        component: () => {
                            return <div>taskManage</div>;
                        }
                    },
                    {
                        path: "/home/myTask",
                        component: () => {
                            return <div>myTask</div>;
                        }
                    },
                    {
                        path: "/home/tongjiTask",
                        component: () => {
                            return <div>tongjiTask</div>;
                        }
                    },
                    {
                        path: "/home/teamWiki",
                        component: () => {
                            return <div>teamWiki</div>;
                        }
                    },
                    {
                        path: "/home/taskProcess",
                        component: () => {
                            return <div>taskProcess</div>;
                        }
                    },
                    {
                        path: "/home/teamMemberManage",
                        component: () => {
                            return <div>teamMemberManage</div>;
                        }
                    },
                    {
                        path: "*",
                        component: () => {
                            return <Redirect to="/home"></Redirect>;
                        }
                    }
                ]
            },
            {
                path: "/login",
                component: React.lazy(() =>
                    import(
                        /* webpackChunkName:"Login" */ "../pages/Login/Login.jsx"
                    )
                )
            },
            {
                path: "*",
                component: React.lazy(() =>
                    import(
                        /* webpackChunkName:"404page" */ "../pages/404page/404page.jsx"
                    )
                )
            }
        ]
    }
];

export default routeConfig;
