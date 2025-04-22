import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Posts from './pages/Posts';
import Photos from './pages/Photos';
import Todos from './pages/Todos';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#4D4D4F]">
      {/* إذا تبين الهيدر يطلع في كل الصفحات، احذفي !isHomePage */}
      {!isHomePage && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </main>

      {!isHomePage && <Footer />}
    </div>
  );
};

export default App;
