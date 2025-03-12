import Appbar from "../components/utils/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BookPlus } from "lucide-react";
import TextEditor from "../components/utils/Editor";
import { useState } from "react";
import Input from "../components/utils/input";
import { useSetRecoilState } from "recoil";
import { fetchStatus } from "../recoil/atoms";


export default function Publish() {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [title, setTitle] = useState("");
    const setStatus = useSetRecoilState(fetchStatus);

    const onClick = async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content: data
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        setStatus((p) => !p);
        navigate(`/blogs/${res.data.id}`);
    }

    return <div className="m-0">
        <Appbar onClick={onClick} label="Publish">
            <BookPlus />
        </Appbar>
        <div className="ml-4">
            <Input ph="Title" size="w-[90%]" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="h-24 mt-4 px-4 w-[90%]">
            <label className="block mb-2 text-lg font-semibold text-gray-900" for="file_input">Upload Thumbnail</label>
            <input onChange={(e)=>console.log(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file"></input>
        </div>
        <TextEditor onChange={setData} />
    </div>
}