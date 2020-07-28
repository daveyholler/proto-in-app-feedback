import React from 'react';
import firebase from './firebase';

import { SingleComment } from './SingleComment'

import './Comments.scss';

type CommentState = {
  comment: string,
  user: string,
  comments: any[],
  existingUser: boolean,
  showResolvedComments: boolean,
}

type CommentProps = {
  pageName: string,
}

export default class Comments extends React.Component<CommentProps, CommentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      comment: '',
      user: '',
      comments: [],
      existingUser: false,
      showResolvedComments: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentResolution = this.handleCommentResolution.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleResolvedCommentToggle = this.handleResolvedCommentToggle.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      comment: event.target.value
    })
  }

  handleNameChange(event: any) {
    this.setState({
      user: event.target.value
    })
  }

  handleResolvedCommentToggle() {
    this.setState({
      showResolvedComments: !this.state.showResolvedComments
    })
  }

  handleSubmit() {
    const commentsRef = firebase.database().ref('comments');
    const date = new Date().toISOString();
    const comment = {
      user: this.state.user,
      comment: this.state.comment,
      resolved: false,
      createdAt: date,
    }
    commentsRef.push(comment);
    localStorage.setItem('username', this.state.user)
    this.setState({
      comment: '',
    }, () => {
      this.getExistingUser()
    })
  }

  handleCommentResolution(comment: any) {
    console.log(`comment ${comment.id} was resolved`)
    const commentRef = firebase.database().ref(`comments/${comment.id}`)
    const updatedComment = {...comment, resolved: true}
    commentRef.update(updatedComment);
  }

  getExistingUser() {
    const existingUser = localStorage.getItem('username');
    if (existingUser) {
      this.setState({
        user: existingUser,
        existingUser: true,
      })
    }
  }

  componentDidMount() {
    this.getExistingUser();
    const commentsRef = firebase.database().ref('comments');
    commentsRef.on('value', (snapshot: any) => {
      let comments = snapshot.val();
      let newState = [];
      for (let comment in comments) {
        newState.push({
          id: comment,
          comment: comments[comment].comment,
          user: comments[comment].user,
          resolved: comments[comment].resolved,
          createdAt: comments[comment].createdAt
        });
      }
      this.setState({
        comments: newState
      })
    })
  }

  render() {
    return (
      <div className="comments">
        <h3>Leave a comment</h3>
        <div className='commentForm'>
          {
            !this.state.existingUser
            ? <input
              type='text'
              placeholder="Your name"
              onChange={this.handleNameChange}
            />
            : <small style={{marginBottom: "1rem"}}>Commenting as {this.state.user}</small>
          }
          <textarea value={this.state.comment} onChange={this.handleChange}/>
          <button
            disabled={this.state.comment === '' || this.state.user === ''}
            className="commentSubmitButton"
            onClick={this.handleSubmit}>
            Send
          </button>
        </div>
        <hr className="commentDivider"/>
        <div className='commentInnerWrapper'>
          {
            this.state.comments.length > 0 &&
            <span
              className='showResolvedCommentsToggle'
              onClick={this.handleResolvedCommentToggle}>
              {
                this.state.showResolvedComments
                ? 'Hide resolved comments'
                : 'Show resolved comments'
              }
            </span>
          }
          {this.state.comments.map(comment => (
            !comment.resolved || this.state.showResolvedComments
            ? (
              <SingleComment
                key={comment.id}
                comment={comment}
                resolveCommentCallback={this.handleCommentResolution}
              />
            ) : null
          ))}
        </div>
      </div>
    )
  }
}
