import { NavLink } from "react-router-dom"

const LinkButton = ({ children, link }) => {


    return (
        <>
            <NavLink style={({ isActive }) => isActive ? { backgroundColor: 'var(--primary)' } : {}} className='min-w-[128px] text-center h-max py-2.5 px-1 rounded-lg hover:bg-white/10  transition-all' to={link}>{children}</NavLink >
        </>
    )

}


export default LinkButton