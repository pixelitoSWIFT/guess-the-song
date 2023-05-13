import albums from '../assets/JSON/albums.json';

const Result = ({ song }) => {


    return (

        <>
            <div className='flex flex-col text-center justify-center items-center'>
                <div className='overflow-hidden h-64 w-64 rounded-lg my-2'>
                    <img alt={song.album} className='h-full w-full' src={'/images/albums/' + albums[song.album] + '.png'}></img>
                </div>
                <div className='font-bold text-2xl'>{song.song}</div>
                <div className='text-xl'>{song.album}</div>
              
            </div>

        </>
    )



}



export default Result