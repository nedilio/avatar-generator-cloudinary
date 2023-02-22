import React from "react";

const UploadError = ({ fileRejections }) => {
  return (
    <section className="bg-red-300 text-red-700 p-4 rounded-md">
      <h4 className="font-bold">Rejected Files</h4>
      <ul className="text-sm font-semibold italic">
        {fileRejections.map(({ file, errors }) => (
          <li key={file.path}>
            {file.path} - {errors[0].message}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UploadError;
