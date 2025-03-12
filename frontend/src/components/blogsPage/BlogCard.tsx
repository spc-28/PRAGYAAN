import { Link } from "react-router-dom";
import Icons from "../utils/icons";

interface PropsType{
    title: string,
    name: string,
    id: string,
    read: number,
    date: string,
    imgSrc: string,
    description: string,
    profile: string

}

function dateFormater(timestamp: string): string{
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('default', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return formattedDate;
}

export default function BlogCard(props: PropsType){

    return <div className="mx-2 flex flex-col gap-3 mt-10 border-b-2 border-zinc-300 pb-5" >
        <div className="flex gap-2.5 items-center text-xl ">
            <div className="rounded-full border-0 flex size-8 overflow-hidden"><img src={props.profile}></img></div>
            <p className="font-semibold ">{props.name}&nbsp;<span className="font-semibold opacity-50">&#x2022; {dateFormater(props.date.replace('T', ' ').replace('Z', ''))}</span></p>
        </div>
        <div className="flex justify-between">
            <div className="flex flex-col w-[72%]">
                <Link className="w-fit" to={`/blogs/${props.id}`}> <p style={{cursor: 'pointer'}}className="font-bold text-2xl">{props.title}</p></Link>
                <p className="opacity-40 text-lg pt-4">{props.description}</p>
            </div>
            <div className="flex w-[22%] h-48 border-0 rounded-2xl overflow-hidden">
                {props.imgSrc?<img className="w-full object-fill" src={props.imgSrc}></img>:<div className="self-center mx-28">No Image</div>}
            </div>
       </div>
        <div className="mt-6 flex justify-between">
            <p className="font-semibold opacity-50">{props.read} min read</p>
            <Icons id={props.id}/>
        </div>
    </div>
}