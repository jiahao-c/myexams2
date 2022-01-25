import awsconfig from '@/aws-exports';
import { Amplify } from '@aws-amplify/core';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import 'virtual:windi.css';
import { Navbar } from './components/NavBar';
import { Admin } from './pages/Admin';
import { Home } from './pages/Home';

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
