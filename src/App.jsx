import { useState } from "react";
import "./App.css";
import CloudinaryLogo from "./CloudinaryLogo";
import UploadStep from "./UploadStep";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-lg mx-auto text-center p-4 text-gray-800">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl md:text-6xl">
          Avatar
          <span className="text-purple-500 text-4xl md:text-6xl">
            Generator
          </span>
        </h1>
        <a
          href="https://github.com/nedilio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-purple-500 hover:underline"
        >
          by Nedilio
        </a>
        <UploadStep />
        <p className="flex gap-2 mx-auto mt-4">
          Created using: <CloudinaryLogo />
        </p>
      </div>
    </div>
  );
}

export default App;
