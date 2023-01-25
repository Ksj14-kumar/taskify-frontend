import { FcGoogle } from 'react-icons/fc';
function Login() {
    async function handleLogin() {
        try {
            window.open(process.env.REACT_APP_BACKEND_DOMAIN+"/api/v1/google/login","_self")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center align-center items-center w-screen h-screen p-[8rem] bg-[#e5e5e5d3]">
            <div className="inner bg-[#c0bebe]  py-[4rem] px-[3rem] mobile:px-[.9rem] mobile:py-[1rem]   flex  items-center rounded-md">
                <div className="wrapper flex items-center w-full bg-gray-500 rounded-t-md rounded-l-md rounded-b-md">
                    <div className="btn_con  flex-[3] flex justify-center align-middle cursor-pointer">
                        <FcGoogle className='text-[3.22rem] ' />
                    </div>
                    <div className="btn_con  flex-[9] h-full">
                        <button className="text-[1rem] py-[1rem] w-[14rem] mobile:w-[10rem] justify-center flex   rounded-r-md h-full rounded-br-md  bg-[#f9f9f9] text-[#151515e2] font-serif tracking-wider"
                            onClick={handleLogin}
                        >login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login