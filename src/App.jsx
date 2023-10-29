import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import LoginBox from "./components/LoginBox"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  const updateBlog = (blog) => {
    setBlogs(blogs.concat([blog]))
  }

  const logout = async () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem("loginData")
  }

  return user === null ? (
    <div>
      <h2>Log in to application</h2>
      {message && <Notification message={message} error={error} />}
      <LoginBox setUser={setUser} setMessage={setMessage} setError={setError} />
    </div>
  ) : (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} error={error} />}
      <CreateBlog
        updateBlog={updateBlog}
        setMessage={setMessage}
        setError={setError}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default App
