import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useRecoilValue } from 'recoil';
import { user } from '../../recoil/atoms';

export default function Icons({ id } : { id:string }) {
    const [state, setState] = useState(false);
    const userData = useRecoilValue(user);

    const index = userData.bookMarks?.some((e)=> e.id == id);


    const bookmarkHandler = async () => {
        setState((p) => !p)
        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog/addBookmark`, {
                id: id
            },
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                });

        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='flex gap-6'>
            <div style={{ cursor: 'pointer' }} onClick={bookmarkHandler}>{index || state ? <BookmarkIcon /> : <BookmarkAddOutlinedIcon />}</div>
        </div>
    )

}