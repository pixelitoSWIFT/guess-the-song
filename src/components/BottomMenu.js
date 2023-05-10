import { useState } from 'react';
import songs from '../assets/JSON/songs.json';
import NormalButton from "./Buttons/Button"
import { useRef } from 'react';



const BottomMenu = ({ chooseSong, chosenSong, disabled, skip, guess, removeError }) => {

    const [query, setQuery] = useState('')
    const input = useRef(null)

    const filtered = songs.filter((song) => song.toLowerCase().includes(query.toLowerCase())).map((song) => <div onClick={() => { chooseSong(song); setQuery(''); input.current.value = '' }} className='px-2 py-1 hover:bg-white/20 hover:cursor-pointer transition-all' key={song}>{song}</div>)

    return (
        <>
            <div className="">
                <div className="relative">
                    {query && filtered.length > 0 && <div className='absolute bottom-16 rounded-lg w-full max-h-[200px] border bg-zinc-800 border-white/20 overflow-auto text-lg'>{filtered}</div>}
                    {chosenSong && <div className='text-xl text-center my-2'>You've chosen: <span className='font-bold'>{chosenSong}</span></div>}
                    <input disabled={disabled} ref={input} className="w-full p-2.5 border border-primary rounded-lg text-lg bg-zinc-800 disabled:hover:cursor-not-allowed disabled:border-zinc-700" placeholder="Choose your guess..." onChange={(e) => { setQuery(e.target.value); chooseSong(''); removeError(); }}></input>
                </div>
                <div className='flex justify-between mt-2'>
                    <NormalButton action={() => { skip(); setQuery(''); input.current.value = '' }} disabled={disabled}>SKIP</NormalButton>
                    <NormalButton action={() => { guess(); setQuery(''); input.current.value = '' }} disabled={disabled}>GUESS</NormalButton>
                </div>
            </div>
        </>
    )
}


export default BottomMenu