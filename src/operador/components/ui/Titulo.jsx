export default function Titulo({ texto }) {
    return (
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-90 md:text-5xl lg:text-5xl ">
        <span className="text-transparent bg-clip-text bg-gradient-to-l to-[#004b93] from-sky-400 ">
          {texto}
        </span>
      </h1>
    );
  }
  