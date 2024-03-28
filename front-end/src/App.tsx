import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/chat.page';
import LoginPage from './pages/login.page';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserPage from './pages/user.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/' element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
