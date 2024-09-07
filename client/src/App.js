import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [listOfUsers, setListOfUsers] = useState([{id:1, name: "pedro", age: 20, username:"pedropask"}])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:3001/getUsers").then((response) =>{
      setListOfUsers(response.data)

    })
  },[])

  const createUser = ()=>{
    axios.post("http://localhost:3001/createUser", {name, age, username,}).then((response)=>{
      alert("success")
      window.location.reload();
    })
  }

  return (
    <div className="App">

<div className="userDisplay">
  {listOfUsers.map((user, index) => (
    <div key={index}>
      <h1>Name: {user.name}</h1>
      <h1>Age: {user.age}</h1>
      <h1>Username: {user.username}</h1>
    </div>
  ))}
</div>


<div className="post">
  <input 
    type="text" 
    placeholder='name' 
    onChange={(event) => setName(event.target.value)} 
  />
  <input 
    type="number" 
    placeholder='age' 
    onChange={(event) => setAge(event.target.value)}  
  />
  <input 
    type="text" 
    placeholder='username' 
    onChange={(event) => setUsername(event.target.value)} 
  />
  <button onClick={createUser}>Create User</button> 
</div>

</div>
  );
}

export default App;
