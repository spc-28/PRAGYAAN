import { useRecoilValue } from "recoil";
import SideBarCard from "./SideBarCard";
import { user } from "../../recoil/atoms";

export default function SideBar() {

    const userData = useRecoilValue(user);
    return(
        <div className="flex flex-col items-center gap-24 h-full w-full ml-4 max-xl:hidden">
            <div className=" flex w-[90%] h-[20%] min-h-fit border-0 mt-10 p-8 justify-between rounded-3xl bg-zinc-100/55 overflow-clip">
                <div className="flex flex-col justify-between w-[71%] px-3 font-poppins">
                    <div className="flex flex-col font-[600] tracking-wider gap-y-2 max-mac:gap-y-2">
                        <p className="text-wrap max-mac:text-[0.9rem] text-2xl leading-tight">Engage thoughtfully with the author about the article<br></br><span className="opacity-35 font-normal max-mac:text-[0.6rem] text-lg">Plans starting at less than &#8377;99/month</span></p>
                    </div>
                    <button className="border-2  mr-4 px-6 py-3 max-mac:mt-4 w-[78%] max-3xl:text-sm text-xl bg-zinc-200/90 rounded-2xl">Comming Soon!</button>
                </div>
                <div className="flex w-[29%] mt-2 rounded-xl border-0 overflow-hidden">
                    <img className="object-contain" src="https://res.cloudinary.com/dd8vmqvqp/image/upload/v1741456971/gii-removebg-preview_ly8q84.png"></img>
                </div>
            </div>
            <div className="w-[90%] h-full">
                <p className="text-[2.5rem] font-[600]">My reading list</p>
                <div className="flex flex-col gap-6 overflow-scroll h-[32rem]">
                    {userData.bookMarks?.map((blog, i)=><SideBarCard blog={blog}></SideBarCard>)}
                </div>
            </div>
        </div>
    )
}