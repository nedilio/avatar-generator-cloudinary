const ProcessStep = ({ file, setFile }) => {
  const handleUpload = (event, file) => {
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
        // console.log(res);
        const { secure_url } = res;
        const image = secure_url.replace(
          "https://res.cloudinary.com/dlrsxizob/image/upload/",
          ""
        );
        const avatarURL = `https://res.cloudinary.com/dlrsxizob/image/upload/c_thumb,g_face,h_300,w_300/r_max/f_webp/${image}`;
        setFile({ preview: avatarURL, avatar: true });
      })
      .catch((error) => console.log("error", error));
  };

  const handleCleanFiles = (e) => {
    e.preventDefault();
    setFile(null);
  };

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
            console.log(file);
          }}
        />
      </div>
      {!file.avatar && (
        <button
          className="bg-cyan-500 mt-8 text-gray-100 px-8 py-3 rounded-md"
          onClick={(event) => handleUpload(event, file)}
          type="submit"
        >
          Generate Avatar
        </button>
      )}
      {file.avatar && (
        <div className="flex gap-2">
          <a
            download
            href={file.preview}
            target="_blank"
            className="block w-2/3 bg-purple-500 text-slate-50 px-8 py-4 mt-8 rounded-md transition duration-150 hover:bg-purple-800"
          >
            DownloadAvatar
          </a>
          <button
            className="block w-2/3 bg-red-500 text-slate-50 px-8 py-4 mt-8 rounded-md transition duration-150 hover:bg-red-800"
            onClick={handleCleanFiles}
          >
            Back
          </button>
        </div>
      )}
    </section>
  );
};

export default ProcessStep;
