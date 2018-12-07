import React, { Component } from 'react';
import Card from './Card';
import { Link } from "react-router-dom";

class Category extends Component {
    
    render() {

        if(this.props.filteredSnack.length === 0) {
            return (
                <div className="col-sm-12 links">
                    loading...
                </div>
            );
        }

        const { filteredSnack, currentPage, snackPerPage } = this.props;

        // Logic for displaying current todos
        const indexOfLastSnack = currentPage * snackPerPage;
        const indexOfFirstSnack = indexOfLastSnack - snackPerPage;
        const currentSnack = filteredSnack.slice(indexOfFirstSnack, indexOfLastSnack);
        
        const renderSnack = currentSnack.map((snack) => {
            return (
                <Card key={snack.id}
                    id={snack.id}
                    image={snack.image}
                    name={snack.name}
                    price={snack.price}
                />
            );
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredSnack.length / snackPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <span
                    className={(this.props.currentPage === number ? 'active ' : '')}
                    key={number}
                    id={number}
                    onClick={this.props.onHandleClickPage}
                >
                    {number}
                </span>
            );
        });

        return (
            <div>
                <div className="col-sm-12 links">
                    <Link className="link" to="snacks/type/angelfish">angelfish</Link>
                    <Link className="link" to="snacks/type/butterflyfish">butterflyfish</Link>
                    <Link className="link" to="snacks/type/tang">tang</Link>
                </div>
                { renderSnack }
                <div className="col-sm-12 pagination">
                    { renderPageNumbers }
                </div>
            </div>
        );
    }
}

export default Category;