import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import Level from './Level.jsx'
import { Physics } from "@react-three/rapier"
import Player from './Player.jsx'
import useGame from './stores/useGame.jsx'


export default function Experience()
{

    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)


    return <>
    {/* <Perf position='top-left'/> */}

    <color args={['#bdedfc']} attach='background' />

    <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
    </Physics>
       

    </>
}