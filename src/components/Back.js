import React from 'react';
import { Link } from "react-router-dom";

const Back = (props) => {
    return (
        <div className="col-sm-12 back">
            <Link to="/" className="btn">&lt;&nbsp;Back</Link>
        </div>
    )
}

export default Back;