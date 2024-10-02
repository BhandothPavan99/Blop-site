import { HiOutlineArrowCircleUp } from "react-icons/hi";
export default function ScrollToTopButton() {
 const scrollToTop = ()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
 }
 return(
   <div className="flex justify-end items-center">
      <HiOutlineArrowCircleUp className="text-3xl text-gray-500 cursor-pointer" onClick={scrollToTop}/>
      <p className="text-xs">return to top</p>
      </div>
 )
}