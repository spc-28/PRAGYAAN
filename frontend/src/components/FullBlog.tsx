import { SquarePen } from "lucide-react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Appbar from "./utils/Appbar"
import { useEffect, useRef, useState } from "react";
import Icons from "./utils/icons";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { dateFormater } from "../utils";

interface PropType {
    title: string,
    content: string;
    name: string;
    date: string;
    lastName: string;
    id: string;
    upVotes: number;
}


export default function FullBlog(props: PropType) {
    const content = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<number>();

    const upvoteHandler = async () => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/v1/blog/addLike`, {
                id: props.id
            },
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                });
            setData(res.data.updatedPost.upVotes);

        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setData(props.upVotes);

        if (content.current) {
            content.current.innerHTML = props.content;
        }
    }, [])

    return <div className="overflow-hidden">
        <Appbar label="New">
            <SquarePen />
        </Appbar>
        <div className="flex h-screen">
            <div className="flex flex-col gap-6 mx-4 mt-4 max-lg:w-screen w-[70%] overflow-scroll">
                <p className="text-5xl font-bold max-sm:text-4xl">{props.title}</p>
                <div className="self-end w-fit flex gap-8 mr-6">
                    <Icons id={props.id} />
                    <PlayArrowIcon className="cursor-pointer" />
                    <div className="flex gap-2">
                        <ArrowCircleUpIcon onClick={upvoteHandler} className="cursor-pointer" />
                        <span>{data}</span>
                    </div>

                </div>
                <div className="!all-revert" ref={content}></div>
                <p className="text-xl font-bold opacity-50">{`Posted on ${dateFormater(props.date.replace('T', ' ').replace('Z', ''))}`}</p>
            </div>
            <div className="w-[30%] border-l-4 border max-lg:hidden flex flex-col items-center pt-4 gap-4">
                <p className="font-semibold text-3xl">Author</p>
                <div className="text-6xl border-4 border-gray-400 rounded-full size-20 flex justify-center items-center">{props.name[0].toUpperCase()}</div>
                <p className="text-lg font-semibold">{props.name.toUpperCase()}&nbsp;&nbsp;{props.lastName.toUpperCase()}</p>
            </div>
        </div>
    </div>
}