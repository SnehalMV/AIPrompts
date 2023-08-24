'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => {
        return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      })}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchPosts, setSearchPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return posts.filter(item => {
      return (
        regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
      )
    })
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(()=>{
        const searchResults = filterPrompts(searchText)
        setSearchPosts(searchResults)
      },300)
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag of Username' value={searchText} onChange={handleSearchChange} className='search_input peer' />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchPosts}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed