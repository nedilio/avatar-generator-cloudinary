const Header = () => {
  return (
    <header>
      <h1 className="font-bold text-4xl md:text-6xl mb-2">
        Avatar
        <span className="text-purple-500 text-4xl md:text-6xl">Generator</span>
      </h1>
      <a
        href="https://github.com/nedilio"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-purple-500 hover:underline"
      >
        by Nedilio
      </a>
    </header>
  );
};

export default Header;
