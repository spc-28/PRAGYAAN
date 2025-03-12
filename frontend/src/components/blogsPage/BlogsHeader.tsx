import { useState } from "react";

export default function BlogsHeader() {
    const [click, setClick] = useState(false);
    const [option, setOption] = useState<string>("All");
    return (
        <div className="border-b-[3px] flex justify-between items-center px-5 max-sm:px-0 pt-10 pb-6">
            <p className="font-robotoCondensed text-3xl max-sm:text-xl justify-center text-zinc-600 font-medium">
                Articles
            </p>
            <div>
                <button onClick={()=>setClick((p)=>!p)} className="text-zinc-900 flex justify-between bg-white border-2 min-w-36 font-medium rounded-full text-lg max-sm:text-sm px-5 max-sm:px-2 max-sm:min-w-24 py-2.5 max-sm:py-2 text-center  items-center " type="button"><p>{option}</p><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
                </button>
                <div  className={` ${click?"":"hidden"} border-2 border-zinc-300 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm mt-2 ml-10`}>
                    <ul onClick={()=>setClick((p)=>!p)} className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        <li onClick={()=>setOption("All")}>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">All</a>
                        </li>
                        <li onClick={()=>setOption("Following")}>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Following</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}