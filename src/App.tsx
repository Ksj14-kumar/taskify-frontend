import { useCallback, useRef, useState, useEffect } from "react";
import CurrentTask, { formatAMPM } from "./Component/CurrentTask";
import DoneTask from "./Component/DoneTask";
import DeletecTasks from "./Component/DeletecTasks";
import { v4 } from "uuid"
import { RxCross2 } from "react-icons/rx"
import Login from "./Component/Login";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
export type itemInterface = {
  taskId: string,
  task: string,
  status: string,
  header: string,
  time: number
}
export type editInterFace = {
  taskId?: string,
  state: boolean,
  text?: string
}
export type userInterface = {
  name: string,
  pic: string
}
type userInfo = {
  name: string,
  pic: string,
  userId: string
}
function App(): JSX.Element {
  const [task, setTask] = useState<string>("")
  const [user, setUser] = useState<userInfo>({} as userInfo)
  const [allTask, setAllTask] = useState<itemInterface[]>([])
  const [deletedTask, setAllDeleteTask] = useState<itemInterface[]>([])
  const [doneTask, setAllDoneTask] = useState<itemInterface[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const inputMobile = useRef<HTMLInputElement>(null)
  const [showEditComponent, setEditComponent] = useState<editInterFace>({} as editInterFace)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputMobile.current?.focus()
    }
  }, [])
  const SubmitTask = useCallback(() => {
    async function SubmitTask() {
      try {
        await axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/v1/task/add", {
          id: v4(),
          task,
          status: "not_done",
          header: "",
          time: new Date().getTime(),
          userId: user.userId
        },
          {
            withCredentials: true
          }
        )
      } catch (err) {
        toast.error("Task not add")
      }
      if (task) {
        setAllTask([{
          taskId: `${v4()}`,
          task,
          status: "not_done",
          header: "",
          time: new Date().getTime()
        }, ...allTask])
        setTask("")
      }
    }
    task !== "" && SubmitTask()
    inputRef.current?.focus()
    inputMobile.current?.focus()
  }, [task])
  const handleLogout = async() => {
      try {
        const res=await axios.get(process.env.REACT_APP_BACKEND_DOMAIN + "/api/v1/logout",{withCredentials:true})
        if(res.status==200){
          window.location.reload()
        }
      } catch (err) {
        toast.error("not logout!!!, try again")
      }
  }
  function DeleteTask(id: string) {
    const res = allTask.filter(item => item.taskId != id)
    let findRes = allTask.find(item => item.taskId == id)
    if (findRes) {
      const time = new Date().getTime()
      const month = new Date(time).toString().split(" ")[1]
      const day = new Date(time).toString().split(" ")[2]
      const year = new Date(time).toString().split(" ")[3]
      const [hour, mintues] = new Date(time).toString().split(" ")[4].split(":")
      const value = formatAMPM(Number(
        hour), Number(mintues))
      const timeObject = {
        month, day, year, value
      }
      findRes["status"] = "deleted"
      findRes["time"] = time
      updateTask(user.userId, id, "deleted", time)
      deletedTask && setAllDeleteTask([findRes, ...deletedTask])
    }
    setAllTask(res)
  }
  function DoneTaskFunction(id: string) {
    let res = allTask.filter(item => item.taskId != id)
    const time = new Date().getTime()
    let findRes = allTask.find(item => item.taskId == id)
    updateTask(user.userId, id, "done", time)
    if (findRes) {
      findRes["status"] = "done"
      findRes["time"] = time
      doneTask && setAllDoneTask([findRes, ...doneTask])
    }
    setAllTask(res)
  }
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_DOMAIN + "/api/v1/success", { withCredentials: true })
        if (res.status == 200) {
          window.localStorage.setItem("image", res.data.pic)
          window.localStorage.setItem("name", res.data.name)
          window.localStorage.setItem("userId", res.data.userId)
          setUser(res.data)
          await loadUserTasks(res.data.userId)
        }
      } catch (err) {
        // toast.error("Oop's something error occured")
      }
    }
    load()
  }, [])
  async function loadUserTasks(userId: string) {
    try {
      const res = await axios.get(process.env.REACT_APP_BACKEND_DOMAIN + `/api/v1/task/user/${userId}`, { withCredentials: true })
      if (res.status == 200) {
        const doneTaskList: itemInterface[] = res.data.filter((item: itemInterface) => item.status === "done")
        const notDoneTaskList: itemInterface[] = res.data.filter((item: itemInterface) => item.status === "not_done")
        const deletedTaskList: itemInterface[] = res.data.filter((item: itemInterface) => item.status === "deleted")
        setAllDoneTask(doneTaskList.reverse())
        setAllDeleteTask(deletedTaskList.reverse())
        setAllTask(notDoneTaskList.reverse())
      }
    } catch (err) {
      toast.error("tasks not load, please reload!!!")
    }
  }
  async function updateTask(userId: string, taskId: string, status: string, time: Number) {
    const update = async () => {
      try {
        const res = await axios({
          method: "PUT",
          url: process.env.REACT_APP_BACKEND_DOMAIN + `/api/v1/task/update/${userId}/${taskId}`,
          data: {
            status, time
          },
          withCredentials: true
        })
      } catch (err) {
        toast.error("Task not update")
      }
    }
    await update()
  }
  return (
    <div className="App">
      <div className="wrapper">
        {
          !user.name && !user.pic && !user.userId ? <Login /> :
            <>
              <div className="container1">
                {showEditComponent.state && <EditComponent userId={user.userId} setEditComponent={setEditComponent} showEditComponent={showEditComponent} allTask={allTask} setAllTask={setAllTask} />}
                <header className="task flex justify-between items-center bg-[#13005A] py-3">
                  <main className="name "><p className="text-lg font-serif text-white text-[1.3rem] italic indent-3 tracking-widest">{user && user.name}</p></main>
                  <div className="input_container  flex justify-center tab:hidden untab:visible">
                    <input type="text" ref={inputRef} className="border-[1px]  border-[#dcdcdc] border-solid rounded-md outline-none focus:outline-none pl-2 md:w-[30rem] w-full shadow-md" placeholder="Enter task" name="" onChange={(e) => {
                      setTask(e.target.value)
                    }} id=""
                      value={task}
                    />
                    <button className="focus:outline-none px-3 py-2 bg-blue-300 rounded-md ml-3 font-serif drop-shadow-md" onClick={() => { SubmitTask() }}>Save</button>
                  </div>
                  <div className="image flex justify-end pr-4">
                    <button onClick={handleLogout} className="py-0 px-4 bg-red-500 rounded-md text-center font-serif text-[1rem] tracking-wider mr-5">logout</button>
                    <img src={user && user.pic} alt="" className="rounded-full shrink-0 outline-double outline-2 outline-[#e7dcdc] w-[2.8rem] h-[2.8rem]" />
                  </div>
                </header>
                <div className="input_container  flex justify-center px-3 bg-[#13005A] pb-2 tab:visible untab:hidden">
                  <input type="text" ref={inputMobile} className="border-[1px]  border-[#dcdcdc] border-solid rounded-md outline-none focus:outline-none pl-2 md:w-[30rem] w-full shadow-md" placeholder="Enter task" name="" onChange={(e) => {
                    setTask(e.target.value)
                  }} id=""
                    value={task}
                  />
                  <button className="focus:outline-none px-3 py-2 bg-blue-300 rounded-md ml-3 font-serif drop-shadow-md" onClick={() => { SubmitTask() }}>Save</button>
                </div>
              </div>
              <div className="task_container_list flex justify-evenly flex-wrap md:grid grid-cols-3 w-full bg-[#13005A]">
                <CurrentTask allTask={allTask} DeleteTask={DeleteTask} doneTaskFunction={DoneTaskFunction} setEditComponent={setEditComponent} />
                <DoneTask
                  doneTask={doneTask}
                  doneTaskFunction={DoneTaskFunction}
                  setEditComponent={setEditComponent} />
                <DeletecTasks
                  deletedTask={deletedTask}
                  allTasks={allTask}
                  deleteTaskFunc={DeleteTask}
                  setEditComponent={setEditComponent} />
              </div>
            </>
        }
      </div>
    </div>
  )
}
export default App;
type EditComponentProps = {
  setEditComponent: React.Dispatch<React.SetStateAction<editInterFace>>,
  showEditComponent: editInterFace,
  allTask: itemInterface[],
  setAllTask: React.Dispatch<React.SetStateAction<itemInterface[]>>,
  userId: string
}
function EditComponent({ setEditComponent, showEditComponent, allTask, setAllTask, userId }: EditComponentProps): JSX.Element {
  const [taskReset, setResetTask] = useState(showEditComponent.text)
  async function updateTask() {
    if (taskReset && taskReset !== showEditComponent.text) {
      let res = allTask.find((item) => item.taskId === showEditComponent.taskId)
      if (res) {
        res["task"] = taskReset
        const allTaskReset = allTask.filter(item => item.taskId !== showEditComponent.taskId)
        await updateTasked(userId, res.taskId, taskReset, res.time)
        setAllTask([res, ...allTaskReset])
        setEditComponent({ state: false })
      }
    }
  }
  async function updateTasked(userId: string, taskId: string, task: string, time: Number) {
    const update = async () => {
      try {
        const res = await axios({
          method: "PUT",
          url: process.env.REACT_APP_BACKEND_DOMAIN + `/api/v1/task/update/edit/${userId}/${taskId}`,
          data: {
            task, time
          },
          withCredentials: true
        })
      } catch (err) {
        toast.error("Task not update")
      }
    }
    await update()
  }
  return (
    <>
      <main className="edit_component   w-screen absolute z-[999] p-[7rem] pt-[1rem]">
        <div className="close flex justify-end mr-0">
          <button
            onClick={() => {
              setEditComponent({ state: false })
            }}
            className="rounded-md bg-[#8d1414] text-white p-1 mb-1"
          >
            <RxCross2 className="text-[1.9rem] font-semibold" />
          </button>
        </div>
        <div className="inner_component  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-[#e3e3e368] rounded-sm flex flex-wrap w-full h-full shadow-lg p-4 relative">
          <textarea
            value={taskReset}
            rows={5}
            className=" rounded-md w-full focus:outline-none py-2 outline-1 outline-[#707070] border-[2px] border-solid border-[#bcbcbc] drop-shadow-lg break-all resize-none"
            onChange={(e) => {
              setResetTask(e.target.value)
            }}
          />
          <div className="btn">
            <button className="text-[1.2rem] relative   font-serif mt-2 px-4 py-2 bg-[#036f08] rounded-md text-white"
              onClick={() => {
                updateTask()
              }}
            >Update</button>
          </div>
        </div>
      </main>
    </>
  )
}
