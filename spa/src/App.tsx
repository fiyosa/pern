import './styles/global.css'
import Layout from './components/layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/404'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import Blog from './pages/blog/Blog'
import BlogsCreate from './pages/blog/BlogCreate'
import ViewBlogs from './pages/admin/ViewBlogs'
import ViewUsers from './pages/admin/ViewUsers'
import BlogDetail from './pages/blog/BlogDetail'
import BlogEdit from './pages/blog/BlogEdit'
import ViewCategories from './pages/admin/ViewCategories'
import ViewCategoriesCreate from './pages/admin/ViewCategoriesCreate'
import ViewCategoriesEdit from './pages/admin/ViewCategoriesEdit'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route
              path="/blogs/:paramId"
              element={<BlogDetail url="/blogs" />}
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* My Blog */}
            <Route path="/my-blogs" element={<Blog />} />
            <Route path="/my-blogs/:paramId" element={<BlogDetail />} />
            <Route path="/my-blogs-edit/:paramId" element={<BlogEdit />} />
            <Route path="/my-blogs-create" element={<BlogsCreate />} />

            {/* Admin Blog */}
            <Route path="/view-blogs" element={<ViewBlogs />} />
            <Route
              path="/view-blogs/:paramId"
              element={<BlogDetail url="/view-blogs" />}
            />
            <Route
              path="/view-blogs-edit/:paramId"
              element={<BlogEdit url="/view-blogs" />}
            />

            {/* Admin Check User */}
            <Route path="/view-users" element={<ViewUsers />} />

            {/* Admin Manage Categories */}
            <Route path="/view-categories" element={<ViewCategories />} />
            <Route
              path="/view-categories-create"
              element={<ViewCategoriesCreate />}
            />
            <Route
              path="/view-categories-edit/:paramId"
              element={<ViewCategoriesEdit />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
