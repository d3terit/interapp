import { Canvas } from '@react-three/fiber/native';
import { Suspense, } from 'react';
import { Avatar } from './Avatar';
import { View } from "react-native"
import useControls from "r3f-native-orbitcontrols"
import { extend } from '@react-three/fiber/native';

export default function App() {
  const [OrbitControls, events] = useControls()
  const created = (state) => {
    const _gl = state.gl.getContext();
    const pixelStorei = _gl.pixelStorei.bind(_gl);
    _gl.pixelStorei = function (...args) {
      const [parameter] = args;
      switch (parameter) {
        case _gl.UNPACK_FLIP_Y_WEBGL:
          return pixelStorei(...args);
      }
    };
  };

  return (
    <View {...events} style={{ flex: 1 }}>
      <Canvas onCreated={created} style={{ flex: 1, backgroundColor: '#111' }}>
        <OrbitControls enablePan={false} enableZoom={false}/>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <Avatar />
        </Suspense>
      </Canvas>
    </View>
  );
}

const Loading = ()  => {
  return (
    //uso de extend
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
