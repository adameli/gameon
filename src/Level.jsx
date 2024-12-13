import { Float, Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

// Geometries
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

// Materials
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen'})
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow'})
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered'})
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey'})

export function BlockStart ({position = [0, 0, 0]}) {

    return (
        <group position={position}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text 
                    scale={0.5}
                    font="./bebas-neue-v9-latin-regular.woff"
                    maxWidth={ 0.25 }
                    lineHeight={ 0.75 }
                    textAlign="right"
                    position={ [ 0.75, 0.65, 0 ] }
                    rotation-y={ - 0.25 }
                >
                        Marble Race
                        <meshBasicMaterial toneMapped={false}/>
                </Text>
            </Float>
            {/* Floor */}
            <mesh 
                geometry={boxGeometry} 
                position={[0, -0.1, 0]} 
                scale={[4, 0.2, 4]}
                material={floor1Material}
                receiveShadow
            />
        </group>
    )
}

export function BlockEnd ({position = [0, 0, 0]}) {

    const model = useGLTF('./hamburger.glb')

    return (
        <group position={position}>
            <Text
                  font="./bebas-neue-v9-latin-regular.woff"
                  scale={1}
                  position={[0, 2.25, 2]}
            >
                FINISH
                <meshBasicMaterial toneMapped={false}/>
            </Text>
            {/* Floor */}
            <mesh 
                geometry={boxGeometry} 
                position={[0, 0, 0]} 
                scale={[4, 0.2, 4]}
                material={floor1Material}
                receiveShadow
            />
            <RigidBody 
                type='fixed' 
                colliders='hull'
                restitution={0.2}
                friction={0}
                position={[0, 0.25, 0]}
            >
                <primitive object={model.scene} scale={0.2}/>
            </RigidBody>
        </group>
    )
}

export function BlockSpinner ({position = [0, 0, 0]}) {

    const obstacle = useRef()
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return (
        <group position={position}>
            {/* Floor */}
            <mesh 
                geometry={boxGeometry} 
                position={[0, -0.1, 0]} 
                scale={[4, 0.2, 4]}
                material={floor2Material}
                receiveShadow
            />

            {/* Spinner */}
            <RigidBody 
                type='kinematicPosition' 
                restitution={0.2} 
                friction={0}
                ref={obstacle}
            >

                <mesh
                    geometry={boxGeometry} 
                    position={[0, 0.3, 0]} 
                    scale={[3.5, 0.3, 0.3]}
                    material={obstacleMaterial}
                    receiveShadow
                    castShadow
                    />
            </RigidBody>
        </group>
    )
}

export function BlockLimbo ({position = [0, 0, 0]}) {

    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({x: position[0], y: position[1] + y, z: position[2]})
    })

    return (
        <group position={position}>
            {/* Floor */}
            <mesh 
                geometry={boxGeometry} 
                position={[0, -0.1, 0]} 
                scale={[4, 0.2, 4]}
                material={floor2Material}
                receiveShadow
            />

            {/* Limbo */}
            <RigidBody 
                type='kinematicPosition' 
                restitution={0.2} 
                friction={0}
                ref={obstacle}
            >

                <mesh
                    geometry={boxGeometry} 
                    position={[0, 0.3, 0]} 
                    scale={[3.5, 0.3, 0.3]}
                    material={obstacleMaterial}
                    receiveShadow
                    castShadow
                    />
            </RigidBody>
        </group>
    )
}

export function BlockAxe ({position = [0, 0, 0]}) {

    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const x = Math.sin(time + timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation({x: position[0] + x, y: position[1], z: position[2]})
    })

    return (
        <group position={position}>
            {/* Floor */}
            <mesh 
                geometry={boxGeometry} 
                position={[0, -0.1, 0]} 
                scale={[4, 0.2, 4]}
                material={floor2Material}
                receiveShadow
            />

            {/* Axe */}
            <RigidBody 
                type='kinematicPosition' 
                restitution={0.2} 
                friction={0}
                ref={obstacle}
            >

                <mesh
                    geometry={boxGeometry} 
                    position={[0, 0.7, 0]} 
                    scale={[1.5, 1.5, 0.3]}
                    material={obstacleMaterial}
                    receiveShadow
                    castShadow
                    />
            </RigidBody>
        </group>
    )
}

function Bounds ({ length = 1}) {

    return <>
        <RigidBody type='fixed' restitution={0.2} friction={0}>
            <mesh 
                geometry={boxGeometry}
                material= {wallMaterial}
                scale={[0.3, 1.5, 4 * length]}
                position={[2.15, 0.75, - (length * 2) + 2]}
                castShadow
            />
            <mesh 
                geometry={boxGeometry}
                material= {wallMaterial}
                scale={[0.3, 1.5, 4 * length]}
                position={[-2.15, 0.75, - (length * 2) + 2]}
                receiveShadow
            />
            <mesh 
                geometry={boxGeometry}
                material= {wallMaterial}
                scale={[4, 1.5, 0.3]}
                position={[0, 0.75, - (length * 4) + 2]}
                receiveShadow
            />
            <CuboidCollider 
                args={[2, 0.1, 2 * length]} 
                position={[0, -0.1, - (length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}

export default function Level ({count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0}) {

    const blocks = useMemo(() => {
            const blocks = []

            for(let i = 0; i < count; i++){
                const type = types[Math.floor(Math.random() * types.length)]
                blocks.push(type)
            }

            return blocks
        }, [count, types, seed])

   

    return <>
        <BlockStart position={[0, 0, 0]} />

        {blocks.map((Block, i) => <Block key={i} position={[0, 0, - (i + 1) * 4]} /> )}

        <BlockEnd position={[0, 0, - (count + 1) * 4]} />

        <Bounds  length= {count + 2} /> 
    </>
}