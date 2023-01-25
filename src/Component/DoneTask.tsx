import { editInterFace, itemInterface } from "../App";
import { formatAMPM } from "./CurrentTask";
import Items from "./Items";
type propType = {
    doneTask: itemInterface[],
    doneTaskFunction: (id: string) => void,
    setEditComponent: React.Dispatch<React.SetStateAction<editInterFace>>,
    // allTask: itemInterface[],
    // setAllDoneTask: React.Dispatch<React.SetStateAction<itemInterface[]>>,
    // setAllTask: React.Dispatch<React.SetStateAction<itemInterface[]>>
}
function DoneTask({ doneTask, setEditComponent,doneTaskFunction}: propType) {
    function DeleteTaskFunc(id: string) {
        return
    }
    return (
        <div className="done_task bg-[#0c6101] rounded-md w-full mb-1 md:mb-0 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 pb-2">
                <h1 className="text-[1.3rem] text-[#fff] font-serif text-center py-2 tracking-wider underline select-none">
                    Done Tasks
                </h1>
                {
                    doneTask && doneTask.map((item, index) => {
                        const month = new Date(item.time).toString().split(" ")[1]
                        const day = new Date(item.time).toString().split(" ")[2]
                        const year = new Date(item.time).toString().split(" ")[3]
                        const [hour, mintues] = new Date(item.time).toString().split(" ")[4].split(":")
                        const value = formatAMPM(Number(hour), Number(mintues))
                        const timeObject = {
                            month, day, year, value
                        }
                        return <Items item={item} timeObject={timeObject} doneTaskFunction={doneTaskFunction} current="done" deleteTaskFunction={DeleteTaskFunc} setEditComponent={setEditComponent} />
                    })
                }
            </div>
        </div>
    )
}
export default DoneTask;