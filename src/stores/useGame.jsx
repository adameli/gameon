import {create} from 'zustand'

export default create((set) => {

    return {
        blocksCount: 3,

        // Phases
        phase: 'redy',

        // start
        start: () => { 
            set((state) => {
                if(state.phase === 'ready')
                    return { phase: 'playing'}

                return {}
            })
        },

        // restart
        restart: () => {
            set((state) => {
                if(state.phase === 'playing' || state.phase === 'ended')
                    return { phase: 'redy'}

                return {}
            })
        },

        // end
        end: () => {
            set((state) => {
                if(state.phase === 'playing')
                    return { phase: 'ended'}

                return {}
            })
        }
    }
})