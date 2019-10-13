import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { actions } from "../../actions/actions.jsx";

var Login = props => {
    var { user, dispatch } = props;

    return (
        <div>
            <br></br>
            <Button>
                <Link
                    to="/home"
                    onClick={() => {
                        dispatch({
                            type: actions.CHANGE_USER_INFO,
                            data: {
                                ...user,
                                name: "cy" + Math.random(),
                                token: 1
                            }
                        });
                    }}
                >
                    login
                </Link>
            </Button>
        </div>
    );
};
Login = connect(state => ({
    user: state.user
}))(Login);

export default Login;
