import { useReducer, useState } from "react"
import { Helmet } from "react-helmet"
import Loading from "../../components/Loading"
import { useEffect } from "react"
import { reducer, INITIAL_STATE, ACTIONS } from "./reducer"
import { getLS, setLS } from "../../assets/helpers/localstorage"


const Unlimited = () => {


    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const stats = JSON.parse(getLS('unlimited'))

        if (!stats || state.song === '') {

        }

    }, [])



    useEffect(() => {
        if (state.song !== '') {
            setLS('unlimited', JSON.stringify(state))
        }
    }, [state])



    return (

        <>
            <Helmet>
                <title>
                    Unlimited - Swifti.es
                </title>
            </Helmet>


            <div className="text-center text-2xl">COMING SOON...</div>

        </>
    )
}



export default Unlimited