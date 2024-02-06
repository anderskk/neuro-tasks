import {Color, Vector3} from "@react-three/fiber";


interface Props {
    color: Color
    position: Vector3
    radius: number
}

export const MeshCircle = ({color, position, radius}: Props) => {
    return (
        <mesh position={position}>
            <circleGeometry args={[radius]}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}