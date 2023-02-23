import CloudinaryLogo from "./CloudinaryLogo";

const Footer = () => {
  return (
    <footer className="font-semibold flex flex-col items-center justify-center mt-4 gap-y-1">
      <p className="">
        Created using: <CloudinaryLogo className="inline-block" />
      </p>

      <p>
        to participate in{" "}
        <a
          href="https://www.twitch.tv/videos/1744886615"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:underline font-bold"
        >
          midudev's
        </a>{" "}
        cloudinary hackaton
      </p>
    </footer>
  );
};

export default Footer;
