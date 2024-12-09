import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import Level from './Level.jsx'
import { Physics } from "@react-three/rapier"
import Player from './Player.jsx'

export default function Experience()
{
    return <>
    <Perf position='top-left'/>

    <Physics>
        <Lights />
        <Level />
        <Player />
    </Physics>
       

    </>
}