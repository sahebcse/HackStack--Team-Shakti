import React from "react";
import styles from "./Form.module.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../actions/auth";

const Form = ({ id }) => {
  const [data, setData] = React.useState({ email: "", pass: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setData({ ...data, email: e.target.value });
    } else {
      setData({ ...data, pass: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    console.log(data);
    const authentication = getAuth();
    //console.log(authentication);
    if (id == 2) {
      createUserWithEmailAndPassword(authentication, data.email, data.pass)
        .then((response) => {
          let data = {
            user: response.user.email,
            access: response.user.accessToken,
          };
          dispatch(userLogin(data, navigate));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      signInWithEmailAndPassword(authentication, data.email, data.pass)
        .then((response) => {
          let data = {
            user: response.user.email,
            access: response.user.accessToken,
          };
          dispatch(userLogin(data, navigate));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleGoogle = async () => {
    // Sign in using a popup.
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      //console.log(credential, token, user);
      let data = {
        user: user.email,
        access: user.accessToken,
      };
      dispatch(userLogin(data, navigate));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.head}>
        {id == 1 ? "Login Form" : "Register Form"}
      </h2>
      <div className={styles.email}>
        <label htmlFor="email">Email</label>
        <input
          value={data.email}
          type="text"
          name="email"
          style={{ margin: "5px" }}
          onChange={handleChange}
        />
      </div>
      <div className={styles.email}>
        <label htmlFor="pass">Password</label>
        <input
          value={data.pass}
          type="password"
          name="pass"
          style={{ margin: "5px" }}
          onChange={handleChange}
        />
      </div>
      <button className={styles.btn} onClick={handleSubmit}>
        Submit
      </button>
      {id == 1 && (
        <>
          <button className={styles.googl} onClick={handleGoogle}>
            <img src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" />
            Sign In With Google
          </button>

          <Link className={styles.lk} to="/register">
            Want to Register
          </Link>
        </>
      )}
      {id == 2 && (
        <Link className={styles.lk} to="/login">
          Already Registered ?
        </Link>
      )}
    </div>
  );
};

export default Form;
