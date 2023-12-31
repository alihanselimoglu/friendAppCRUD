import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      name: name,
      age: age,
    }).then((response) => {
      setListOfFriends([
        ...listOfFriends,
        { _id: response.data._id, name: name, age: age },
      ]);
    });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");

    Axios.put("http://localhost:3001/update", {
      newAge: newAge,
      id: id,
    }).then(() => {
      setListOfFriends(
        listOfFriends.map((val) => {
          return val._id === id
            ? {
                _id: id,
                name: val.name,
                age: newAge,
              }
            : val;
        })
      );
    });
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      if (response.data === "deleted") {
        setListOfFriends(
          listOfFriends.filter((val) => {
            return val._id !== id;
          })
        );
        alert("Friend deleted successfully.");
      } else {
        alert("Error: Unable to delete the friend.");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Friend age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button onClick={addFriend}> Add Friend </button>
      </div>

      <div className="listOfFriends">
        {listOfFriends.map((val, key) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3> Name: {val.name} </h3>
                <h3> Age: {val.age} </h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                {" "}
                Update{" "}
              </button>
              <button
                onClick={() => {
                  deleteFriend(val._id);
                }}
                id="removeBtn"
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
