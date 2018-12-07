import React, { Component } from 'react';
import Category from './Category';
import Single from './Single';
import Login from './login';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      snacks: [],
      users: [],
      comments: [],

      newComment:"",
      newTitle:"",
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
    const users = await fetch('https://gsnacks-db.herokuapp.com/users')
    .then(data => {
      return data.json();
    }).then(data => {
      return data;
    });
    const comments = await fetch('https://gsnacks-db.herokuapp.com/reviews')
    .then(data => {
      return data.json();
    }).then(data => {
      return data;
    });
    this.setState({
      snacks,
      comments
    })
  }
  
  // postMsg = async (comment) => {
  //   const proxy = "https://cors-anywhere.herokuapp.com";
  //   await fetch(proxy + 'https://gsnacks-db.herokuapp.com/reviews', {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: "POST",
  //     body: JSON.stringify(comment)
  //   })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then((response) => {
  //     console.log('response',response)
  //     this.setState(({
  //         comments: [
  //           ...this.state.comments,
  //           response
  //         ]
  //       })
  //     )
  //   })
  // }


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

  onChangeTitle = (e) => {
    this.setState({
      newTitle: e.target.value
    });
  }

  onHandleNewComment = (e, user_id, snack_id, ratingValue) => {
    e.preventDefault();
    console.log('ratingValue', ratingValue)
    const comment = { 
      title: this.state.newTitle,
      text: this.state.newComment,
      rating: ratingValue,
      snack_id,
      user_id
    };
    // this.postMsg(comment);
    fetch('https://gsnacks-db.herokuapp.com/reviews', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(response => {
        console.log('response',response)
        this.setState({
            comments: [
              ...this.state.comments,
              response
            ]
        })
    })
    // this.setState({
    //   newComment: "",
    //   newTitle: "",
    //   selectedRatingValue: ""
    // })
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
                      onChangeTitle={this.onChangeTitle}
                      newComment={this.state.newComment}
                      newTitle={this.state.newTitle}
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
                    />}
                  />
                  <Route 
                    exact
                    path="/login"
                    render={(props) => <Login />}
                  />
              </section>
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;