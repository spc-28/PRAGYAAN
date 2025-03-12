import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Blog {
    "content": string,
    "title": string,
    "id": string,
    "createdAt": string,
    "minuteRead": number,
    "upVotes": number,
    "author": {
        "firstName": string,
        "lastName": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>({
        content: "",
        title: "",
        id: "",
        minuteRead: 0,
        createdAt: "",
        upVotes: 0,
        author: {
            firstName: "",
            lastName: "",
        },
    });

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setBlog(res.data.blog);
            console.log(res.data.blog)
            setLoading(false);
        })
    }, [id])

    return {
        loading,
        blog
    }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }

}