import LandingPage from "../resources/LandingPage.png";
function Hero() {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg: lg:items-center">
          <div className="mx-auto max-w-xl text-center mt-7">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Manage Your Expense
              <strong className="font-extrabold text-indigo-700 sm:block">
                {" "}
                Control Your Money{" "}
              </strong>
            </h1>

            <p className="mt-4 font-medium sm:text-xl/relaxed">
              Start Creating your budget and save ton of money
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-indigo-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-900 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="p-5 flex justify-center mt-0 w-full">
        <img
          src={LandingPage}
          alt="Landing Page Image"
          className=""
          height={500}
          width={900}
        />
      </div>
    </>
  );
}

export default Hero;
