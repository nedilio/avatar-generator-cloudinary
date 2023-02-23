import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProcessStep from "./components/ProcessStep";
import UploadStep from "./components/UploadStep";
import Instructions from "./components/Instructions";

function App() {
  const [file, setFile] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="max-w-lg mx-auto text-center p-4 text-gray-800">
      {showInstructions && (
        <Instructions toggleInstructions={toggleInstructions} />
      )}
      <div className="flex flex-col gap-4 relative">
        <Header />

        {!file && <UploadStep file={file} setFile={setFile} />}
        {file && <ProcessStep file={file} setFile={setFile} />}
        <Footer />
        {!showInstructions && (
          <button
            className="bg-purple-500 text-slate-50 px-8 py-4 mt-8 rounded-md transition duration-150 hover:bg-purple-800"
            onClick={toggleInstructions}
          >
            Show Instructions
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
