import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import HeaderLayout from './components/HeaderLayout'
import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import Admin from './pages/Admin';
import Home from './pages/Home';
import { HomeBodyLayout } from './components/HomeBodyLayout';
import { AdminBodyLayout } from './components/AdminBodyLayout';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route element={<HomeBodyLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="admin" element={<AdminBodyLayout />} >
            <Route index element={<Admin />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
