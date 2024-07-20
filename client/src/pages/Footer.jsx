import Logo from "../resources/github_logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-300 sticky w-full mb-0 p-1 text-gray-950">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-around">
        <div className="text-sm sm:text-center">
          © 2024{" "}
          <a
            href="https://cyborgcoding.com"
            className="hover:underline"
          >
            Expenza
          </a>
          . All Rights Reserved.
        </div>
        <div className="md:flex text-sm sm:text-center">
          Made with 🖤 by Rahul Dohare.
          <a href="https://github.com/rahuldohare007/Expenza">
            <img src={Logo} style={{ marginLeft: "5px" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
