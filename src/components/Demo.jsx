import {useState, useEffect} from 'react'
import {copy, linkIcon , loader, tick} from "../assets"
import { useLazyGetSummaryQuery } from '../services/article'
import {MdError} from "react-icons/md"
const Demo = () => {
  const [article, setArticle] = useState({
    url:"",
    summary:""
  })
  const [allArticles,setAllArticles] = useState([])

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState(false)
  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"))
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(article)
    let data = await getSummary({
      articleURL:article.url
    })
    data = data.data;

    if(data?.summary){
      const newArticle = {...article, summary:data.summary}
      setArticle(newArticle);
      console.log(newArticle)
      
      const updatedArticles = [newArticle, ...allArticles]
      
      setAllArticles(updatedArticles)
      

      localStorage.setItem("articles", JSON.stringify(updatedArticles))

      
    }
  }
  const handleCopy  = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(()=>{
      setCopied(false)
    }, 3000)
  }
  return (
    <section className="mt-16 w-full max-w-xl">

      {/* Search  */}
      <div className="flex flex-col w-full gap-2">
        <form onSubmit={handleSubmit} className="relative flex justify-center items-center">
          <img 
          src={linkIcon} 
          alt="link icon" 
          className = "absolute left-0 my-2 ml-3 w-5"
          />

          <input 
          type="url"
          placeholder="Enter URL"
          value={article.url}

          onChange={(e)=>setArticle({...article, url:e.target.value})}
          required
          className = "url_input peer"
          
          />
          <button 
          type = "submit" 
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "> ↵  </button>
        </form>
        
        {/* Browser URL HISTORY  */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {
              allArticles.map((article, index)=>(
                <div 
                key={`link-${index}`}
                onClick={()=>setArticle(article)}
                className="link_card">
                  <div 
                  className="copy_btn"
                  onClick={()=>handleCopy(article.url)}
                  >
                    <img 
                    src={copied == article.url ? tick : copy} 
                    alt="copy icon" className='w-[40%] h-[40%] object-contain' />
                  </div>
                  <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                      {article.url}
                  </p>
                </div>
              ))
            }
        </div>
      </div>

      {/* Display results  */}

      <div className=" my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ): error ? (
          <>
          <MdError className='mr-1 text-5xl text-red-700' />
          <p className="text-red-500 text-lg font-medium">Well that was not supposed to happen
          <br />
          <span className='font-satoshi font-normal'>
            {error?.data?.message}
          </span>
          </p>
          </>
          
        ):(article.summary && (
          <div className="flex flex-col gap-3">
            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>Article 
            <span className=' ml-2 blue_gradient'>Summary</span></h2>
            <div className="summary_box">
              <p className='font-inter font-medium text-sm text-gray-700'>
                {article.summary}
              </p>
            </div>
          </div>

        )

        )}
        </div>


    </section>
  )
}

export default Demo