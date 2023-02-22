import { useState } from "react";
import "./App.css";
import UploadStep from "./UploadStep";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-lg mx-auto text-center p-4 text-gray-800">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Cloudinary test</h1>
        <UploadStep />
      </div>
    </div>
  );
}

export default App;
