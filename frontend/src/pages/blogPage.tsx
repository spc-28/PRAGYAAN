import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/utils/spinner";

export default function Blog(){
    const {id}= useParams();

    const {loading, blog}= useBlog({id: id || ""});
    if(loading){
        return <Spinner/>
    }
    return <div className="overflow-hidden">
         <FullBlog id={id || ""} upVotes={blog.upVotes} title={blog.title} name={blog.author.firstName} content={blog.content} date={blog.createdAt} lastName={blog.author.lastName} />
    </div>
}