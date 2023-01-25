import { editInterFace, itemInterface } from "../App"
import Items from "./Items";
export type propType = {
    allTask: itemInterface[],
    DeleteTask: (id: string) => void,
    doneTaskFunction:(id:string)=>void,
    setEditComponent:React.Dispatch<React.SetStateAction<editInterFace>>
   
}
export const formatAMPM = (hours: number, minutes: number): string => {  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hoursValue = hours % 12;
    const hourRate = hoursValue || 12;
    const mintuesValue = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hourRate}:${mintuesValue}${ampm}`;
    return strTime;
};
function CurrentTask({ allTask, DeleteTask,doneTaskFunction,setEditComponent }: propType): JSX.Element {
    return (
        // bg-[#3f3f91]
        <div className="current_task bg-[#080022] rounded-md w-full  mb-1 md:mb-0  h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 pb-2">
                <h1 className="text-[1.3rem] text-[#fff] font-serif text-center py-2 tracking-wider underline">
                Current Tasks
                </h1>
                {
                     allTask.map((item: itemInterface, index: number) => {
                        const month = new Date(item.time).toString().split(" ")[1]
                        const day = new Date(item.time).toString().split(" ")[2]
                        const year = new Date(item.time).toString().split(" ")[3]
                        const [hour, mintues] = new Date(item.time).toString().split(" ")[4].split(":")
                        const value = formatAMPM(Number(hour), Number(mintues))
                        const timeObject = {
                            month, day, year, value
                        }
                        return <Items key={index} item={item} timeObject={timeObject} deleteTaskFunction={DeleteTask} current="current" doneTaskFunction={doneTaskFunction}  setEditComponent={setEditComponent}/>
                    })
                }
            </div>
        </div>
    )
}
export default CurrentTask;
