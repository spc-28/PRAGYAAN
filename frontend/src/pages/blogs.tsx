import BlogCard from "../components/blogsPage/BlogCard";
import Appbar from "../components/utils/Appbar";
import { useBlogs } from "../hooks";
import { Spinner } from "../components/utils/spinner";
import { SquarePen } from "lucide-react";
import SearchBar from "../components/blogsPage/searchBar";
import BlogsHeader from "../components/blogsPage/BlogsHeader";
import SideBar from "../components/blogsPage/SideBar";

export default function Blogs() {

    const { loading, blogs } = useBlogs();

    if (loading) {
        return <Spinner />
    }
    return <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Appbar label="New">
            <SquarePen />
        </Appbar>
        <div className="flex mr-10 max-sm:mr-4 h-screen">
            <div className="flex-col mt-12 px-10 max-sm:px-4 h-full w-[72%] max-xl:w-full">
                <SearchBar />
                <BlogsHeader />
                <div className="overflow-scroll h-full pb-[20rem]">
                    {blogs.map((blog, i) => <BlogCard profile={blog.author.profile} description={blog.description} title={blog.title} imgSrc={blog.thumbnail} name={blog.author.firstName} read={blog.minuteRead} id={blog.id} date={blog.createdAt} />)}
                </div>
            </div>
            <div className="w-[28%] border-l-2 max-xl:hidden">
                <SideBar />
            </div>
        </div>
    </div>
}