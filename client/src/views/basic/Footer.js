import React from "react";

const Footer = () => {
  return (
    <div className="sec text-white relative bottom-0 left-0 w-full bg-black flex justify-center items-center flex-col mt-5">
      <h3 className="font-semibold text-2xl hover:text-purple-500">
        Contact Us
      </h3>
      <ul className="m-3 flex justify-center items-center w-full">
        <li className="mx-2">Something1</li>
        <li className="mx-2">Something2</li>
        <li className="mx-2">Something3</li>
      </ul>
    </div>
  );
};

export default Footer;
