import Logo from "../resources/ExpenzaLogo2.png";
import LandingPage from "../resources/LandingPage.png";
import GitHubLogo from "../resources/github_logo.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="p-2 fixed w-full flex justify-between items-center border shadow-md bg-white">
      <div className="flex justify-start items-center">
        <img src={Logo} alt="ExpenzaLogo" className="h-10 w-10" />
        <h1 className="text-2xl text-indigo-700 font-bold p-1">Expenza</h1>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <Link to="/signin">Get Started</Link>
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center mt-7">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Manage Your Expense
              <strong className="font-extrabold text-indigo-700 sm:block">
                Control Your Money
              </strong>
            </h1>
            <p className="mt-4 font-medium sm:text-xl/relaxed">
              Start Creating your budget and save tons of money
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/signin"
                className="block w-full rounded bg-indigo-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-900 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="p-5 flex justify-center -mt-5 w-full">
        <img
          src={LandingPage}
          alt="Landing Page Image"
          height={500}
          width={900}
        />
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-300 w-full mb-0 p-1 text-gray-950">
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
            <img src={GitHubLogo} style={{ marginLeft: "5px" }} alt="GitHub Logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
}

export default HomePage;
