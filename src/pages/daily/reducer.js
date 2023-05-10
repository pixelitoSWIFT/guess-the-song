export const INITIAL_STATE = {
    song: '',
    album: '',
    lyrics: [],
    lyricsRevealed: [],
    state: 'NEW_GAME',
    tries: 1,
    date: '',
    guessed: '',
    dayStreak: 0,
    maxStreak: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    lastPlay: {
        date: '',
        result: ''
    }
}

export const ACTIONS = {
    NEW_GAME: 'NEW_GAME',
    NEW_DAY: 'NEW_DAY',
    STARTED_GAME: 'STARTED_GAME',
    FAILED_GAME: 'FAILED_GAME',
    GUESSED_GAME: 'GUESSED_GAME',
    SKIP: 'SKIP',
    GUESS: 'GUESS',
}


export const reducer = (state, action) => {
    switch (action.type) {

        case ACTIONS.NEW_GAME: {
            return {
                ...state,
                ...action.payload,
                lyricsRevealed: [action.payload.lyrics[0]],
                playing: true,
                state: ACTIONS.STARTED_GAME
            }
        }
        case ACTIONS.NEW_DAY: {
            return {
                ...state,
                ...action.payload,
                lyricsRevealed: [action.payload.lyrics[0]],
                tries: 1,
                state: ACTIONS.STARTED_GAME,
                guessed: '',
                playing: true

            }
        }

        case ACTIONS.STARTED_GAME: {
            return {
                ...action.payload
            }
        }
        case ACTIONS.FAILED_GAME: {

            return {
                ...state,
                ...action.payload,
                playing: false,
                guessed: false,
                state: ACTIONS.FAILED_GAME,
                dayStreak: 0,


            }
        }
        case ACTIONS.GUESSED_GAME: {


            return {
                ...state,
                ...action.payload,
                playing: false,
                guessed: true,
                state: ACTIONS.GUESSED_GAME
            }
        }

        case ACTIONS.SKIP: {
            return {
                ...state,
                tries: state.tries + 1,
                lyricsRevealed: [...state.lyricsRevealed, state.lyrics[state.tries]]
            }
        }
        default: {
            return {
                ...state,
            }
        }

    }
}