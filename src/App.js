import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { increment, decrement, storedata } from "./Store/Action/index.js";
import DummyC from "./component/dummyC";
import jwt_decode from "jwt-decode";

function App(props) {
  const [hasil, setHasil] = useState([]);
  const [judul, setJudul] = useState([]);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");

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
      theme: "outline",
      size: "large",
    });
  }, []);

  // this is method two ========================================================================

  

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
        <DummyC />
        <div id="signalDiv"></div>
        {user && (
          <div>
            <img src={user.picture} alt="user" />
            <h3>{user.name}</h3>
          </div>
        )}
      </header>
    </div>
  );
}
export default App;
