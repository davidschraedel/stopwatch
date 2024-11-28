import { Link } from "react-router-dom";

function Footer() {
  function getYear() {
    let year = new Date().getFullYear();
    return year;
  }
  const currentYear = getYear() || 0;

  return (
    <>
      <div className="pb-8 pt-4 text-center font-semibold rounded-md mx-auto md:mx-28 lg:mx-48 xl:mx-72 sm:opacity-50 sm:hover:opacity-100 sm:ease-in-out sm:duration-300">
        <div className="hidden sm:block mx-auto max-w-7xl my-6 px-2 sm:px-6 lg:px-8 bg-stone-100 bg-opacity-80 rounded-md shadow-2xl w-5/6 md:w-4/6 lg:w-3/6">
          <div className="flex h-16 items-center justify-center">
            <div className="flex flex-1 justify-center sm:items-stretch ">
              <div className="flex flex-shrink-0">
                <div className="flex space-x-4">
                  <Link
                    className="ease-in-out duration-150 select-none text-stone-900 hover:bg-[#0077B5] hover:text-stone-100 rounded-md px-3 py-2 text-sm font-medium min-w-24 focus:outline-stone-100"
                    to={"https://www.linkedin.com/in/david-schraedel/"}
                    target="_blank">
                    LinkedIn
                  </Link>
                  <br className="select-none" />
                  <Link
                    className="ease-in-out duration-150 select-none text-stone-900 hover:bg-[#2b3137] hover:text-[#fafbfc] rounded-md px-3 py-2 text-sm font-medium min-w-24 focus:outline-[#fafbfc]"
                    to={"https://github.com/davidschraedel"}
                    target="_blank">
                    Github
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block sm:hidden mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8 ">
          <div className="mt-4 flex flex-1 justify-center">
            <div className="w-full flex flex-col items-center justify-center">
              <Link
                className="bg-[#0077B5] text-stone-100 hover:shadow-md rounded-md px-3 py-2 my-4 text-sm font-medium min-w-24 focus:outline-stone-100"
                to={"https://www.linkedin.com/in/david-schraedel/"}
                target="_blank">
                LinkedIn
              </Link>

              <Link
                className="bg-[#2b3137] text-[#fafbfc] hover:shadow-md rounded-md px-3 py-2 my-4 text-sm font-medium min-w-24 focus:outline-[#fafbfc]"
                to={"https://github.com/davidschraedel"}
                target="_blank">
                Github
              </Link>
            </div>
          </div>
        </div>
        <Link
          to={"mailto:davidschraedel@gmail.com"}
          className="text-stone-100 text-sm sm:text-md p-1  hover:text-stone-600 focus:outline-stone-100 focus:hover:outline-transparent">
          davidschraedel@gmail.com
        </Link>
        <p className="pb-10 pt-2 text-sm text-stone-100 ">
          © {currentYear || "2024"} David Schraedel
        </p>
      </div>
    </>
  );
}

export default Footer;
