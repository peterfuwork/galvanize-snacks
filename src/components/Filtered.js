import React from 'react';
import Card from './Card';
import Back from './Back';

const Filtered = (props) => {
    if(props.snacks.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }

    const filteredSnacks = props.snacks.filter(snack => {
        return snack.type.toLowerCase().replace(/\s/g, "") === props.match.params.type;
    });

    const snacks = filteredSnacks.map(snack => {
        return (
            <Card 
                key={snack.id} 
                id={snack.id}
                image={snack.image}
                name={snack.name}
                price={snack.price}
            />
        );
    });
    
    return (
        <div>
            <Back />
            { snacks }
        </div>
    );
}

export default Filtered;