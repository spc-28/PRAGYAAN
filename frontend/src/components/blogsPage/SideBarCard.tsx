import { dateFormater, truncateToWordLimit } from "../../utils";

export default function SideBarCard({ blog }: { blog: any }) {

    return (
        <div className="flex gap-5 w-full mt-8 h-[13rem]">
            <div className="overflow-hidden w-[45%] flex border-0 rounded-xl">
                {blog.thumbnail?<img className="object-fill w-full" src={blog.thumbnail}></img>:<div className="self-center mx-24">No Image</div>}
            </div>
            <div className="w-[50%] mt-2 flex flex-col gap-4">
                <p className="text-xl max-mac:text-lg font-bold">{truncateToWordLimit(blog.title, 7)}</p>
                <p className="opacity-60 max-mac:text-[0.9rem] min-h-[5.4rem] max-mac:min-h-[6.2rem]">{truncateToWordLimit(blog.description, 9)}
                </p>
                <div className="flex items-center gap-2 opacity-60">
                    <div className="flex size-12 rounded-full border-2 max-mac:size-8 overflow-hidden"><img src={blog.author.profile}></img></div>
                    <p className="font-semibold max-mac:text-[0.8rem]">{blog.author.firstName}</p>
                    <p className="max-mac:text-[0.8rem]">&bull;</p>
                    <p className="max-mac:text-[0.8rem]">{dateFormater(blog.createdAt)}</p>
                </div>
            </div>
        </div>
    )
}