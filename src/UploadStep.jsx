import React from "react";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const UploadStep = () => {
  const [file, setFile] = useState(null);
  const {
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
  });
  useEffect(() => {
    return () =>
      acceptedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const styles = useMemo(() => {
    if (isFocused || isDragAccept) {
      return "border-green-500";
    } else if (isDragReject) {
      return "border-red-500";
    } else {
      return null;
    }
  }, [isFocused, isDragAccept, isDragReject]);

  const handleUpload = (event, file) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "avatar");
    formData.append("timestamp", Date.now() / 1000);
    // formData.append("public_id", "dlrsxizob");
    formData.append("api_key", "777482994434729");

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(
      "https://api.cloudinary.com/v1_1/dlrsxizob/image/upload",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        const { secure_url } = res;
        const image = secure_url.replace(
          "https://res.cloudinary.com/dlrsxizob/image/upload/",
          ""
        );
        const avatarURL = `https://res.cloudinary.com/dlrsxizob/image/upload/c_thumb,g_auto:face,h_300,w_300/r_max/f_webp/${image}`;
        setFile({ preview: avatarURL });
        console.log(avatarURL);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <form action="https://api.cloudinary.com/v1_1/dlrsxizob/upload">
      <div
        className={`border-dashed border-4 border-gray-300 rounded px-4 py-8 transition duration-200 ${
          styles && styles
        }`}
      >
        <div {...getRootProps({ className: "dropzone" })}>
          <input id="file" {...getInputProps()} />
          <p className="font-bold text-gray-500 text-2xl">
            Drag 'n' drop your image here, or click to select file
          </p>
          <p className="font-semibold text-xs mt-6">
            Only 1 file is accepted and must be jpg or png format
          </p>
        </div>
      </div>
      <aside>
        {acceptedFiles.length > 0 && (
          <div>
            <div className="w-40 h-40 mx-auto mt-4">
              <img
                className="rounded-md object-cover w-40 h-40"
                src={file.preview}
                alt="uploaded file"
                height={160}
                width={160}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
            <button
              className="bg-cyan-500 mt-8 text-gray-100 px-8 py-3 rounded-md"
              onClick={(event) => handleUpload(event, acceptedFiles[0])}
              type="submit"
            >
              Generate Avatar
            </button>
          </div>
        )}

        {fileRejections.length > 0 && (
          <div>
            <h4>Rejected Files</h4>
            <ul>
              {fileRejections.map(({ file, errors }) => (
                <li key={file.path}>
                  {file.path} - {file.size} bytes - {errors[0].message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </form>
  );
};

export default UploadStep;