import Popover from "../../../../../components/popover/popover.component";


const Alert = ({children, closeAlert}) =>{
    return (
        <Popover closeTrigger={closeAlert}>
            <div className="relative flex flex-col px-3 py-5 bg-white w-screen md:w-[768px] rounded-lg shadow-lg border">
                {children}
                <br/>
                <div>
                <button className="flex p-5 border shadow-lg bg-red-500 rounded-lg" onClick={closeAlert}>
                    Exit
                </button>
                <button className="flex p-5 border shadow-lg bg-green-500 rounded-lg" onClick={closeAlert}>
                    confirm
                </button>
                </div>
                

            </div>
            
        </Popover>
    )
}

export default Alert;