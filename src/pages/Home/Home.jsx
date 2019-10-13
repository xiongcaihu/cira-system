import React, { Suspense } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Dropdown } from "antd";

import { actions } from "../../actions/actions.jsx";

const { Header, Content } = Layout;

const logoStyle = {
    width: 120,
    height: 31,
    background: "rgba(255, 255, 255, 0.2)",
    marginTop: 16,
    marginRight: 24,
    float: "left"
};
const logoTextStyle = {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
};

// 最多两级菜单
const menus = [
    {
        path: "/home/dashboard",
        cTitle: "看板",
        title: "dashboard"
    },
    {
        cTitle: "任务",
        title: "task",
        childs: [
            {
                path: "/home/myTask",
                cTitle: "我的任务",
                title: "myTask"
            },
            {
                path: "/home/taskManage",
                cTitle: "管理任务",
                title: "taskManage"
            },
            {
                path: "/home/taskProcess",
                cTitle: "任务流程",
                title: "taskProcess"
            },
            {
                path: "/home/tongjiTask",
                cTitle: "任务统计",
                title: "tongjiTask"
            }
        ]
    },
    {
        cTitle: "团队",
        title: "team",
        childs: [
            {
                path: "/home/teamMemberManage",
                cTitle: "成员管理",
                title: "teamMemberManage"
            },
            {
                path: "/home/teamWiki",
                cTitle: "团队wiki",
                title: "teamWiki"
            }
        ]
    }
];

function findPath(targetPath) {
    for (var i = 0; i < menus.length; i++) {
        var item = menus[i];
        if (item.path === targetPath) {
            return item;
        }
        if (item.childs) {
            var rel = item.childs.find(subItem => subItem.path === targetPath);
            if (rel) return rel;
        }
    }
    return null;
}

var Home = props => {
    var { defaultMenu, dispatch, user, location } = props;
    var nowPath = location.pathname;
    if (nowPath === "/home" || defaultMenu === null) {
        dispatch({
            type: actions.CHANGE_DEFAULT_MENU,
            data: menus[0].title
        });
        return <Redirect to={`${menus[0].path}`}></Redirect>;
    }
    var pathInMenu = findPath(nowPath);
    if (pathInMenu && defaultMenu !== pathInMenu.title) {
        dispatch({
            type: actions.CHANGE_DEFAULT_MENU,
            data: pathInMenu.title
        });
        return <Redirect to={`${pathInMenu.path}`}></Redirect>;
    }

    return (
        <div>
            <Layout className="layout">
                <Header
                    style={{ height: 64, paddingLeft: 20, paddingRight: 20 }}
                >
                    <div className="logo" style={logoStyle}>
                        <span style={logoTextStyle}>CIRA</span>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={defaultMenu}
                        style={{ lineHeight: "64px" }}
                    >
                        {menus.map((item, index) => {
                            return item.childs ? (
                                <Menu.SubMenu
                                    key={item.cTitle}
                                    title={
                                        <span
                                            className="submenu-title-wrapper"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {item.cTitle}
                                        </span>
                                    }
                                >
                                    {item.childs.map((subItem, index) => {
                                        return (
                                            <Menu.Item key={subItem.title}>
                                                <Link
                                                    to={subItem.path}
                                                    onClick={() => {
                                                        dispatch({
                                                            type:
                                                                actions.CHANGE_DEFAULT_MENU,
                                                            data: subItem.title
                                                        });
                                                    }}
                                                >
                                                    {subItem.cTitle}
                                                </Link>
                                            </Menu.Item>
                                        );
                                    })}
                                </Menu.SubMenu>
                            ) : (
                                <Menu.Item key={item.title}>
                                    <Link
                                        to={item.path}
                                        onClick={() => {
                                            dispatch({
                                                type:
                                                    actions.CHANGE_DEFAULT_MENU,
                                                data: item.title
                                            });
                                        }}
                                    >
                                        {item.cTitle}
                                    </Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            marginRight: 30,
                            color: "white"
                        }}
                    >
                        <Dropdown
                            overlay={
                                <Menu theme="dark">
                                    <Menu.Item>个人中心</Menu.Item>
                                    <Menu.Item style={{ marginTop: 10 }}>
                                        <div
                                            onClick={() => {
                                                dispatch({
                                                    type:
                                                        actions.CHANGE_USER_INFO,
                                                    data: {
                                                        ...user,
                                                        token: 0
                                                    }
                                                });
                                            }}
                                        >
                                            注销
                                        </div>
                                    </Menu.Item>
                                </Menu>
                            }
                            placement="bottomCenter"
                        >
                            <div>
                                <Icon type="user" style={{ fontSize: 20 }} />
                                <span
                                    style={{
                                        marginLeft: 1,
                                        cursor: "pointer"
                                    }}
                                >
                                    {user.name}
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{ padding: 20, height: "calc(100vh - 64px)" }}>
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            height: "100%"
                        }}
                    >
                        <Suspense fallback={<div>loading comp...</div>}>
                            {props.children}
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};
Home = connect(state => ({ defaultMenu: state.defaultMenu, user: state.user }))(
    Home
);

export default Home;
