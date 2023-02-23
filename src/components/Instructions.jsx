import React from "react";
import SingleInstruction from "./SingleInstruction";

const Instructions = ({ toggleInstructions }) => {
  const instructions = [
    "🤳Upload a photo with a face on it (❌does not work too good with pets 🐱 🐶 or non human faces 🦆).",
    "🥠 Generate avatar: cloudinary will detect your face and do the magic 🧞",
    "📁⬇️ Download your photo 🌝 ",
    "You dont like it? 👎 Click Back and upload a new picture and try again",
    // "📷",
  ];
  return (
    <div className="absolute bg-gray-800 top-0 left-0 bg-opacity-90 w-screen h-screen z-10">
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <section className="bg-purple-700 max-w-md py-8 px-8 text-slate-50 text-left rounded-md">
          <ul className="">
            {instructions.map((item, index) => (
              <SingleInstruction key={index} text={item} />
            ))}
          </ul>
          <button
            className="mx-auto block bg-red-800 text-white px-8 py-3 mt-8 rounded-md transition duration-150 hover:bg-red-900"
            onClick={toggleInstructions}
          >
            Close
          </button>
        </section>
      </div>
    </div>
  );
};

export default Instructions;
