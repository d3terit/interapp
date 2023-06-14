import { useFrame, useLoader } from '@react-three/fiber/native';
import { useRef, useEffect } from 'react';
import { TextureLoader } from 'expo-three'; // por alguna razon se debe importar asi no se este usando
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Avatar = (props) => {
    const idleAnimationR = useLoader(GLTFLoader, require('./assets/clips/idle.glb'));
    const animations = {
        a: useLoader(GLTFLoader, require('./assets/clips/abecedario/a.glb')),
        b: useLoader(GLTFLoader, require('./assets/clips/abecedario/b.glb')),
        c: useLoader(GLTFLoader, require('./assets/clips/abecedario/c.glb')),
        d: useLoader(GLTFLoader, require('./assets/clips/abecedario/d.glb')),
        e: useLoader(GLTFLoader, require('./assets/clips/abecedario/e.glb')),
        f: useLoader(GLTFLoader, require('./assets/clips/abecedario/f.glb')),
        g: useLoader(GLTFLoader, require('./assets/clips/abecedario/g.glb')),
        h: useLoader(GLTFLoader, require('./assets/clips/abecedario/h.glb')),
        i: useLoader(GLTFLoader, require('./assets/clips/abecedario/i.glb')),
        j: useLoader(GLTFLoader, require('./assets/clips/abecedario/j.glb')),
        k: useLoader(GLTFLoader, require('./assets/clips/abecedario/k.glb')),
        l: useLoader(GLTFLoader, require('./assets/clips/abecedario/l.glb')),
        ll: useLoader(GLTFLoader, require('./assets/clips/abecedario/ll.glb')),
        m: useLoader(GLTFLoader, require('./assets/clips/abecedario/m.glb')),
        n: useLoader(GLTFLoader, require('./assets/clips/abecedario/n.glb')),
        ñ: useLoader(GLTFLoader, require('./assets/clips/abecedario/ni.glb')),
        o: useLoader(GLTFLoader, require('./assets/clips/abecedario/o.glb')),
        p: useLoader(GLTFLoader, require('./assets/clips/abecedario/p.glb')),
        q: useLoader(GLTFLoader, require('./assets/clips/abecedario/q.glb')),
        r: useLoader(GLTFLoader, require('./assets/clips/abecedario/r.glb')),
        rr: useLoader(GLTFLoader, require('./assets/clips/abecedario/rr.glb')),
        s: useLoader(GLTFLoader, require('./assets/clips/abecedario/s.glb')),
        t: useLoader(GLTFLoader, require('./assets/clips/abecedario/t.glb')),
        u: useLoader(GLTFLoader, require('./assets/clips/abecedario/u.glb')),
        v: useLoader(GLTFLoader, require('./assets/clips/abecedario/v.glb')),
        w: useLoader(GLTFLoader, require('./assets/clips/abecedario/w.glb')),
        x: useLoader(GLTFLoader, require('./assets/clips/abecedario/x.glb')),
        y: useLoader(GLTFLoader, require('./assets/clips/abecedario/y.glb')),
        z: useLoader(GLTFLoader, require('./assets/clips/abecedario/z.glb')),
    }
    let frase = "hola"
    let traducir = frase.toLowerCase().split("")
    const avatar = useLoader(GLTFLoader, require('./assets/abc.glb'));
    const mesh = useRef();
    let mixer
    let idleAnimation
    let signAnimation
    mixer = new THREE.AnimationMixer(avatar.scene); 
    const root = mixer.getRoot()
    const animNext = () => {
        console.log(traducir[0])
        const nextAnimation = animations[traducir[0]].animations[0]
        traducir.shift()
        THREE.AnimationUtils.makeClipAdditive(nextAnimation, idleAnimation.time , idleAnimation.getClip())
        let newAnimation = mixer.clipAction(nextAnimation, root);
        newAnimation.setLoop(THREE.LoopOnce)
        newAnimation.clampWhenFinished = true
        newAnimation.setEffectiveWeight(1);
        newAnimation.setEffectiveTimeScale(1);
        if(signAnimation) newAnimation.crossFadeFrom(signAnimation, 0.5, true);
        signAnimation = newAnimation
        let timeduration = newAnimation.getClip().duration
        while(traducir.length && !animations[traducir[0]]){
            traducir.shift()
        }
        newAnimation.play();
        setTimeout(() => {
            if (traducir.length) animNext()
        }, timeduration * 1000);
    }
    if (avatar.animations.length) {
        idleAnimation = mixer.clipAction(idleAnimationR.animations[0], root);
        idleAnimation.setEffectiveWeight(1);
        idleAnimation.play();
        setTimeout(() => {
            animNext()
        }, 1000);
    }
    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    return (
        <mesh ref={mesh} rotation={[0, 0, 0]} position={[0, -4.5, 0]}>
            <primitive object={avatar.scene} scale={3.3} />
        </mesh>
    );
}
