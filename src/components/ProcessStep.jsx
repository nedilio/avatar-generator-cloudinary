import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
// Import required qualifiers.
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { webp } from "@cloudinary/url-gen/qualifiers/format";
import { useState } from "react";
import CogIcon from "./icons/CogIcon";
import DownloadIcon from "./icons/DownloadIcon";
import BackIcon from "./icons/BackIcon";

import "./ProcessStep.css";
import { useEffect } from "react";

const ProcessStep = ({ file, setFile }) => {
  const [processingImage, setProcessingImage] = useState(false);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dlrsxizob",
    },
    url: {
      secure: true,
    },
  });

  const handleUpload = (event, file) => {
    setProcessingImage(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "avatar");
    formData.append("timestamp", Date.now() / 1000);
    formData.append("api_key", "777482994434729");
    // formData.append("colors", true); no se puede unnsigned

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
        const { public_id: publicId, secure_url: url } = res;
        const avatar = cloudinary
          .image(publicId)
          .resize(
            thumbnail()
              .width(250)
              .height(250)
              .gravity(focusOn(FocusOn.face()))
              .zoom(0.8)
          ) // Crop the image.
          .roundCorners(max())
          .delivery(format(webp()))
          .toURL();

        setFile({ preview: avatar, avatar: true });
      })
      .catch((error) => console.log("error", error));
  };

  const handleCleanFiles = (e) => {
    e.preventDefault();
    setFile(null);
  };

  useEffect(() => {
    if (file.avatar) {
      setProcessingImage(false);
    }
  }, [file]);

  return (
    <section>
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
      {!file.avatar && (
        <button
          className="bg-cyan-500 mt-8 text-gray-100 px-8 py-3 rounded-md flex mx-auto gap-1 justify-center items-center"
          onClick={(event) => handleUpload(event, file)}
          type="submit"
        >
          <span
            className={`${
              processingImage ? "animate scale-125" : null
            } scale-110`}
          >
            <CogIcon />
          </span>
          <strong className="font-semibold">Generate Avatar</strong>
        </button>
      )}
      {file.avatar && (
        <div className="flex gap-2">
          <a
            download={file.preview}
            href={file.preview}
            target="_blank"
            className="flex justify-center items-center gap-2 w-2/3 bg-purple-500 text-slate-50 px-8 py-2 mt-8 rounded-md transition duration-150 hover:bg-purple-800"
          >
            <DownloadIcon /> DownloadAvatar
          </a>
          <button
            className="flex justify-center items-center gap-2 w-2/3 bg-red-500 text-slate-50 px-8 py-4 mt-8 rounded-md transition duration-150 hover:bg-red-800"
            onClick={handleCleanFiles}
          >
            <BackIcon /> Back
          </button>
        </div>
      )}
    </section>
  );
};

export default ProcessStep;
