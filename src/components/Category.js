import React, { Component } from 'react';
import Card from './Card';

class Category extends Component {
    
    render() {
        console.log(this.props.snacks)
        if(this.props.snacks.length === 0) {
            return (
                <div className="col-sm-12 links">
                    loading...
                </div>
            );
        }

        const { snacks, currentPage, snackPerPage } = this.props;

        // Logic for displaying current todos
        const indexOfLastSnack = currentPage * snackPerPage;
        const indexOfFirstSnack = indexOfLastSnack - snackPerPage;
        const currentSnack = snacks.slice(indexOfFirstSnack, indexOfLastSnack);
        
        const renderSnack = currentSnack.map((snack) => {
            return (
                <Card key={snack.id}
                    id={snack.id}
                    img={snack.img}
                    name={snack.name}
                    price={snack.price}
                />
            );
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(snacks.length / snackPerPage); i++) {
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
                { renderSnack }
                <div className="col-sm-12 pagination">
                    { renderPageNumbers }
                </div>
            </div>
        );
    }
}

export default Category;