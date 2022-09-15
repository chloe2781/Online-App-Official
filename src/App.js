import "./App.css";
import "./globals.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Success from "./Success";
import ApplicationForm from "./submitting/ApplicationForm";
import NotFound from "./NotFound.js";
import Applications from "./viewing/Applications";
import Application from "./viewing/Application";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<ApplicationForm/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/applications" element={<Applications/>}/>
          <Route path="/applications/:applicationId" element={<Application/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );

}

export default App;