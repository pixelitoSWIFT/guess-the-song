export const randomsong = async () => {

    let data = await fetch('https://api.swifti.es/api/songs/random')
        .then((response) => { return response.json() })

    let length = data.lyrics.length
    let random = Math.floor(Math.random() * (length - 5 + 1))
    let lyrics = data.lyrics.slice(random, random + 5)
    data.lyrics = lyrics
    
    return data

}
