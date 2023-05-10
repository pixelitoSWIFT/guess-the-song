const Lyrics = ({ children, revealed }) => {



    return (
        <>
            <div className={`w-full min-h-[44px] py-2.5 my-2 text-center px-2 ${revealed ? 'bg-zinc-800' : 'bg-zinc-700'} rounded-lg transition-all`}>{children}</div>

        </>
    )
}


export default Lyrics