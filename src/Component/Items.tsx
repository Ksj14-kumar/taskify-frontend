import { MdDelete, MdEdit, MdDone, MdAccessAlarm } from "react-icons/md";
import { editInterFace, itemInterface } from "../App";
type propType = {
    item: itemInterface,
    timeObject: { month: string, day: string, year: string, value: string },
    deleteTaskFunction: (id: string) => void,
    doneTaskFunction: (id: string) => void,
    current: string,
    setEditComponent:React.Dispatch<React.SetStateAction<editInterFace>>
}
function Items({ item, timeObject, deleteTaskFunction, current, doneTaskFunction,setEditComponent }: propType) {
    return (
        <>
            
            <div key={item.taskId} className={`task_list w-full text-center  ${current === "delete" ? "bg-[#090909c7]" : current === "done" ? "bg-[#058c08]" : "bg-[#15579d]"} my-2 py-2 rounded-md font-sans text-[1.2rem] ${current === "delete" ? "flex-col" : "flex"}  justify-evenly  items-center shadow-xl overflow-hidden relative`}>
                {current === "delete" && <div className="line_container  w-full relative flex-col  gap-y-2 justify-center justify-items-center py-2">
                    <div className="line bg-[#c5bebe65] w-full absolute h-[.1rem] py-1 mt-3 font-medium text-[#f00817]">X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X</div>
                    {
                        ["mt-6", "mt-9", "mt-12", "mt-15"].map((item, index) => {
                            return <div key={index} className={`line bg-[#c5bebe65] w-full absolute h-[.1rem] py-1 ${item} `}></div>
                        })
                    }
                </div>}
                <div className="text_items  flex-[8] select-none">
                    {/* <h1 className="text-[1.3rem] font-bold text-[#ffffff] flex justify-start indent-3">Task</h1> */}
                    <div className="flex flex-wrap break-words px-1 text-[#fff] indent-2 overflow-hidden break-all p-2">{item.task}</div>
                    <div className="time_container  flex justify-start">
                        <span className="text-[.9rem] flex justify-center indent-3 text-[#ccc3c3]">{timeObject.day}. {timeObject.month}. {timeObject.year},{timeObject.value}</span>
                    </div>
                </div>
                {current === "current" && <div className="icons_container ">
                    <div className="container_icons flex justify-end flex-[2] py-[.3rem] ml-2">
                        <div className="delete_button bg-red-600 rounded-full p-[.3rem] cursor-pointer flex justify-center align-middle items-center mr-3"
                            onClick={() => {
                                current==="current"&& deleteTaskFunction(item.taskId)
                            }}
                        >
                            <MdDelete className="text-[1.4rem] font-semibold text-[#fff]" />
                        </div>
                        <div className="delete_button bg-[#0820d4] rounded-full p-[.3rem] cursor-pointer flex justify-center align-middle items-center mr-2"
                            onClick={() => {
                              current==="current"&&  setEditComponent({state:true,taskId:item.taskId,text:item.task})
                            }}
                        >
                            <MdEdit className="text-[1.4rem] font-semibold text-[#fff] " />
                        </div>
                        <div className="delete_button bg-[#15b004] rounded-full p-[.3rem] cursor-pointer flex justify-center align-middle items-center mr-2"
                            onClick={() => {
                               
                                current==="current"&&doneTaskFunction(item.taskId)
                            }}
                        >
                            <MdDone className="text-[1.4rem] font-semibold text-[#fbfbfb] " />
                        </div>
                    </div>
                    <div className="bottom_container flex justify-center">
                        <div className="delete_button w-[1.8rem] h-[1.8rem] bg-[#888988] rounded-full p-[.1rem] flex cursor-pointer  justify-center align-middle items-center mr-2">
                            <MdAccessAlarm className="text-[1.2rem] font-semibold text-[#fbfbfb] " />
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}
export default Items