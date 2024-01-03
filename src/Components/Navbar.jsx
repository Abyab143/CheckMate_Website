import React from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user)
    const user = result.user;

    //check for user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        timestamp: serverTimestamp(),
      });
    }
    toast.success(`Welcome ${auth.currentUser.displayName}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/profile");
  };
  // console.log(auth)

  const logOut = async () => {
    await auth.signOut();
    // console.log("logout");
    toast.success("LogOut Successfully..", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/");
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container-fluid navi  sticky-top">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            {auth.currentUser ? (
              <>
                <div className="d-flex">
                  <img
                    src={auth.currentUser.photoURL}
                    alt=""
                    style={{
                      width: "20%",
                      height: "20%",
                      borderRadius: "100%",
                    }}
                  />
                  <span className="mx-2 text-light font-weight-bold mt-2">
                    {auth.currentUser.displayName}
                  </span>
                </div>
              </>
            ) : (
              <img src={logo} alt="CHECKMATE" width="80%" />
            )}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarnavdropdown"
            aria-controls="navbarnavdropdown"
            aria-expanded="true"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarnavdropdown">
            <ul className="navbar-nav ml-auto">
              {!auth.currentUser && (
                <li className="nav-item">
                  <button
                    className="btn btn-dark mx-3  font-weight-bold text-warning "
                    onClick={googleClick}
                  >
                    <FcGoogle />
                    Login With Google
                  </button>
                </li>
              )}

              {auth.currentUser && (
                <>
                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-success mx-3"
                      to="/addpost"
                    >
                      AddPost
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-success mx-3 "
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-success mx-3"
                      to="/alluser"
                    >
                      Alluser
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-success mx-3 "
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
