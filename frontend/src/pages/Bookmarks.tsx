import { SquarePen } from "lucide-react";
import { useRecoilValue } from "recoil";
import Appbar from "../components/utils/Appbar";
import { user } from "../recoil/atoms";
import BlogCard from "../components/blogsPage/BlogCard";

export default function Bookmarks() {

    const userData = useRecoilValue(user);
    console.log(userData);

    return (
        <div className="flex flex-col h-screen w-screen">
            <Appbar label="New">
                <SquarePen />
            </Appbar>
            <div className="mx-12 mt-1">
                {userData.bookMarks?.map((blog, i) => <BlogCard profile={blog.author.profile} description={blog.description} key={i} title={blog.title} imgSrc={blog.thumbnail} name={blog.author.firstName} read={blog.minuteRead} id={blog.id} date={blog.createdAt} />)}
            </div>
        </div>
    )
}