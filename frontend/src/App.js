import { useState } from "react";
import "./App.css";
import AstronautListContainer from "./components/AstronautList/AstronautListContainer";
import SelectedAstronautContainer from "./components/SelectedAstronaut/SelectedAstronautContainer";

function App() {
 
  const [selectedAstronautId, setSelectedAstronautId]=useState(null);
  
  return (
    <div className="App">
      <header className="App-header">ElevenLab Test</header>
      <div className="mainLayout">
        <AstronautListContainer handleSelect={setSelectedAstronautId} />
        {selectedAstronautId?<SelectedAstronautContainer selectedAstronautId={selectedAstronautId} />:null}
      </div>
    </div>
  );
}

export default App;
