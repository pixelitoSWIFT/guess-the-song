import { Helmet } from "react-helmet"
import { useReducer, useState } from 'react'
import Lyrics from "../../components/Lyrics"
import { useEffect } from "react"
import Loading from "../../components/Loading"
import Result from "../../components/Result"
import BottomMenu from "../../components/BottomMenu"
import Error from "../../components/Error"
import Countdown from "../../components/Countdown"
import { reducer, INITIAL_STATE, ACTIONS } from "./reducer"
import { getLS, setLS } from "../../assets/helpers/localstorage"


const Daily = () => {




    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const [loading, setLoading] = useState(true)
    const [chosenSong, setChosenSong] = useState('')
    const [error, setError] = useState('')

    const setSong = (song) => setChosenSong(song)
    const removeError = () => setError('')

    const skip = (error = 'Added more lyrics') => {
        setChosenSong('')
        if (state.tries >= 5) {
            setError('')
            dispatch({ type: ACTIONS.FAILED_GAME, payload: { gamesPlayed: state.gamesPlayed + 1, lastPlay: { date: state.date, result: false } } })
        }
        else {
            dispatch({ type: ACTIONS.SKIP })
            setError(error)
        }
    }


    const guess = () => {
        if (chosenSong.trim() === '') {
            setError('Choose a song first')
            return
        }

        if (chosenSong.toLowerCase() === state.song.toLowerCase()) {

            let streak = 1
            let maxStreak
            let lastDay = new Date(state.lastPlay.date)
            let today = new Date(state.date)
            let wasYesterday = (today - lastDay === 86400000)
            if (state.lastPlay.result && wasYesterday) {
                streak = state.dayStreak + 1

            }
            maxStreak = streak > state.maxStreak ? streak : state.maxStreak


            dispatch({ type: ACTIONS.GUESSED_GAME, payload: { lastPlay: { date: state.date, result: true }, dayStreak: streak, maxStreak: maxStreak, gamesPlayed: state.gamesPlayed + 1, gamesWon: state.gamesWon + 1, lyricsRevealed: [...state.lyrics] } })
        }
        else {
            skip('Wrong guess, added more lyrics')
        }

        setChosenSong('')
    }


    useEffect(() => {

        const stats = JSON.parse(getLS('daily'))
        const date = new Date();
        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString().substring(0, 10);

        if (!stats || stats.song === '') {
            fetch('https://api.swifti.es/api/daily')
                .then((response) => { return response.json() })
                .then((response) => {
                    dispatch({ type: ACTIONS.NEW_GAME, payload: response })
                    setLoading(false)
                })
        } else if (utcDate !== stats.date) {
            fetch('https://api.swifti.es/api/daily')
                .then((response) => { return response.json() })
                .then((response) => {
                    dispatch({ type: ACTIONS.NEW_DAY, payload: { ...stats, ...response } })
                    setLoading(false)
                })
        }
        else {
            dispatch({ type: stats.state, payload: stats })
            setLoading(false)
        }


    }, [])

    useEffect(() => {
        if (state.song !== '') {
            setLS('daily', JSON.stringify(state))

        }

    }, [state])


    return (

        <>
            <Helmet>
                <title>
                    Daily - Swifti.es
                </title>
            </Helmet>

            {loading && <Loading></Loading>}

            {!loading && <div className="flex flex-col  justify-between min-h-[inherit]">
                <div className="">
                    <div className="">
                        <Lyrics revealed={state.lyricsRevealed[0]}>{state.lyricsRevealed[0]}</Lyrics>
                        <Lyrics revealed={state.lyricsRevealed[1]}>{state.lyricsRevealed[1]}</Lyrics>
                        <Lyrics revealed={state.lyricsRevealed[2]}>{state.lyricsRevealed[2]}</Lyrics>
                        <Lyrics revealed={state.lyricsRevealed[3]}>{state.lyricsRevealed[3]}</Lyrics>
                        <Lyrics revealed={state.lyricsRevealed[4]}>{state.lyricsRevealed[4]}</Lyrics>
                    </div>
                    {state.guessed !== '' &&
                        <div className="">
                            <div className='text-2xl font-bold text-center'>{state.guessed ? "You've guessed it!" : "Not guessed, good luck next time!"}</div>
                            <Result song={state} ></Result>
                            <div className="flex justify-center text-center">
                                <div className='my-4 p-2 rounded-lg bg-zinc-800'>
                                    <div className='text-lg'>Next song in</div>
                                    <Countdown></Countdown>
                                </div>
                            </div>
                        </div>}

                </div>
                <div className="">
                    {error && <Error>{error}</Error>}
                    <BottomMenu skip={skip} guess={guess} chooseSong={setSong} removeError={removeError} chosenSong={chosenSong} disabled={!state.playing}></BottomMenu>
                </div>
            </div >

            }
        </>
    )
}



export default Daily