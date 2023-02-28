import { useState } from 'react'
import axios from "axios"

function App() {
  const [form, setForm] = useState()
  const [content, setContent] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e)=>{
    // console.log(e.target.value);
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!form?.topic ){
      setError("Topic field cannot be empty")
      setTimeout(() => {
        setError(false)
      }, 3000)
    }

    try {
      setLoading(true)
      const res = await axios.post("https://real-jade-snail-veil.cyclic.app/content-generator",form)
      setContent(res?.data?.content)
      setLoading(false)

    } catch (error) {
      console.log(error);
      setError([true,"Something went wrong."])
      setTimeout(() => {
        setError(false)
      }, 3000)
      setLoading(false)
    }
  }

  return (
    <div className="App container-fluid">
        <div className='row mb-4 text-center py-5' style={{background:'#33b5e5' }}>
        <p style={{color:'#fafafa',fontSize:'22px'}} className='mb-3'>Boost Your Productivity and Creativity</p>
        <h2 style={{color:'#ffffff'}}>Boost Your Productivity and Creativity: Generate Fresh Content with AI</h2>
      </div>

      <div className='row ps-5'>
        {/* form */}
        <div className='w-35 col-12 col-lg-6'>
    <form>
  <div class="form-group mb-3">
    <label for="topic" class="form-label">Topic</label>
    <input type="text" class="form-control" id="topic" placeholder="Enter topic" onChange={handleChange} required/>
  </div>
  <div class="form-group mb-3">
    <label for="type" class="form-label">Select Content Type</label>
    <select class="form-control" id="type" onChange={handleChange} required>
      <option value="ideas">Idea Generation</option>
      <option value="blog">Blog</option>
      <option value="social media">Social media</option>
      <option value="email">Email</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="length" class="form-label">Length</label>
    <input type="number" class="form-control" id="length" placeholder="Enter length (in words)" onChange={handleChange}/>
  </div>
  <div class="form-group mb-3">
    <label for="tone" class="form-label">Tone</label>
    <input type="text" class="form-control" id="tone" placeholder="Enter tone" onChange={handleChange}/>
  </div>
  <div class="form-group mb-3">
    <label for="audience" class="form-label">Audience</label>
    <input type="text" class="form-control" id="audience" placeholder="Enter audience" onChange={handleChange}/>
  </div>
  <div class="form-group mb-3">
    <label for="keywords" class="form-label">Keywords</label>
    <input type="text" class="form-control" id="keywords" placeholder="Enter keywords" onChange={handleChange}/>
  </div>
  <div class="form-group mb-3">
    <label for="link" class="form-label">Link</label>
    <input type="text" class="form-control" id="link" placeholder="Enter link" onChange={handleChange}/>
  </div>
  <button type="submit" class="btn btn-primary my-3" onClick={handleSubmit}>Generate Content</button>
</form>
    </div>

    {/* output area */}
    <div className='col-12 col-lg-6  border-top border-start border-bottom' style={{position:"sticky",left:"0px"}}>
    {error && (
        <>
        <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
        <div class="alert alert-danger text-center col-lg-4 col-12" role="alert">
        {error}
      </div>
        </div>
      </>
      )
      }
       {
        loading &&(
            <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
        )
      }
      {content && 
      <>
       <h1 className='text-center my-3'>Content</h1>
      <p>{content}</p>
      </>
      }
    </div>

      </div>
    </div>
  )
}

export default App
