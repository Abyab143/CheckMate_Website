import React from "react";
import ConverDateTime from "./ConverDateTime";

function ShowComment({ comment }) {
  return (
    <>
      <div className="container my-2 comment_con">
        <div className="comment_user">
          <img src={comment.photoUrl} alt="" />
          <h3 className="text-light">{comment.author}</h3>
        </div>
        <ConverDateTime
          seconds={comment.time.seconds}
          nanoseconds={comment.time.nanoseconds}
        />
        <h3 className="text-light">{comment.message}</h3>
        <p></p>
      </div>
    </>
  );
}

export default ShowComment;
