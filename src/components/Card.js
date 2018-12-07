import React from 'react';

import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <div className="col-sm-4 product">
            <Link to={`/snacks/id/${props.id}`}>
                <img className="img" src={props.img} alt={props.name} />
            </Link>
            <h4 className="name">{props.name}</h4>
            <div className="price">${props.price}</div>
            <div className="desc">{props.description}</div>
        </div>
    );
}

export default Card;