import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProcessStep from "./components/ProcessStep";
import UploadStep from "./components/UploadStep";

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="max-w-lg mx-auto text-center p-4 text-gray-800">
      <div className="flex flex-col gap-4">
        <Header />
        {!file && <UploadStep file={file} setFile={setFile} />}
        {file && <ProcessStep file={file} setFile={setFile} />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
