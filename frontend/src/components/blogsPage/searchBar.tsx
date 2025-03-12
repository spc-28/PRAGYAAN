export default function SearchBar() {
    return (
        <div className="flex items-center gap-4">
            <div className="w-[30%] max-sm:w-full">
                <form className="max-w-md mx-auto">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-slate-200 border border-gray-300 rounded-2xl"
                            placeholder="Search Technology, Sports..."
                            required
                        />
                        {/* <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-zinc-800 hover:bg-zinc-900 focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-4 py-2 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:focus:ring-zinc-900"
                        >
                            Search
                        </button> */}
                    </div>
                </form>
            </div>
            <div className="flex items-center ml-6 max-sm:hidden">
                <p className="font-poppins text-xl max-xl:text-lg font-medium text-zinc-400"> Trending:</p>
                    <div className="flex gap-5 ml-5">
                       {["Design", "Development","UX","Marketing"].map((e)=>{
                            return(
                                <div className="border-2 px-4 py-2 max-xl:text-sm cursor-pointer  rounded-full bg-zinc-200">
                                    {e}
                                </div>
                            )
                       })}
                    </div>
            </div>
        </div>
    );
}
