import { useEffect, useState } from "react"
import { getLS } from "../assets/helpers/localstorage"



const Countdown = () => {

    const playingDate = JSON.parse(getLS('daily'))?.date

    const now = new Date()
    const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0)
    const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString().substring(0, 10);
    const timeRemaining = utcMidnight - now.getTime()
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60)).toString().padStart(2, 0)
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60).toString().padStart(2, 0)
    const seconds = Math.floor((timeRemaining / 1000) % 60).toString().padStart(2, 0)


    const [countdown, setCountdown] = useState('')

    useEffect(() => {

        if (playingDate !== utcDate) {
            window.location.reload()
        }

        const t = setInterval(() => {
            setCountdown(`${hours} : ${minutes} : ${seconds}`)
        }, 1000)

        return () => clearInterval(t)
    }, [countdown, playingDate, utcDate, hours, minutes, seconds])

    return (
        <>
            <div className="text-2xl w-64 font-bold text-center">{countdown || `${hours} : ${minutes} : ${seconds}`}</div>
        </>
    )

}



export default Countdown