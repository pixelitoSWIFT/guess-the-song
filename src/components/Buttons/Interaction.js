const InteractionButton = ({ children, action }) => {



    return (
        <>

            <button onClick={action} className='min-w-[44px] min-h-[44px] text-center py-2.5 rounded-lg hover:bg-white/10 active:bg-primary  transition-all'>{children}</button>

        </>
    )


}


export default InteractionButton