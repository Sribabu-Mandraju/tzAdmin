import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
const RCard = (props) => {
    return(
    <div class="card w-[261px] h-[372px] flex flex-col items-center relative group overflow-hidden shadow-xl border-[1px]  py-[20px] rounded-xl ">
    <img src={props.image} class="h-[195px] w-[195px] border-[5px] border-dotted border-[#fff] rounded-full z-10 group-hover:border-black"/>
    <div class="overlay absolute bottom-0 left-0 right-0 bg-black overflow-hidden w-full h-0 group-hover:h-[250px] transition-all duration-500 ease-in z-0 opacity-[0.3]"></div>
    <div class="team-info w-[261px] h-[278px] py-[10px] mt-[-10px] z-10  flex flex-col items-center justify-end absolute bottom-0 group">
        <h1 class="text-[24px] text-center group-hover:text-white">{props.name}</h1>
        <p class="text-[#787878] text-center group-hover:text-white">{props.profession}</p>
        <div class="media flex justify-center gap-3 m-[20px] mt-[30px] h-[30px] w-[211px]">
            <div class="fb  h-[30px] w-[30px] text-black  group-hover:text-[white]  text-[white] rounded-full flex justify-center items-center"><FaFacebook className="h-full w-full p-[4px]"/></div>
            <div class="twitter  h-[30px] w-[30px] text-black  group-hover:text-[white] text-[white] rounded-full flex justify-center items-center"><FaTwitter className="h-full w-full p-[4px]"/></div>
            <div class="insta  h-[30px] w-[30px] text-black  group-hover:text-[white] text-[white] rounded-full flex justify-center items-center"><IoLogoInstagram className="h-full w-full p-[4px]"/></div>
            <div class="linkedin  h-[30px] w-[30px] text-black  group-hover:text-[white] text-[white] rounded-full flex justify-center items-center"><FaLinkedin className="h-full w-full p-[5px] rounded-full"/></div>
        </div>      
    </div>
</div>
    )
};
export default RCard;