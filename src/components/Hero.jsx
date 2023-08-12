import {logo} from "../assets"
import {AiFillGithub} from "react-icons/ai"

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center  w-full mb-10 pt-3 ">
            <img src={logo} alt="sumz logo"  className="w-28 object-contain"/>
            <button 
            type="button" 
            onClick={()=>window.open('https://github.com/aadil494')} 
            className="black_btn">

               <AiFillGithub  />

            </button>
        </nav>
        <h1 className="head_text">
            Summarize Articles with <br className="max-md:hidden"  />
            <span className="orange_gradient">OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
            Simplify your reading with Summize, an open-source summarization tool powered by OpenAI GPT-4.
        </h2>
    </header>
  )
}

export default Hero