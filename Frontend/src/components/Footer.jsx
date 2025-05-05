
import React from "react";

function Footer() {
  return (
    <footer className="bg-violet-800 text-white text-center p-4 font-semibold mt-auto">
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
      <p className="text-sm md:text-base">
        Designed by <span className="font-bold">peter</span>
      </p>
    </footer>
  );
}

export default Footer;

