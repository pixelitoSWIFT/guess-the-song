export const INITIAL_STATE = {
    song: '',
    album: '',
    lyrics: [],
    lyricsRevealed: [],
    state: 'NEW_GAME',
    tries: 1,
    date: '',
    guessed: '',
    currentStreak: 0,
    maxStreak: 0,
}

export const ACTIONS = {
    NEW_GAME: 'NEW_GAME',

}


export const reducer = (state, action) => {
    switch (action.type) {

        default:
            return state
    }

}