import React, { Component } from 'react';
import Back from './Back';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { printResult } from './RatingStars';


class Single extends Component {

    handleKeyPress = (e, code, cid, text, user, value, i) => {
        if (e.key === 'Enter') {
            this.props.onSaveComment(e, code, cid, text, user, value, i);
        }
    }

    render() {
    if(this.props.snacks.length === 0 || this.props.comments.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const snack = this.props.snacks.filter(single => single.id === Number(this.props.match.params.id));

    // const arrOfOnePostComments = this.props.comments[snack[0].code] || [];

    // const comments = arrOfOnePostComments.map((comment, i) => {
    //     if(i < -1 || undefined) {
    //         return <div key={i}>&nbsp;</div>
    //     } else {
    //         return (
    //             <div className="comment" key={comment.cid}>
    //                 <div className="user">
    //                     <a className="delete-btn"
    //                     onClick={(e) => this.props.onDeleteComment(e, snack[0].code, comment.cid)}>X</a>&nbsp;
    //                     { comment.user }:&nbsp;
    //                     <span className={`text ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "" : "show"}`}>
    //                         { comment.text }
    //                         <a  
    //                         className={`edit-btn ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "" : "show"}`}
    //                         onClick={() => this.props.onClickEdit(comment.text, comment.rating, comment.cid)}>&nbsp;&nbsp;(edit)</a>
    //                     </span>
    //                 </div>
    //                 <div className={`edit-hidden ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "show" : ""}`}>
    //                     <textarea
    //                         rows="3" 
    //                         cols="25"
    //                         className="update-textarea"
    //                         onChange={(e) => this.props.onUpdateTextareaComment(e)}
    //                         onKeyPress={(e) => this.handleKeyPress(e, snack[0].code, comment.cid, this.props.editMsg, comment.user, this.props.editRatingValue, i)}
    //                         value={this.props.editMsg}/>
    //                     <legend htmlFor="update-rating-select" className="update-rating-select-title">Rating:</legend>
    //                     <select
    //                         value = {this.props.editRatingValue}
    //                         className="update-rating-select"
    //                         onChange={(e) => this.props.onUpdateSelectRating(e)} 
    //                         >
    //                         <option value="">No Option</option>
    //                         <option value="5">5</option>
    //                         <option value="4.5">4.5</option>
    //                         <option value="4">4</option>
    //                         <option value="3.5">3.5</option>
    //                         <option value="3">3</option>
    //                         <option value="2.5">2.5</option>
    //                         <option value="2">2</option>
    //                         <option value="1.5">1.5</option>
    //                         <option value="1">1</option>
    //                         <option value="0.5">0.5</option>
    //                         <option value="0">0</option>
    //                     </select>
    //                     <a  
    //                         className="save-btn"
    //                         onClick={(e) => this.props.onSaveComment(e, snack[0].code, comment.cid, this.props.editMsg, comment.user, this.props.editRatingValue, i)}>(save)</a>
    //                 </div>
    //                 <div className="rating">
    //                     { comment.rating !== "" ? comment.rating !== undefined ? <div dangerouslySetInnerHTML={{__html: printResult(comment.rating)}} /> : <span></span> : <span></span> }
    //                 </div>
    //             </div>
    //         )
    //     }
    // });
    console.log('this.props.editRatingValue',this.props.editRatingValue)
        return (
            <div className="product" key={snack[0].id}>
                <ScrollToTopOnMount />
                <Back />
                <div className="col-sm-7">
                    <img className="img single" src={snack[0].img} alt={snack[0].name} />
                </div>
                <div className="col-sm-5">
                    <h4 className="name single">{snack[0].name}</h4>
                    <div className="desc single">{snack[0].description}</div>
                    <div className="price single">${snack[0].price}</div>
                    <h5 className="comments-title single">Customer Review</h5>
                    {/* <div className="comments">{ comments }</div>
                    <form className="leave-message-form" onSubmit={(e) => this.props.onHandleNewComment(e, snack[0].code, arrOfOnePostComments.length, this.props.selectedRatingValue)}>
                        <textarea 
                            className="new-comment" 
                            type="text" 
                            placeholder="Leave a message..."
                            value={this.props.newComment}
                            onChange={this.props.onChangeComment} />
                        <legend htmlFor="rating-select" className="rating-select-title">Rating:</legend>
                        <select
                            value = {this.props.selectedRatingValue}
                            className="rating-select"
                            onChange={(e) => this.props.onHandleSelectRating(e)} 
                            >
                            <option value="">No Option</option>
                            <option value="5">5</option>
                            <option value="4.5">4.5</option>
                            <option value="4">4</option>
                            <option value="3.5">3.5</option>
                            <option value="3">3</option>
                            <option value="2.5">2.5</option>
                            <option value="2">2</option>
                            <option value="1.5">1.5</option>
                            <option value="1">1</option>
                            <option value="0.5">0.5</option>
                            <option value="0">0</option>
                        </select>
                        <button className="submit" disabled={ this.props.newComment === "" ? true : false}>Submit</button>
                    </form> */}
                </div>
            </div>
        );
    }
}

export default Single;