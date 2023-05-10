import albums from '../assets/JSON/albums.json';
import Countdown from './Countdown';

const Result = ({ song, guessed }) => {


    return (

        <>
            <div className='flex flex-col text-center justify-center items-center'>
                <div className='text-2xl font-bold'>{guessed ? "You've guessed it!" : "Not guessed, good luck next time!"}</div>
                <div className='overflow-hidden h-64 w-64 rounded-lg my-2'>
                    <img alt={song.album} className='h-full w-full' src={'/images/albums/' + albums[song.album] + '.png'}></img>
                </div>
                <div className='font-bold text-2xl'>{song.song}</div>
                <div className='text-xl'>{song.album}</div>
                <div className='my-4 p-2 rounded-lg bg-zinc-800'>
                    <div className='text-lg'>Next song in</div>
                    <Countdown></Countdown>

                </div>
            </div>

        </>
    )



}



export default Result