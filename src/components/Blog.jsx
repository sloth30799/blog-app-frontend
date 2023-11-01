import { useState } from "react"
import PropTypes from "prop-types"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [details, setDetails] = useState(false)

  return (
    <div className="blog" style={blogStyle}>
      {!details ? (
        <div>
          {blog.title} {blog.author}
          <button className="show-btn" onClick={() => setDetails(true)}>
            show
          </button>
        </div>
      ) : (
        <div>
          <p>
            {blog.title} {blog.author}
            <button onClick={() => setDetails(false)}>show</button>
          </p>
          <a href="#">{blog.url}</a>
          <p>
            {blog.likes}
            <button className="like-btn" onClick={() => updateBlog(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button onClick={() => deleteBlog(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
