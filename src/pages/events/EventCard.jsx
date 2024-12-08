import React from "react";
const EventCard = (props) => {
    return (
        <div class="card w-[261px] gap-[20px] flex flex-col items-center justify-between relative group overflow-hidden shadow-xl border-[1px]  py-[20px] rounded-xl px-[20px] ">
             <img src={props.image}/>
             <h3>{props.title}</h3>
             <p  className="overflow-hidden text-ellipsis  line-clamp-2 text-center">
                {props.Description}
             </p>
            <div className="handlebuttons flex gap-3">
                <button className="bg-green-600 text-white p-[5px] w-[50px] rounded-md">View</button>
                <button className="bg-red-600 text-white p-[5px] w-[70px] rounded-md">Delete</button>
                <button className="bg-blue-600 text-white p-[5px] w-[70px] rounded-md">Edit</button>
            </div>

          </div>
    )
};
export default EventCard;