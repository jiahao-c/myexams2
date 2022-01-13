import ReactDOM from 'react-dom'
import Navbar from './components/NavBar'
import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '@/aws-exports';
import 'virtual:windi.css'

Amplify.configure(awsconfig);

ReactDOM.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Invalid URL</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
