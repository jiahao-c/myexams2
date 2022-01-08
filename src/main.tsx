import ReactDOM from 'react-dom'
import HeaderLayout from './components/HeaderLayout'
import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '@/aws-exports';

Amplify.configure(awsconfig);

ReactDOM.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
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
  </BrowserRouter>,
  document.getElementById('root')
)
