import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJokes } from "./helper/apiCalls";
import {BiLoaderAlt} from 'react-icons/bi'

function App() {
  const [currentJoke,setCurrentJoke] = useState(undefined)
  const [jokesCategories,setJokesCategories] = useState([])
  const [blacklistFlags,setBlacklistFlags] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    setIsLoading(true)
    getJokes({
      categories: jokesCategories.length > 0 ? jokesCategories.join(',') : 'any',
      blacklistFlags: blacklistFlags.length > 0 ? blacklistFlags.join(',') : 'sexist'
    }).then(data=>{
      if(data.error || !data.setup){
        setIsLoading(false)
        return toast.error("Faild to get joke!",{theme: 'colored'})
      }
      setIsLoading(false)
      setCurrentJoke(data)
    }).catch(err=>{
      console.log(err);
      setIsLoading(false)
      return toast.error("Faild to get joke!",{theme: 'colored'})
    })
  }

  const handleCategory = event => {
    if(event.target.checked){
      setJokesCategories(prev => [...prev,event.target.value])
    }else{
      setJokesCategories(prev => prev.filter(elm => elm !== event.target.value))
    }
  }

  const handleBlacklist = event => {
    if(event.target.checked){
      setBlacklistFlags(prev => [...prev,event.target.value])
    }else{
      setBlacklistFlags(prev => prev.filter(elm => elm !== event.target.value))
    }
  }

  useEffect(()=>{
    getJokes({
      categories: 'any',
      blacklistFlags: 'sexist'
    }).then(data=>{
      if(data.error || !data.setup){
        return toast.error("Faild to get joke!",{theme: 'colored'})
      }
      setCurrentJoke(data)
    }).catch(e=>{
      console.log(e);
      return toast.error("Faild to get joke!",{theme: 'colored'})
    })
  },[])

  return (
    <div className="homepage">
        <header className="header" >Random Jokes</header>

        <section className="jokesContainer">
          <div className="theJoke">
            <p className="setup">"{currentJoke && currentJoke.setup}"</p>
            <p className="delivery">"{currentJoke && currentJoke.delivery}"</p>
          </div>

          <div className="jokesFilter">
             <div className="jokesCategories">
              <h1 className="filterTitle">Categories</h1>
              <div className="filterWrapper">
                <div>
                  <input onChange={e=>handleCategory(e)} value='pun' type='checkbox' />
                  <h2>Pun</h2>
                </div>

                <div>
                  <input onChange={e=>handleCategory(e)} value='dark' type='checkbox' />
                  <h2>Dark</h2>
                </div>

                <div>
                  <input onChange={e=>handleCategory(e)} value='spooky' type='checkbox' />
                  <h2>Spooky</h2>
                </div> 

                <div>
                  <input onChange={e=>handleCategory(e)} value='programming' type='checkbox' />
                  <h2>Programming</h2>
                </div>     

                <div>
                  <input onChange={e=>handleCategory(e)} value='misc' type='checkbox' />
                  <h2>Misc</h2>
                </div>     
              </div>

             </div>

              <div className="jokesBlacklist">
                <h1 className="filterTitle">Blacklist</h1>
                <div className="filterWrapper">
                  <div>
                    <input onChange={e=>handleBlacklist(e)} value='nsfw' type='checkbox' />
                    <h2>NSFW</h2>
                  </div>

                  <div>
                    <input onChange={e=>handleBlacklist(e)} value='religious' type='checkbox' />
                    <h2>Religious</h2>
                  </div>

                  <div>
                    <input onChange={e=>handleBlacklist(e)} value='political' type='checkbox' />
                    <h2>Political</h2>
                  </div>

                  <div>
                    <input onChange={e=>handleBlacklist(e)} value='racist' type='checkbox' />
                    <h2>Racist</h2>
                  </div>

                  <div>
                    <input onChange={e=>handleBlacklist(e)} value='explicit' type='checkbox' />
                    <h2>Explicit</h2>
                  </div>                  
                </div>

              </div>
          </div>

          <button className="getJokeButton" onClick={handleClick}>{isLoading ? (<BiLoaderAlt className="spin" />) : ("Get New Joke")}</button>
        </section>
    </div>
  );
}

export default App;
