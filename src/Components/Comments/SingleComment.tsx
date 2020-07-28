import React from 'react';
import Moment from 'react-moment';

type Comment = {
  comment: any,
  resolveCommentCallback: Function,
}

export function SingleComment(props: Comment) {
  const {
    comment,
    resolveCommentCallback,
  } = props;

  const resolveComment = () => {
    resolveCommentCallback(comment)
  }

  return (
    <div className="comment">
      <div className="commentHeader">
        <h4 className='username'>
          {comment.resolved && <span>✅&nbsp;</span>}
          {comment.user}
        </h4>
        <h4 className='date'>
          <Moment fromNow>{comment.createdAt}</Moment>
        </h4>
      </div>
      <div className='commentBody'>
        <p>{comment.comment}</p>
      </div>
      {
        !comment.resolved &&
        <button
          className="commentResolveButton"
          onClick={resolveComment}>
          Resolve
        </button>
      }
    </div>
  )
}
