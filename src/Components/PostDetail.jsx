import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import Comment from "./Comment";

function PostDetail() {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const getSingleDoc = async (id) => {
      const ref = doc(db, "post", id);
      getDoc(ref).then((doc) => setData(doc.data()));
    };
    getSingleDoc(id);

    console.log("Single Doc ", data);
  }, [id]);
  return (
    <>
      <div
        className="container"
        style={{
          width: "60%",
          marginTop: "20px",
          padding: "10px",
          minWidth: "340px",
        }}
      >
        <div className="row">
          <div className="col-md-5">
            <img
              src={data.imageUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                minWidth: "300px",
              }}
            />
          </div>
          <div
            className="col-md-7  text-center margi"
            style={{
              border: "1px solid white",
              background: "black",
              minWidth: "340px",
              padding: "10px",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <img src={data.photoUrl} alt="" style={{ borderRadius: "100%" }} />
            <h3 className="text-light">{data.author}</h3>
            <h3 className="text-light">{data.title}</h3>
            <p className="text-light">{data.description}</p>
          </div>
        </div>
        <Comment postId={id} />
      </div>
    </>
  );
}

export default PostDetail;
