import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { increment, decrement, storedata } from "./Store/Action/index.js";
import DummyC from "./component/dummyC";
import jwt_decode from "jwt-decode";

// =================================== FIREBASE START =======================================
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

// import firebase from "firebase/compat/app"; // firebase important
// import "firebase/database";
// import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfVpVN0KFOOa4dDXOjoj5qqWiD1q4NpUg",
  authDomain: "portal-karir-a9b96.firebaseapp.com",
  databaseURL: "https://portal-karir-a9b96-default-rtdb.firebaseio.com",
  projectId: "portal-karir-a9b96",
  storageBucket: "portal-karir-a9b96.appspot.com",
  messagingSenderId: "412593896113",
  appId: "1:412593896113:web:dfaf4b61c7ea462be00090",
  measurementId: "G-VCSQXF4XW2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// =================================== FIREBASE END =======================================

function App(props) {
  const [hasil, setHasil] = useState([]);
  const [judul, setJudul] = useState([]);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");

  const firebaseApp = app;

  const counter = useSelector((state) => state.counterReducer);
  const dispatch = useDispatch();

  // this is method one ========================================================================
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }
  //document.getElementById("blablabla").hidden = false;
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "256384375485-m4kkh9cnfqa9u2en1qe0a15jjum4tbji.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signalDiv"), {
      type: "icon",
      theme: "outline",
      size: "large",
    });
  }, []);

  // this ========================================================================

  useEffect(() => {
    console.log("mulai disimpan");
    // props.storeResultToRedux(hasil);
    dispatch(storedata(hasil));
    console.log("selesai disimpan");
  }, [hasil]);

  useEffect(() => {
    console.log("mulai tampilkan");
    console.log(counter.title ?? "");
    console.log(counter);
    console.log("selesai tampilkan");
  }, [counter]);

  const getAPIData = async () => {
    const API_KEY = "AIzaSyBtin1CFFXqh8CebmmG_ZSL_mOjCxcVe1k";
    await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=putin&type=video&key=${API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.items[0]);
        return data.items[0].snippet;
      })
      .then((data1) => {
        setHasil(data1);
        console.log("sampai sini");
      });
  };

  function ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }
  // =================================== FIREBASE START =======================================
  const uploadHandler = () => {
    console.log("handler" + app);
    console.log(app);

    const userId = ascii_to_hexa(user.email);

    const database = getDatabase(app);
    set(ref(database, "users/" + userId), {
      username: user.name,
      email: user.email,
    });

    console.log("finish upload to firebase");
  };
  // =================================== FIREBASE END =======================================

  return (
    <div className="App">
      <header className="App-header">
        {/* {counter.snippet.title} */}
        {judul}
        <br></br>
        Hello
        <button onClick={getAPIData}>Tarik Data</button>
        <button onClick={() => dispatch(increment())}> + </button>
        <button onClick={() => dispatch(decrement("kemana"))}> - </button>
        <button onClick={uploadHandler}>upload to database</button>
        <DummyC />
        <div id="signalDiv"></div>
        {user && (
          <div>
            <img src={user.picture} alt="user" />
            <h3>{user.name}</h3>
          </div>
        )}
      </header>
      {console.log(firebaseApp)}
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  );
}
export default App;
