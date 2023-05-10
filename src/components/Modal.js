import InteractionButton from "./Buttons/Interaction"


const Modal = ({ onClose, title, children }) => {




    return (
        <div className="fixed top-0 left-0 w-full p-5 h-full flex justify-center items-center bg-black/70 z-10">
            <div className="bg-background block p-2.5 rounded-lg relative w-full max-w-[700px]">
                <div className="flex justify-between items-center border-b border-zinc-700 pb-2">
                    <div className="text-2xl">{title}</div>
                    <div className="bg-zinc-800 rounded-lg p-1">
                        <InteractionButton action={onClose}>
                            <i className="fa-solid fa-x"></i>
                        </InteractionButton>
                    </div>
                </div>
                <div className="">
                    {children}
                </div>
            </div>

        </div >
    )
}



export default Modal