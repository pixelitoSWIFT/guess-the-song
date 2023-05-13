import { useReducer, useState } from "react"
import { Helmet } from "react-helmet"
import Loading from "../../components/Loading"
import { useEffect } from "react"
import { reducer, INITIAL_STATE, ACTIONS } from "./reducer"
import { getLS, setLS } from "../../assets/helpers/localstorage"
import Lyrics from "../../components/Lyrics"
import NormalButton from '../../components/Buttons/Button'
import { randomsong } from "../../assets/helpers/randomsong"
import Result from "../../components/Result"
import BottomMenu from "../../components/BottomMenu"
import Error from "../../components/Error"

const Unlimited = () => {


    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const [loading, setLoading] = useState(false)
    const [chosenSong, setChosenSong] = useState('')
    const [error, setError] = useState('')

    const setSong = (song) => setChosenSong(song)
    const removeError = () => setError('')

    const guess = () => {
        if (chosenSong.trim() === '') {
            setError('Choose a song first')
            return
        }

        if (chosenSong.toLowerCase() === state.song.toLowerCase()) {
            let streak = state.currentStreak + 1
            let maxStreak = streak > state.maxStreak ? streak : state.maxStreak

            dispatch({ type: ACTIONS.GUESSED, payload: { currentStreak: streak, maxStreak: maxStreak } })
            setChosenSong('')
            setError('')
        } else {
            skip('Wrong guess, added more lyrics')

        }

    }

    const nextSong = async () => {
        setLoading(true)
        let data = await randomsong()
        dispatch({ type: ACTIONS.NEXT_SONG, payload: { ...data } })
        setLoading(false)
    }

    const skip = (error = 'Added more lyrics') => {
        setChosenSong('')
        if (state.tries <= 1) {
            setError('')
            dispatch({ type: ACTIONS.GAME_OVER })
        }
        else {
            dispatch({ type: ACTIONS.SKIP })
            setError(error)
        }
    }


    const startGame = async () => {
        setLoading(true)
        let data = await randomsong()
        dispatch({ type: ACTIONS.START_GAME, payload: data })
        setLoading(false)
    }

    useEffect(() => {
        const stats = JSON.parse(getLS('unlimited'))
        if (stats) {
            dispatch({ type: stats.state, payload: stats })
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
            {loading && <Loading></Loading>}

            {!loading && <div className="flex flex-col justify-between min-h-[inherit]">
                {state.state === ACTIONS.NEW_GAME &&
                    <>
                        <div></div>
                        <div className="flex justify-center">
                            <NormalButton action={startGame}>NEW GAME</NormalButton>
                        </div>
                        <div></div>
                    </>
                }
                {state.state !== ACTIONS.NEW_GAME &&
                    <>
                        <div className="my-2">
                            <div className="grid text-center grid-cols-3 px-2 bg-zinc-800 border border-primary rounded-lg">
                                <div className="py-2.5">Streak: <span className="font-bold">{state.currentStreak}</span></div>
                                <div className="py-2.5">Tries: <span className="font-bold">{state.tries}</span></div>
                                <div className="py-2.5">Max streak: <span className="font-bold">{state.maxStreak}</span></div>
                            </div>
                            <div className="">
                                <Lyrics revealed={state.lyricsRevealed[0]}>{state.lyricsRevealed[0]}</Lyrics>
                                <Lyrics revealed={state.lyricsRevealed[1]}>{state.lyricsRevealed[1]}</Lyrics>
                                <Lyrics revealed={state.lyricsRevealed[2]}>{state.lyricsRevealed[2]}</Lyrics>
                                <Lyrics revealed={state.lyricsRevealed[3]}>{state.lyricsRevealed[3]}</Lyrics>
                                <Lyrics revealed={state.lyricsRevealed[4]}>{state.lyricsRevealed[4]}</Lyrics>
                            </div>
                            {state.guessed !== '' &&
                                <div className="">
                                    <div className='text-2xl font-bold text-center'>{state.guessed ? "You've guessed it!" : "Not guessed, game is over!"}</div>
                                    <Result song={state} ></Result>
                                    <div className="flex justify-center my-2">
                                        <NormalButton action={state.guessed ? nextSong : startGame}>{state.guessed ? 'NEXT SONG' : 'NEW GAME'}</NormalButton>
                                    </div>
                                </div>}
                        </div>

                        <div className="">
                            {error && <Error>{error}</Error>}
                            <BottomMenu guess={guess} skip={skip} chooseSong={setSong} removeError={removeError} chosenSong={chosenSong} disabled={!state.playing} ></BottomMenu>
                        </div>
                    </>}

            </div>}
        </>
    )
}



export default Unlimited