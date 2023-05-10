const NormalButton = ({ children, action, disabled = false }) => {



    return (
        <>

            <button disabled={disabled} onClick={action} className='min-w-[128px] text-center py-2.5 rounded-lg bg-primary hover:bg-accent transition-all disabled:bg-zinc-800 disabled:text-white/70 disabled:hover:cursor-not-allowed'>{children}</button>

        </>
    )


}


export default NormalButton