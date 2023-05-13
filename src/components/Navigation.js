import { useEffect, useState } from "react"
import InteractionButton from "./Buttons/Interaction"
import LinkButton from "./Buttons/Link"
import Modal from './Modal'
import { getLS } from '../assets/helpers/localstorage'


const Navigation = () => {

    const [modal, setModal] = useState(null)


    const daily = JSON.parse(getLS('daily'))
    const unlimited = JSON.parse(getLS('unlimited'))


    useEffect(() => {
        document.body.style.overflow = modal ? 'hidden' : 'auto'
    }, [modal])


    return (
        <div>
            <nav className="flex sm:flex-row flex-col justify-between border-b border-zinc-700">
                <div className="grid place-content-center text-center sm:text-left">
                    <div className="text-xl font-bold">Guess the song</div>
                    <div className="text-lg">by the lyrics</div>

                </div>
                <div className="flex space-x-1">
                    <div className="flex flex-col w-2/3 sm:w-auto sm:flex-row h-min space-x-1 p-1 bg-zinc-800 rounded-lg my-2  ">
                        <LinkButton link='/daily'>Daily</LinkButton>
                        <LinkButton link='/unlimited'>Unlimited</LinkButton>
                    </div>
                    <div className="flex flex-col w-1/3 sm:w-auto sm:flex-row p-1 h-min bg-zinc-800 rounded-lg my-2">
                        <InteractionButton action={() => { setModal(1) }} >
                            <i className="fa-solid fa-chart-simple"></i>
                        </InteractionButton>
                        <InteractionButton action={() => { setModal(2) }} >
                            <i className="fa-solid fa-circle-info"></i>
                        </InteractionButton>
                    </div>
                </div>
            </nav >

            {modal === 1 && <Modal title="Stats" onClose={() => { setModal(null) }}>
                <div className="mt-2 text-center">
                    <div className="text-xl font-bold p-2 bg-zinc-700 rounded-lg">Daily mode</div>
                    <div className="text-lg my-2">

                        <div className="">Played : <span className="font-bold">{daily ? daily.gamesPlayed || 0 : 0}</span></div>
                        <div className="">Win percentage : <span className="font-bold">{daily ? Math.floor(((daily.gamesWon / daily.gamesPlayed) * 100)) || 0 : 0}%</span></div>
                        <div className="">Current streak : <span className="font-bold">{daily ? daily.dayStreak : 0}</span></div>
                        <div className="">Max streak : <span className="font-bold">{daily ? daily.maxStreak : 0}</span></div>
                    </div>
                    <div className="text-xl font-bold p-2 bg-zinc-700 rounded-lg">Unlimited mode</div>
                    <div className="text-lg my-2">
                        <div className="">Played : <span className="font-bold">{unlimited ? unlimited.gamesPlayed || 0 : 0}</span></div>
                        <div className="">Current streak : <span className="font-bold">{unlimited ? unlimited.currentStreak : 0}</span></div>
                        <div className="">Max streak : <span className="font-bold">{unlimited ? unlimited.maxStreak : 0}</span></div>
                    </div>
                </div>
            </Modal>}
            {modal === 2 && <Modal title="Information" onClose={() => { setModal(null) }}>
                <div className="mt-2 text-center">
            
                    <div className="my-2 ">
                        <div className="">
                            <div className="">
                                <div className="text-xl font-bold p-2 bg-zinc-700 rounded-lg">Daily mode</div>
                                <ul className="my-2">
                                    <li>- A new song will be revealed daily at UTC midnight.</li>
                                    <li>- You have 5 attempts to guess the song.</li>
                                    <li>- Press "skip" to reveal an additional line of lyrics, up to a maximum of 5 lines.</li>
                                    <li>- Incorrect guesses will deduct one attempt.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <div className="text-xl font-bold p-2 bg-zinc-700 rounded-lg">Unlimited mode</div>
                                <ul className="my-2">
                                    <li>- Start with 5 tries.</li>
                                    <li>- Deduct a try for each wrong guess or skip, revealing a line of lyrics each time.</li>
                                    <li>- Correctly guessing adds a try and reveals a new song.</li>
                                    <li>- Maximum of 5 tries.</li>
                                    <li>- Game ends if you run out of tries.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>}
        </div>


    )

}


export default Navigation