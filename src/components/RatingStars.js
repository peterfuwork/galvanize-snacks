export const printResult = (number) => {
      
    const solid = '<span class="fa fa-star"></span>';
    const empty = '<span class="fa fa-star-o"></span>';
    const half = '<span class="fa fa-star-half-o"></span>';
    let result = '';
    
    switch(number) {
        case 5:
        result += solid;
        result += solid;
        result += solid;
        result += solid;
        result += solid;
        break;
        case 4.5:
        result += solid;
        result += solid;
        result += solid;
        result += solid;
        result += half;
        break;
        case 4:
        result += solid;
        result += solid;
        result += solid;
        result += solid;
        result += empty;
        break;
        case 3.5:
        result += solid;
        result += solid;
        result += solid;
        result += half;
        result += empty;
        break;
        case 3:
        result += solid;
        result += solid;
        result += solid;
        result += empty;
        result += empty;
        break;
        case 2.5:
        result += solid;
        result += solid;
        result += half;
        result += empty;
        result += empty;
        break;
        case 2:
        result += solid;
        result += solid;
        result += empty;
        result += empty;
        result += empty;
        break;
        case 1.5:
        result += solid;
        result += half;
        result += empty;
        result += empty;
        result += empty;
        break;
        case 1:
        result += solid;
        result += empty;
        result += empty;
        result += empty;
        result += empty;
        break;
        case .5:
        result += half;
        result += empty;
        result += empty;
        result += empty;
        result += empty;
        break;
        case 0:
        result += empty;
        result += empty;
        result += empty;
        result += empty;
        result += empty;
        break;
        default:
        return result;
    }
    return result;
}