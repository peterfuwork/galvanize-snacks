import React, { Component } from 'react';
import Category from './Category';
import Single from './Single';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      snacks: [],
      comments: {},

      newComment:"",
      isEditButtonClick: false,

      editMsg: "",
      editMsgCid: "",
      editRatingValue: "",

      selectedRatingValue: "",

      currentPage: 1,
      snackPerPage: 6
    }
  }

  async componentDidMount() {
    const snacks = await fetch('https://gsnacks-db.herokuapp.com/')
    .then(data => {
      return data.json();
    }).then(data => {
      return data;
    });
    const msgData = await fetch('http://localhost:3001/comments/')
    .then(data => data.json())
    this.setState({
      snacks,
      comments: msgData.comments
    })
  }
  
  postMsg = async (code, comment, postLength) => {
    var newBody = {
      code,
      comment,
      postLength
    };
    console.log('newBody', newBody.code)
    await fetch('http://localhost:3001/messagePOST/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      console.log('response',response)
      
      console.log('code',code)
      this.setState( prevState => ({
          comments: {
            ...prevState.comments,
            [code]: response
          }
        })
      )
    })
  }

  updateMsg = async (code, cid, text, user, rating, arrIndex) => {
    var newBody = {
      code,
      cid,
      text,
      user,
      rating,
      arrIndex
    };
    await fetch('http://localhost:3001/messagePUT/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      this.setState(prevState => ({
          comments: {
            ...prevState.comments,
            [code]: response
          }
        })
      )
      console.log('response',response)
    })
  }

  deleteMsg = async (code, cid) => {
    var newBody = {
      code,
      cid
    };
    await fetch('http://localhost:3001/messageDELETE/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "DELETE",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      this.setState(prevState => ({
          comments: {
            ...prevState.comments,
            [code]: response
          }
        })
      )
      console.log('response',response)
    })
  }

  onChangeComment = (e) => {
    this.setState({
      newComment: e.target.value
    });
  }

  onHandleNewComment = (e, postCode, specificPostCommentLength, ratingValue) => {
    e.preventDefault();
    console.log('ratingValue', ratingValue)
    const comment = { 
      text: this.state.newComment,
      user: "",
      rating: ratingValue
    };
    console.log('comment', comment)
    this.postMsg(postCode, comment, specificPostCommentLength, ratingValue);
    this.setState({
      newComment: "",
      selectedRatingValue: ""
    })
    console.log('selectedRatingValue', this.state.selectedRatingValue);
  }

  onClickEdit = (text, rating, cid) => {
    this.setState({
      isEditButtonClick: true,
      editMsgCid: cid,
      editMsg: text,
      editRatingValue: rating
    })
  }

  onUpdateTextareaComment = (e) => {
    e.preventDefault();
    this.setState({
      editMsg: e.target.value
    })
  }

  onUpdateSelectRating = (e) => {
    e.preventDefault();
    this.setState({
      editRatingValue: e.target.value
    })
  }

  onSaveComment = (e, postCode, cid, newText, user, rating, arrIndex) => {
    e.preventDefault();
    
    if (rating === "") {
      // if rating has no content
      this.updateMsg(postCode, cid, newText, user, rating, arrIndex);
      this.setState({
        isEditButtonClick: false,
        editRatingValue: ""
      })
    } else {
      // if rating has number in string
      this.updateMsg(postCode, cid, newText, user, Number(rating), arrIndex);
      this.setState({
        isEditButtonClick: false,
        editRatingValue: ""
      })
    }

    console.log('editMsg', this.state.editRatingValue)
    // this.updateMsg(postCode, cid);
  }

  onDeleteComment = (e, postCode, cid) => {
    e.preventDefault();
    this.deleteMsg(postCode, cid);
  }

  onHandleClickPage = (e) => {
    this.setState({
        currentPage: Number(e.target.id)
    });
  }

  onHandleSelectRating = (e) => {
    console.log('efdasfdasfasf',e.target.value);
    this.setState({
      selectedRatingValue: Number(e.target.value)
    });
  }

  render() {
    //console.log('comments',this.state.comments)
    return (
      <BrowserRouter>
            <div className="App">
            <div className="container">
              <section className="row products">
                <Route 
                  exact 
                  path="/" 
                  component={() => 
                    <Category 
                      snacks={this.state.snacks}
                      comments={this.state.comments}

                      onHandleClickPage={this.onHandleClickPage}
                      currentPage={this.state.currentPage}
                      snackPerPage={this.state.snackPerPage}
                    />
                  }
                />
                <Route
                  exact
                  path="/snacks/id/:id"
                  render={(props) =>
                    <Single 
                      snacks={this.state.snacks}
                      comments={this.state.comments}
                      onHandleNewComment={this.onHandleNewComment}
                      onChangeComment={this.onChangeComment}
                      newComment={this.state.newComment}
 
                      onDeleteComment={this.onDeleteComment}

                      onClickEdit={this.onClickEdit}
                      onSaveComment={this.onSaveComment}
                      isEditButtonClick={this.state.isEditButtonClick}
                      onUpdateTextareaComment={this.onUpdateTextareaComment}
                      onUpdateSelectRating={this.onUpdateSelectRating}

                      editMsg={this.state.editMsg}
                      editMsgCid={this.state.editMsgCid}
                      editRatingValue={this.state.editRatingValue}

                      onHandleSelectRating={this.onHandleSelectRating}
                      selectedRatingValue={this.state.selectedRatingValue}

                      handleAccordionClick={this.handleAccordionClick}
                      shown={this.state.shown}
                      {...props}
                    />
                  }
                />
              </section>
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;