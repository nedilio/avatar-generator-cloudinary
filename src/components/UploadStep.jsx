import { useEffect } from "react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import UploadError from "./UploadError";

const UploadStep = ({ file, setFile }) => {
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
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFile(file);
      }
    },
  });

  const styles = useMemo(() => {
    if (isFocused || isDragAccept) {
      return "border-green-500";
    } else if (isDragReject) {
      return "border-red-500";
    } else {
      return null;
    }
  }, [isFocused, isDragAccept, isDragReject]);

  useEffect(() => {
    return () =>
      acceptedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <form>
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
      </form>
      {fileRejections.length > 0 && (
        <UploadError fileRejections={fileRejections} />
      )}
    </>
  );
};

export default UploadStep;
