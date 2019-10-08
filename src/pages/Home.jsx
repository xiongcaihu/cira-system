import React from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
    return (
        <div>
            home
            <Link to="/home2">toHome2</Link>
            {props.children}
        </div>
    );
}
