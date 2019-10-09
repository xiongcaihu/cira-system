import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../actions/actions.jsx";

function Home(props) {
    return (
        <div>
            home
            <Link to="/home2">toHome2</Link>
            <br></br>
            name:{props.name}
            <br></br>
            <button
                onClick={() => {
                    props.dispatch({ type: actions.CHANGE_NAME, data: "cy" });
                }}
            >
                change name
            </button>
            <br></br>
            ----------------<br></br>
            {props.children}
        </div>
    );
}

Home = connect(state => ({ name: state.name }))(Home);

export default Home;
