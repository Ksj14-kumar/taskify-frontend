import { editInterFace, itemInterface } from "../App"
import TaskContainer, { formatAMPM } from "./CurrentTask"
import { propType } from "./CurrentTask"
import Items from "./Items"
type deletedProp = {
    deletedTask: itemInterface[],
    allTasks: itemInterface[],
    deleteTaskFunc: (id: string) => void,
    setEditComponent:React.Dispatch<React.SetStateAction<editInterFace>>
}
function DeletecTasks({ deletedTask, allTasks, deleteTaskFunc,setEditComponent }: deletedProp) {
    function DeleteTask(id: string) {
        return
    }
    function doneTaskFunction( id: string ) {
        return
    }
    return (
        <div className="deleted_task bg-[#850303] rounded-md w-full  md:mb-0  h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 pb-2">
                <h1 className="text-[1.3rem] text-[#fff] font-serif text-center py-2 tracking-wider underline select-none">
                    Deleted Tasks
                </h1>
                {
                    deletedTask.sort((a, b) => Date.parse((`${b.time}`)) - Date.parse(`${a.time}`)) && deletedTask.map((item, index) => {
                        const month = new Date(item.time).toString().split(" ")[1]
                        const day = new Date(item.time).toString().split(" ")[2]
                        const year = new Date(item.time).toString().split(" ")[3]
                        const [hour, mintues] = new Date(item.time).toString().split(" ")[4].split(":")
                        const value = formatAMPM(Number(hour), Number(mintues))
                        const timeObject = {
                            month, day, year, value
                        }
                        return <Items key={index} item={item} timeObject={timeObject} deleteTaskFunction={deleteTaskFunc} current="delete" doneTaskFunction={doneTaskFunction} setEditComponent={setEditComponent} />
                    })
                }
            </div>
        </div>
    )
}
export default DeletecTasks;