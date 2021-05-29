import Icons from "../helperfunctions/Icons";

const Footer = (props) => {
  return (
    <div className="w-full rounded-tl p-2 px-4 absolute bottom-0 right-0 bg-gray-100">
      <div className="    border-l-0 border-r-0 border-t-0 border-dashed   border-gray-600">
        Google has generously supported this work by providing Google Cloud
        credits as part of the{" "}
        <a
          href="https://developers.google.com/community/experts"
          target="_blank"
          rel="noreferrer"
        >
          Google Developer Expert
        </a>{" "}
        program!. Demo created by{" "}
        <a href="https://victordibia.com" target="_blank" rel="noreferrer">
          Victor Dibia
        </a>
        .{" "}
      </div>
    </div>
  );
};

export default Footer;
