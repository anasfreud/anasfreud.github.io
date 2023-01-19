import { useEffect } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router';
import './App.css';


function App() {
  const Form = () => {
    useEffect(() => console.log("Mounted"));
    return <div>From!!</div>
  }


  return (
    <div>
      <Routes>
        <Route path="/form" element={<Form/>}></Route>
      </Routes>
      <div>Hello!</div>
    </div>
  );
}


export default App;
