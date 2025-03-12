import { useRecoilValue } from "recoil";
import { user } from "../recoil/atoms";
import BlogCard from "../components/blogsPage/BlogCard";
import Appbar from "../components/utils/Appbar";
import { SquarePen } from "lucide-react";

export default function Posts() {

    const userData = useRecoilValue(user);

    return (
        <div className="flex flex-col h-screen w-screen">
            <Appbar label="New">
                <SquarePen />
            </Appbar>
            <div className="mx-12 mt-1">
                {userData.posts?.map((blog, i) => <BlogCard profile={userData.profile} description={blog.description} key={i} title={blog.title} imgSrc={blog.thumbnail} name={userData.firstName} read={blog.minuteRead} id={blog.id} date={blog.createdAt} />)}
            </div>
        </div>
    )
}