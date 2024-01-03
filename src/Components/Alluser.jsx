import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import ConverDateTime from "./ConverDateTime";

function Alluser() {
  useEffect(() => {
    const userQuery = query(
      collection(db, "users"),
      orderBy("timestamp", "desc")
    );

    const fetchData = async () => {
      await onSnapshot(userQuery, (snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };

    fetchData();
    console.log(users);
  }, []);

  const [users, setUsers] = useState([]);
  return (
    <>
      {users.map((user) => {
        return (
          <>
            <div
              className="text-center container my-2 all_user_con"
              style={{ width: "50%", minWidth: "330px" }}
            >
              <div className="row">
                <div key={user.id} className="all_users col-3">
                  <img src={user.photoUrl} alt="" />
                </div>
                <div className="col-9">
                  <h3 className="text-light font-weight-bold">{user.name}</h3>
                  <h6 className="text-light font-weight-bold">{user.email}</h6>
                  <ConverDateTime
                    text="Register Time :- "
                    seconds={user.timestamp?.seconds}
                    nanoseconds={user.timestamp?.nanoseconds}
                  />
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Alluser;
