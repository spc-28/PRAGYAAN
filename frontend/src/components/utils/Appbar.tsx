import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../recoil/atoms";

export default function Appbar({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {

    const nav = useNavigate();

    const userData = useRecoilValue(user);

    const menuHandler = (index: number) => {
        if (index == 0) {
            nav('/posts');
        }
        else if (index == 1) {
            nav('/bookmarks');
        }
        else {
            localStorage.removeItem("token");
            nav('/signIn');
        }
    }

    const [menu, setMenu] = useState(false);

    return <div className="flex  mt-2 py-2 flex-col border-b-[2.5px] border-zinc-200">
        <div className="flex justify-between items-center">
            <Link to="/blogs"><p className="ml-6 text-3xl mb-2 cursor-pointer max-sm:text-xl font-robotoCondensed font-bold">PRAGYAAN</p></Link>
            <div className="flex items-center gap-20 max-sm:gap-0.5">
                <Link to={label === "New" ? "/publish" : ""}> <button onClick={onClick} type="button" className="text-white flex gap-3 bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-2xl text-mg max-sm:text-sm px-5 py-2.5 max-sm:px-4 max-sm:py-1.5 text-center me-2 mb-2">{children}{label}</button></Link>
                <div onClick={() => { setMenu((p) => !p) }} className="cursor-pointer rounded-full border mx-6 mb-2.5 size-[3.7rem] max-sm:size-[2.5rem] overflow-hidden "><img className="object-contain w-full h-full" src={userData.profile} ></img>
                    {menu ? <div className="flex flex-col py-1 z-50 items-center justify-between absolute w-28 h-32 border-2 right-6 mt-3 bg-white rounded-xl">
                        {["Posts", "Bookmarks", "Log out"].map((i, index) => <p onClick={() => menuHandler(index)} className="hover:bg-zinc-100 w-full text-center py-2 font-semibold cursor-pointer">{i}</p>)}
                    </div> : ""}
                </div>
            </div>
        </div>
    </div>
}