import React, { useState } from "react"
import blogService from "../services/blogs"

const CreateBlog = ({ updateBlog, setError, setMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const data = await blogService.createBlog({
        title,
        author,
        url,
      })

      updateBlog(data)
      setTitle("")
      setAuthor("")
      setUrl("")

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
    <div className="my-3">
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
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
      </form>
    </div>
  )
}

export default CreateBlog
