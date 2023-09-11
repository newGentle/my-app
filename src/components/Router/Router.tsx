import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { MainPage } from '../MainPage/MainPage';
import { Post } from '../Post/Post';

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/:id' element={<Post />} />
    </Routes>
  )
}

export { Router }