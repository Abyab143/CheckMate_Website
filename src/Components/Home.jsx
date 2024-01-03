import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import Post from "./post";

function Home() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const postQuery = query(collection(db, "post"), orderBy("time", "desc"));

    const fetchData = async () => {
      await onSnapshot(postQuery, (snapshot) => {
        setposts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };

    fetchData();
    console.log(posts);
  }, []);
  return (
    <>
      {posts.map((data) => (
        <Post key={data.id} data={data} />
      ))}
    </>
  );
}

export default Home;
