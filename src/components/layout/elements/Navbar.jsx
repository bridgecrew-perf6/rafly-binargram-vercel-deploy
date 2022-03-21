import { SearchIcon } from "@heroicons/react/outline";

const Navbar = () => {
  return (
    <nav className=" bg-white h-16 fixed top-0 left-0 w-full z-50">
      <div className="max-w-md border-b border-r border-l mx-auto px-3 h-full flex justify-center items-center">
        <form className="w-full">
          <div className="relative">
            <span className="absolute top-0 left-0 h-full text-gray-500 font-bold inline-flex justify-center items-center px-3">
              <SearchIcon className="w-5 h-5" />
            </span>
            <input placeholder="Search photo" type="text" className="border w-full rounded-2xl bg-gray-100 focus:outline-none focus:ring-0 pl-11 py-2 text-gray-500" />
          </div>
        </form>
      </div>
    </nav>
  )
}

export default Navbar;