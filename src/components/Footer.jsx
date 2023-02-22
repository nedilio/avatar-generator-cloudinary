import CloudinaryLogo from "./CloudinaryLogo";

const Footer = () => {
  return (
    <footer className="font-semibold flex flex-col items-center justify-center mt-4 gap-y-1">
      <p className="">
        Created using: <CloudinaryLogo className="inline-block" />
      </p>

      <p>to participate in midudev hackaton</p>
    </footer>
  );
};

export default Footer;
