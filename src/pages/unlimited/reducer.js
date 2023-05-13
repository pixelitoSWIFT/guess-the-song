export const INITIAL_STATE = {
    song: '',
    album: '',
    lyrics: [],
    lyricsRevealed: [],
    state: 'NEW_GAME',
    tries: 5,
    triesReveal: 1,
    guessed: '',
    currentStreak: 0,
    maxStreak: 0,
    playing: false
}

export const ACTIONS = {
    NEW_GAME: 'NEW_GAME',
    START_GAME: 'START_GAME',
    STARTED_GAME: 'STARTED_GAME',
    SKIP: 'SKIP',
    GUESSED: 'GUESSED',
    GAME_OVER: 'GAME_OVER',
    NEXT_SONG: 'NEXT_SONG'

}


export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.NEW_GAME: {
            break
        }
        case ACTIONS.START_GAME: {
            return {
                ...state,
                ...action.payload,
                state: ACTIONS.STARTED_GAME,
                tries: 5,
                triesReveal: 1,
                guessed: '',
                lyricsRevealed: [action.payload.lyrics[0]],
                playing: true,
            }
        }
        case ACTIONS.STARTED_GAME: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTIONS.SKIP: {
            return {
                ...state,
                tries: state.tries - 1,
                triesReveal: state.triesReveal + 1,
                lyricsRevealed: [...state.lyricsRevealed, state.lyrics[state.triesReveal]]
            }
        }
        case ACTIONS.GAME_OVER: {
            return {
                ...state,
                ...action.payload,
                tries: 0,
                playing: false,
                state: ACTIONS.GAME_OVER,
                currentStreak: 0,
                guessed: false
            }
        }
        case ACTIONS.NEXT_SONG: {
            return {
                ...state,
                ...action.payload,
                tries: state.tries < 5 ? state.tries + 1 : 5,
                triesReveal: 1,
                guessed: '',
                lyrics: [...action.payload.lyrics],
                lyricsRevealed: [action.payload.lyrics[0]],
                playing: true
            }
        }
        case ACTIONS.GUESSED: {
            return {
                ...state,
                ...action.payload,
                guessed: true,
                playing: false,
                lyricsRevealed: [...state.lyrics]
            }
        }

        default:
            return state
    }

}