import React, { useState } from "react"
import blogService from "../services/blogs"

const CreateBlog = ({ addBlog, setError, setMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [show, setShow] = useState(false)

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const data = await blogService.createBlog({
        title,
        author,
        url,
      })

      addBlog(data)
      setTitle("")
      setAuthor("")
      setUrl("")
      setShow(false)

      setMessage(`A new blog ${data.title} by ${data.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage("Can't create the blog!")
      setTimeout(() => {
        setError(false)
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      {!show ? (
        <button onClick={() => setShow(true)}>New Blog</button>
      ) : (
        <form onSubmit={createBlog} className="my-3">
          <h2>Create New</h2>
          <div>
            title
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
          <button onClick={() => setShow(false)}>cancel</button>
        </form>
      )}
    </div>
  )
}

export default CreateBlog
