import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './pages/blogPage';
import SignIn from './pages/signIn';
import { SignUp } from './pages/signUp';
import { ToastContainer } from 'react-toastify';
import Blogs from './pages/blogs';
import Publish from './pages/Publish';
import Posts from './pages/Posts';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchStatus, user } from './recoil/atoms';
import { BACKEND_URL } from './config';
import axios from 'axios';
import { useEffect } from 'react';
import Bookmarks from './pages/Bookmarks';

function App() {

  const userState = useSetRecoilState(user);
  const status = useRecoilValue(fetchStatus);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => {
            userState(res.data);
        })
    }, [status])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App


