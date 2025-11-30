// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useFBX } from '@react-three/drei';
// import { useEffect, useRef } from 'react';
// import React from 'react';

// function Model() {
//   const mixer = useRef(null);

//   const model = useFBX('/character/myCharacter.fbx');
//   const idle = useFBX('/character/idle.fbx');

//   useEffect(() => {
//     mixer.current = new THREE.AnimationMixer(model);

//     // Name clips
//     idle.animations[0].name = 'Idle';

//     // Play idle animation
//     const action = mixer.current.clipAction(idle.animations[0]);
//     action.play();
//   }, [model, idle]);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   model.scale.set(0.02, 0.02, 0.02);
//   model.position.y = -1;

//   return React.createElement('primitive', { object: model });
// }

// export default function CharacterFBX() {
//   return React.createElement(
//     Canvas,
//     {
//       style: {
//         width: '100%',
//         height: '400px',
//       },
//     },
//     [
//       React.createElement('ambientLight', { intensity: 0.8, key: 'amb' }),
//       React.createElement('directionalLight', {
//         position: [5, 5, 5],
//         key: 'dir',
//       }),
//       React.createElement(Model, { key: 'model' }),
//       React.createElement(OrbitControls, {
//         enablePan: false,
//         key: 'orbit',
//       }),
//     ]
//   );
// }

//code 2
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { useEffect, useRef } from 'react';
// import React from 'react';

// // Preload base model + animations
// useGLTF.preload('/character/originalfbx.glb');
// useGLTF.preload('/character/idle.glb');
// useGLTF.preload('/character/drinking.glb');
// useGLTF.preload('/character/jumping_up.glb');
// useGLTF.preload('/character/picking_up.glb');
// useGLTF.preload('/character/pulling_rope.glb');
// useGLTF.preload('/character/push.glb');
// useGLTF.preload('/character/running.glb');
// useGLTF.preload('/character/stand_to_sit.glb');
// useGLTF.preload('/character/tripping.glb');
// useGLTF.preload('/character/turn_around.glb');
// useGLTF.preload('/character/walking.glb');

// function Model() {
//   const mixer = useRef(null);

//   const { scene: model } = useGLTF('/character/originalfbx.glb');
//   const idleData = useGLTF('/character/idle.glb');

//   useEffect(() => {
//     mixer.current = new THREE.AnimationMixer(model);

//     const idleClip = idleData.animations[0];
//     idleClip.name = 'Idle';

//     const action =  mixer.current.clipAction(idleClip);
//     action.play();
//   }, [model, idleData]);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   model.scale.set(10, 10, 10);
//   model.position.y = -1;

//   return React.createElement('primitive', { object: model });
// }

// export default function CharacterGLB() {
//   return React.createElement(
//     Canvas,
//     {
//       style: {
//         width: '100%',
//         height: '400px',
//       },
//     },
//     [
//       React.createElement('ambientLight', { intensity: 0.8, key: 'amb' }),
//       React.createElement('directionalLight', {
//         position: [5, 5, 5],
//         key: 'dir',
//       }),
//       React.createElement(Model, { key: 'model' }),
//       React.createElement(OrbitControls, {
//         enablePan: false,
//         key: 'orbit',
//       }),
//     ]
//   );
// }

//code 3
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import React, { useEffect, useRef } from 'react';

// // ---------------------------------------------------------
// // 1. ANIMATIONS LIST – ORDER IS ALSO KEYBOARD ORDER
// // ---------------------------------------------------------
// const animations = {
//   idle: '/character/idle.glb',
//   drinking: '/character/drinking.glb',
//   jumping_up: '/character/jumping_up.glb',
//   picking_up: '/character/picking_up.glb',
//   pulling_rope: '/character/pulling_rope.glb',
//   push: '/character/push.glb',
//   running: '/character/running.glb',
//   stand_to_sit: '/character/stand_to_sit.glb',
//   tripping: '/character/tripping.glb',
//   turn_around: '/character/turn_around.glb',
//   walking: '/character/walking.glb'
// };

// // Preload everything
// useGLTF.preload('/character/originalfbx.glb');
// Object.values(animations).forEach(path => useGLTF.preload(path));


// // ---------------------------------------------------------
// // 2. MODEL COMPONENT
// // ---------------------------------------------------------
// function Model({ onPlay }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const clips = useRef({});

//   // Load the base model
//   const { scene: model } = useGLTF('/character/originalfbx.glb');

//   // Load ALL animations ONLY ONCE
//   for (const [name, path] of Object.entries(animations)) {
//     const { animations: gltfClips } = useGLTF(path);
//     clips.current[name] = gltfClips[0];
//   }

//   // Play animation method
//   function playAnimation(name) {
//     const clip = clips.current[name];
//     if (!clip) return;

//     if (mixer.current) {
//       if (currentAction.current) currentAction.current.stop();
//       const action = mixer.current.clipAction(clip);
//       currentAction.current = action;
//       action.reset().fadeIn(0.15).play();
//     }
//   }

//   // Setup mixer
//   useEffect(() => {
//     mixer.current = new THREE.AnimationMixer(model);
//     playAnimation('idle');
//     onPlay(playAnimation);
//   }, [model, onPlay]);

//   // Update mixer
//   useFrame((_, delta) => {
//     mixer.current?.update(delta);
//   });

//   // Size and position
//   model.scale.set(2, 2, 2);
//   model.position.set(0, 0, 0);

//   model.rotation.y = -Math.PI/2;

//   return <primitive object={model} />;
// }


// // ---------------------------------------------------------
// // 3. MAIN COMPONENT
// // ---------------------------------------------------------
// export default function CharacterGLB() {
//   const play = useRef(null);

//   const ACTION_NAMES = Object.keys(animations);

//   // Keyboard mapping
//   const KEY_MAP = [
//     "q","w","e","r","t","y","u","i","o","p",
//     "a","s","d","f","g","h","j","k","l",
//     "z","x","c","v","b","n","m"
//   ];

//   // Handle keyboard events
//   useEffect(() => {
//     function handleKey(e) {
//       const index = KEY_MAP.indexOf(e.key.toLowerCase());
//       if (index >= 0 && index < ACTION_NAMES.length) {
//         play.current?.(ACTION_NAMES[index]);
//       }
//     }

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   // Button Styling
//   const btnStyle = {
//     padding: '10px 14px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#ffa600',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px'
//   };

//   return (
//     <div style={{
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'center',
//       marginTop: '-80px', // pulled UP from footer
//       marginBottom: '220px'
//     }}>

//       {/* LEFT BUTTONS */}
//       <div style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
//         {ACTION_NAMES.map((name, index) => (
//           <button
//             key={'L-'+name}
//             style={btnStyle}
//             onClick={() => play.current?.(name)}
//           >
//             {name.replace(/_/g, " ").toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* MODEL */}
//       <div style={{ width: 600, height: 500 }}>
//         <Canvas
//           camera={{ position: [0, 1.5, 5], fov: 40 }}
//           style={{ width: '100%', height: '100%' }}
//         >
//           {/* FRONT LIGHT (from the screen toward the model) */}
//           <directionalLight
//             position={[0, 0, 5]}
//             intensity={2.2}
//           />

//           {/* Fill light left */}
//           <directionalLight
//             position={[-5, 3, 2]}
//             intensity={15.0}
//           />

//           {/* Fill light right */}
//           <directionalLight
//             position={[5, 3, 2]}
//             intensity={15.0}
//           />

//           {/* Soft ambient */}
//           <ambientLight intensity={0.5} />

//           <Model onPlay={(fn) => (play.current = fn)} />
//           <OrbitControls enablePan={false} />
//         </Canvas>
//       </div>

//       {/* RIGHT BUTTONS */}
//       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 25 }}>
//         {ACTION_NAMES.map((name, index) => (
//           <button
//             key={'R-'+name}
//             style={btnStyle}
//             onClick={() => play.current?.(name)}
//           >
//             {name.replace(/_/g, " ").toUpperCase()}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import React, { useEffect, useRef, Suspense, useState } from 'react';

// const animations = {
//   idle: '/character/idle.glb',
//   drinking: '/character/drinking.glb',
//   jumping_up: '/character/jumping_up.glb',
//   picking_up: '/character/picking_up.glb',
//   pulling_rope: '/character/pulling_rope.glb',
//   push: '/character/push.glb',
//   running: '/character/running.glb',
//   stand_to_sit: '/character/stand_to_sit.glb',
//   tripping: '/character/tripping.glb',
//   turn_around: '/character/turn_around.glb',
//   walking: '/character/walking.glb'
// };

// // Preload all GLBs
// useGLTF.preload('/character/originalfbx.glb');
// Object.values(animations).forEach(path => useGLTF.preload(path));

// function Model({ onPlayReady }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);

//   // ✅ Load all GLBs individually (top-level hooks only)
//   const modelGLB = useGLTF('/character/originalfbx.glb');
//   const idleGLB = useGLTF(animations.idle);
//   const drinkingGLB = useGLTF(animations.drinking);
//   const jumpingGLB = useGLTF(animations.jumping_up);
//   const pickingGLB = useGLTF(animations.picking_up);
//   const pullingGLB = useGLTF(animations.pulling_rope);
//   const pushGLB = useGLTF(animations.push);
//   const runningGLB = useGLTF(animations.running);
//   const standGLB = useGLTF(animations.stand_to_sit);
//   const trippingGLB = useGLTF(animations.tripping);
//   const turnGLB = useGLTF(animations.turn_around);
//   const walkingGLB = useGLTF(animations.walking);

//   // ✅ Build clips object outside loops/hooks
//   const clips = {
//     idle: idleGLB.animations[0],
//     drinking: drinkingGLB.animations[0],
//     jumping_up: jumpingGLB.animations[0],
//     picking_up: pickingGLB.animations[0],
//     pulling_rope: pullingGLB.animations[0],
//     push: pushGLB.animations[0],
//     running: runningGLB.animations[0],
//     stand_to_sit: standGLB.animations[0],
//     tripping: trippingGLB.animations[0],
//     turn_around: turnGLB.animations[0],
//     walking: walkingGLB.animations[0]
//   };

//   function playAnimation(name) {
//     const clip = clips[name];
//     if (!clip || !mixer.current) return;
//     if (currentAction.current) currentAction.current.stop();
//     const action = mixer.current.clipAction(clip);
//     currentAction.current = action;
//     action.reset().fadeIn(0.15).play();
//   }

//   // ✅ Setup mixer after GLB is loaded
//   useEffect(() => {
//     mixer.current = new THREE.AnimationMixer(modelGLB.scene);
//     onPlayReady(playAnimation);
//     playAnimation('idle');
//   }, [modelGLB]);

//   useFrame((_, delta) => mixer.current?.update(delta));

//   modelGLB.scene.scale.set(2, 2, 2);
//   modelGLB.scene.rotation.y = -Math.PI / 2;

//   return <primitive object={modelGLB.scene} />;
// }

// export default function CharacterGLB() {
//   const [playFn, setPlayFn] = useState(null);
//   const ACTION_NAMES = Object.keys(animations);
//   const KEY_MAP = [
//     "q","w","e","r","t","y","u","i","o","p",
//     "a","s","d","f","g","h","j","k","l",
//     "z","x","c","v","b","n","m"
//   ];

//   // ✅ Keyboard listener
//   useEffect(() => {
//     function handleKey(e) {
//       const index = KEY_MAP.indexOf(e.key.toLowerCase());
//       if (index >= 0 && index < ACTION_NAMES.length && playFn) {
//         playFn(ACTION_NAMES[index]);
//       }
//     }
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [playFn]);

//   const btnStyle = {
//     padding: '10px 14px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#ffa600',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px'
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-80px', marginBottom: '220px' }}>
//       <div style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
//         {ACTION_NAMES.map(name => (
//           <button key={name} style={btnStyle} onClick={() => playFn && playFn(name)}>
//             {name.replace(/_/g, " ").toUpperCase()}
//           </button>
//         ))}
//       </div>

//       <div style={{ width: 600, height: 500 }}>
//         <Suspense fallback={null}>
//           <Canvas camera={{ position: [0, 1.5, 5], fov: 40 }} style={{ width: '100%', height: '100%' }}>
//             <directionalLight position={[0, 0, 5]} intensity={1.2} />
//             <directionalLight position={[-5, 3, 2]} intensity={0.6} />
//             <directionalLight position={[5, 3, 2]} intensity={0.6} />
//             <ambientLight intensity={0.5} />
//             <Model onPlayReady={fn => setPlayFn(() => fn)} />
//             <OrbitControls enablePan={false} />
//           </Canvas>
//         </Suspense>
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 25 }}>
//         {ACTION_NAMES.map(name => (
//           <button key={name+'r'} style={btnStyle} onClick={() => playFn && playFn(name)}>
//             {name.replace(/_/g, " ").toUpperCase()}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

//GLB VERSION BUT DOESN'T WORK
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';

// const animations = {
//   idle: '/character/idle.glb',
//   // drinking: '/character/drinking.glb',
//   // jumping_up: '/character/jumping_up.glb',
//   // picking_up: '/character/picking_up.glb',
//   // pulling_rope: '/character/pulling_rope.glb',
//   // push: '/character/push.glb',
//   running: '/character/running.glb',
//   // stand_to_sit: '/character/stand_to_sit.glb',
//   // tripping: '/character/tripping.glb',
//   // turn_around: '/character/turn_around.glb',
//   walking: '/character/walking.glb'
// };

// // Preload everything
// useGLTF.preload('/character/ORIGINAL.glb');
// Object.values(animations).forEach(path => useGLTF.preload(path));

// function Model({ onPlayReady }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);

//   // Load model
//   const modelGLB = useGLTF('/character/ORIGINAL.glb');

//   // Load all animation GLBs at top level
//   const idleGLB = useGLTF(animations.idle);
//   const drinkingGLB = useGLTF(animations.drinking);
//   const jumpingGLB = useGLTF(animations.jumping_up);
//   const pickingGLB = useGLTF(animations.picking_up);
//   const pullingGLB = useGLTF(animations.pulling_rope);
//   const pushGLB = useGLTF(animations.push);
//   const runningGLB = useGLTF(animations.running);
//   const standGLB = useGLTF(animations.stand_to_sit);
//   const trippingGLB = useGLTF(animations.tripping);
//   const turnGLB = useGLTF(animations.turn_around);
//   const walkingGLB = useGLTF(animations.walking);

//   // Store clips
//   const clips = {
//     idle: idleGLB.animations[0],
//     drinking: drinkingGLB.animations[0],
//     jumping_up: jumpingGLB.animations[0],
//     picking_up: pickingGLB.animations[0],
//     pulling_rope: pullingGLB.animations[0],
//     push: pushGLB.animations[0],
//     running: runningGLB.animations[0],
//     stand_to_sit: standGLB.animations[0],
//     tripping: trippingGLB.animations[0],
//     turn_around: turnGLB.animations[0],
//     walking: walkingGLB.animations[0]
//   };

//   // Play animation function
//   function playAnimation(name) {
//     const clip = clips[name];
//     if (!clip || !mixer.current) return;
//     if (currentAction.current) currentAction.current.stop();
//     const action = mixer.current.clipAction(clip, modelGLB.scene);
//     currentAction.current = action;
//     action.reset().fadeIn(0.15).play();
//   }

//   useEffect(() => {
//     mixer.current = new THREE.AnimationMixer(modelGLB.scene);
//     onPlayReady(playAnimation); // give control to parent
//     playAnimation('idle');
//   }, [modelGLB]);

//   useFrame((_, delta) => mixer.current?.update(delta));

//   modelGLB.scene.scale.set(2, 2, 2);
//   modelGLB.scene.rotation.y = -Math.PI / 2;

//   return <primitive object={modelGLB.scene} />;
// }

// export default function CharacterGLB() {
//   const [playFn, setPlayFn] = useState(null);
//   const ACTION_NAMES = Object.keys(animations);
//   const KEY_MAP = [
//     "q","w","e","r","t","y","u","i","o","p",
//     "a","s","d","f","g","h","j","k","l",
//     "z","x","c","v","b","n","m"
//   ];

//   // Keyboard support
//   useEffect(() => {
//     function handleKey(e) {
//       const index = KEY_MAP.indexOf(e.key.toLowerCase());
//       if (index >= 0 && index < ACTION_NAMES.length && playFn) {
//         playFn(ACTION_NAMES[index]);
//       }
//     }
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [playFn]);

//   const btnStyle = {
//     padding: '10px 14px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#ffa600',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px'
//   };

//   const buttons = ACTION_NAMES.map(name => (
//     <button key={name} style={btnStyle} onClick={() => playFn && playFn(name)}>
//       {name.replace(/_/g, " ").toUpperCase()}
//     </button>
//   ));

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-80px', marginBottom: '220px' }}>
//       <div style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
//         {buttons}
//       </div>

//       <div style={{ width: 600, height: 500 }}>
//         <Suspense fallback={null}>
//           <Canvas camera={{ position: [0, 1.5, 5], fov: 40 }} style={{ width: '100%', height: '100%' }}>
//             <directionalLight position={[0, 0, 5]} intensity={1.2} />
//             <directionalLight position={[-5, 3, 2]} intensity={0.6} />
//             <directionalLight position={[5, 3, 2]} intensity={0.6} />
//             <ambientLight intensity={0.5} />
//             <Model onPlayReady={fn => setPlayFn(() => fn)} />
//             <OrbitControls enablePan={false} />
//           </Canvas>
//         </Suspense>
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 25 }}>
//         {buttons}
//       </div>
//     </div>
//   );
// }


//FBX slow synchronous issues delayed buttons
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   // Load FBX model
//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.01, 0.01, 0.01);
//       // model.rotation.y = Math.PI;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       // Load animations
//       const loadAnim = (name, file) => {
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;

//           if (name === 'idle') {
//             currentAction.current = action;
//             action.play();
//           }
//         });
//       };

//       Object.entries(animations).forEach(([name, file]) =>
//         loadAnim(name, file)
//       );

//       onReady((name) => playAnimation(name));
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;

//       if (currentAction.current) {
//         currentAction.current.fadeOut(0.2);
//       }

//       const action = actions.current[name];
//       currentAction.current = action;

//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   // Update mixer
//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);

//   const buttonStyle = {
//     padding: '12px 18px',
//     margin: '8px 0',
//     borderRadius: '10px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '160px',
//     fontSize: '15px'
//   };

//   return (
//     <div
//   style={{
//     display: 'flex',
//     justifyContent: 'center', // centers the whole block horizontally
//     alignItems: 'center',     // vertically centers canvas and buttons relative to each other
//     gap: '40px',              // space between canvas and buttons
//     marginTop: '-40px',        // optional spacing from top
//   }}
// >
//   {/* CANVAS */}
//   <div style={{ width: '700px', height: '600px', borderRadius: '12px', overflow: 'hidden' }}>
//     <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
//       <ambientLight intensity={0.4} />
//       <directionalLight position={[5, 3, 5]} intensity={4.4} />
//       <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//       <Suspense fallback={null}>
//         <FBXModel onReady={(fn) => setPlay(() => fn)} />
//       </Suspense>
//       <OrbitControls enablePan={false} />
//     </Canvas>
//   </div>

//   {/* BUTTONS ON THE RIGHT */}
//   <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '-180px' }}>
//     {Object.keys(animations).map((name) => (
//       <button
//         key={name}
//         style={buttonStyle}
//         onClick={() => play && play(name)}
//       >
//         {name.toUpperCase()}
//       </button>
//     ))}
//   </div>
// </div>


//   );
// }

//fbx works great with low poly with some minor things
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   tripping: '/character/Tripping.fbx',
//   turn: '/character/TurnAround.fbx',
//   twist: 'character/TwistDancing.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.01, 0.01, 0.01);
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       // Load idle first
//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         // Model ready, buttons can react
//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       // Load other animations in the background
//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const buttonStyle = {
//     padding: '12px 18px',
//     margin: '8px 0',
//     borderRadius: '10px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '160px',
//     fontSize: '15px'
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: '40px',
//         marginTop: '-40px',
//         position: 'relative'
//       }}
//     >
//       {/* CANVAS */}
//       <div style={{ width: '700px', height: '600px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
//         {loading && (
//           <div
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '80px',
//               height: '80px',
//               border: '8px solid #ccc',
//               borderTop: '8px solid #007aff',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               zIndex: 10
//             }}
//           />
//         )}

//         <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
//           <ambientLight intensity={0.4} />
//           <directionalLight position={[5, 3, 5]} intensity={4.4} />
//           <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//           <Suspense fallback={null}>
//             <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//           </Suspense>
//           <OrbitControls enablePan={false} />
//         </Canvas>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: translate(-50%, -50%) rotate(0deg); }
//               100% { transform: translate(-50%, -50%) rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>

//       {/* BUTTONS ON THE RIGHT */}
//       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '-190px'}}>
//         {Object.keys(animations).map((name) => (
//           <button
//             key={name}
//             style={buttonStyle}
//             onClick={() => play && play(name)}
//           >
//             {name.toUpperCase()}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

//code 4 
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   tripping: '/character/Tripping.fbx',
//   turn: '/character/TurnAround.fbx',
//   twist: 'character/TwistDancing.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022); // slightly bigger for more space
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       // Load idle first
//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         // Model ready, buttons can react
//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       // Load other animations in the background
//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '170px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   // Split buttons into two columns
//   const animKeys = Object.keys(animations);
//   const half = Math.ceil(animKeys.length / 2);
//   const leftButtons = animKeys.slice(0, half);
//   const rightButtons = animKeys.slice(half);

//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '180px 1fr 180px', // left, center, right
//         gap: '20px',
//         alignItems: 'start',
//         marginTop: '-40px',
//         width: 'calc(180px + 400px + 180px + 20px*2)', // total width of grid
//         marginLeft: 'auto',  // centers horizontally
//         marginRight: 'auto', // centers horizontally
//       }}
//     >
//       {/* LEFT BUTTONS */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//         {leftButtons.map((name, i) => (
//           <button
//             key={name}
//             style={buttonStyle}
//             onClick={() => play && play(name)}
//           >
//              {name.replace(/_/g, ' ').toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* CANVAS */}
//       <div
//         style={{
//           width: '400px', // bigger canvas
//           height: '500px',
//           borderRadius: '12px',
//           overflow: 'hidden',
//           position: 'relative',
//           background: '#e0e0e0'
//         }}
//       >
//         {loading && (
//           <div
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '180px',
//               height: '180px',
//               border: '8px solid #ccc',
//               borderTop: '8px solid #007aff',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               zIndex: 10
//             }}
//           />
//         )}

//         <Canvas style={{ width: '100%', height: '100%' }} 
//           camera={{ position: [0, 1.5, 4], fov: 40 }}>
//           <ambientLight intensity={0.4} />
//           <directionalLight position={[5, 3, 5]} intensity={4.4} />
//           <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//           <Suspense fallback={null}>
//             <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//           </Suspense>
//           <OrbitControls enablePan={false} />
//         </Canvas>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: translate(-50%, -50%) rotate(0deg); }
//               100% { transform: translate(-50%, -50%) rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>

//       {/* RIGHT BUTTONS */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//         {rightButtons.map((name) => (
//           <button
//             key={name}
//             style={buttonStyle}
//             onClick={() => play && play(name)}
//           >
//             {name.replace(/_/g, ' ').toUpperCase()}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

//code 7 works great but not for phones
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   tripping: '/character/Tripping.fbx',
//   turn: '/character/TurnAround.fbx',
//   twist: 'character/TwistDancing.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2; // lower the model
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       // Load idle first
//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       // Load other animations
//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '170px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   const animKeys = Object.keys(animations);
//   const half = Math.ceil(animKeys.length / 2);
//   const leftButtons = animKeys.slice(0, half);
//   const rightButtons = animKeys.slice(half);

//   return (
//     // OUTER FLEX CONTAINER TO CENTER GRID
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center', // center horizontally
//         marginTop: '-35px'
//       }}
//     >
//       {/* GRID: left buttons / canvas / right buttons */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '180px 400px 180px',
//           gap: '20px',
//           alignItems: 'start'
//         }}
//       >
//         {/* LEFT BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {leftButtons.map((name) => (
//             <button
//               key={name}
//               style={buttonStyle}
//               onClick={() => play && play(name)}
//             >
//               {name.replace(/_/g, ' ').toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* CANVAS */}
//         <div
//           style={{
//             width: '400px',
//             height: '500px',
//             borderRadius: '12px',
//             overflow: 'hidden',
//             position: 'relative',
//             background: '#e0e0e0'
//           }}
//         >
//           {loading && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '180px',
//                 height: '180px',
//                 border: '8px solid #ccc',
//                 borderTop: '8px solid #007aff',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite',
//                 zIndex: 10
//               }}
//             />
//           )}

//           <Canvas style={{ width: '100%', height: '100%' }}
//             camera={{ position: [0, 1.5, 4], fov: 40 }}>
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 3, 5]} intensity={4.4} />
//             <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//             <Suspense fallback={null}>
//               <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//             </Suspense>
//             <OrbitControls enablePan={false} />
//           </Canvas>

//           <style>{`
//             @keyframes spin {
//               0% { transform: translate(-50%, -50%) rotate(0deg); }
//               100% { transform: translate(-50%, -50%) rotate(360deg); }
//             }
//           `}</style>
//         </div>

//         {/* RIGHT BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {rightButtons.map((name) => (
//             <button
//               key={name}
//               style={buttonStyle}
//               onClick={() => play && play(name)}
//             >
//               {name.replace(/_/g, ' ').toUpperCase()}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//code 8 works but buttons overlap footer, no keys.
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   tripping: '/character/Tripping.fbx',
//   turn: '/character/Turn.fbx',
//   twist: '/character/TwistDancing.fbx',
//   turn_around: '/character/TurnAround.fbx',
//   punching: '/character/Punching.fbx',
//   hanging: '/character/Hanging.fbx',
//   laying: '/character/Laying.fbx',
//   mission_impossible: '/character/Falling.fbx',
//   check_surroundings: '/character/checkSurroundings.fbx',
//   play_golf: '/character/PlayGolf.fbx',
//   land: '/character/Land.fbx',
//   swimming: '/character/Swimming.fbx',
//   cartwheel: '/character/Cartwheel.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       // Load idle first
//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       // Load other animations
//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '170px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   const animKeys = Object.keys(animations);
//   const half = Math.ceil(animKeys.length / 2);
//   const leftButtons = animKeys.slice(0, half);
//   const rightButtons = animKeys.slice(half);

//   return (
//     <div className='hide-on-phone' 
//       style={{ display: 'flex', justifyContent: 'center', marginTop: '-35px' }}>
//       {/* GRID: left buttons / canvas / right buttons */}
//       <div className="grid-container" style={{
//         display: 'grid',
//         gridTemplateColumns: '180px 400px 180px',
//         gap: '20px',
//         alignItems: 'start'
//       }}>
//         {/* LEFT BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {leftButtons.map((name) => (
//             <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//               {name.replace(/_/g, ' ').toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* CANVAS */}
//         <div className="canvas-container" style={{
//           width: '400px',
//           height: '500px',
//           borderRadius: '12px',
//           overflow: 'hidden',
//           position: 'relative',
//           background: '#e0e0e0'
//         }}>
//           {loading && (
//             <div className="loader" style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '180px',
//               height: '180px',
//               border: '8px solid #ccc',
//               borderTop: '8px solid #007aff',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               zIndex: 10
//             }} />
//           )}

//           <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 3, 5]} intensity={4.4} />
//             <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//             <Suspense fallback={null}>
//               <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//             </Suspense>
//             <OrbitControls enablePan={false} />
//           </Canvas>

//           <style>{`
//             @keyframes spin {
//               0% { transform: translate(-50%, -50%) rotate(0deg); }
//               100% { transform: translate(-50%, -50%) rotate(360deg); }
//             }
//           `}</style>
//         </div>

//         {/* RIGHT BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {rightButtons.map((name) => (
//             <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//               {name.replace(/_/g, ' ').toUpperCase()}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* RESPONSIVE MEDIA QUERIES */}
//       <style jsx>{`
//         @media (max-width: 1024px) {
//           .grid-container {
//             grid-template-columns: 140px 320px 140px !important;
//             gap: 15px !important;
//           }
//           .canvas-container {
//             width: 320px !important;
//             height: 400px !important;
//           }
//           button {
//             font-size: 13px !important;
//             width: 130px !important;
//             padding: 16px 0 !important;
//           }
//         }
//         @media (max-width: 768px) {
//           .grid-container {
//             grid-template-columns: 120px 240px 120px !important;
//             gap: 10px !important;
//           }
//           .canvas-container {
//             width: 240px !important;
//             height: 300px !important;
//           }
//           button {
//             font-size: 12px !important;
//             width: 110px !important;
//             padding: 12px 0 !important;
//           }
//         }
//         @media (max-width: 480px) {
        
//           .hide-on-phone{
//             display:none !important;
//           }

//           .grid-container {
//             grid-template-columns: 100px 180px 100px !important;
//             gap: 8px !important;
//           }
//           .canvas-container {
//             width: 180px !important;
//             height: 225px !important;
//           }
//           button {
//             font-size: 11px !important;
//             width: 90px !important;
//             padding: 10px 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//code 9 works great but needs responsiveness
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   trip_and_fall: '/character/Tripping.fbx',
//   turn: '/character/Turn.fbx',
//   dance: '/character/TwistDancing.fbx',
//   turn_around: '/character/TurnAround.fbx',
//   punching: '/character/Punching.fbx',
//   hanging: '/character/Hanging.fbx',
//   lying: '/character/Lying.fbx',
//   mission_impossible: '/character/Falling.fbx',
//   check_surroundings: '/character/checkSurroundings.fbx',
//   play_golf: '/character/PlayGolf.fbx',
//   land: '/character/Land.fbx',
//   swimming: '/character/Swimming.fbx',
//   cartwheel: '/character/Cartwheel.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const animKeys = Object.keys(animations);

//   // Split buttons into four columns: leftExtra / left / right / rightExtra
//   const quarter = Math.ceil(animKeys.length / 4);
//   const leftExtraButtons = animKeys.slice(0, quarter);
//   const leftButtons = animKeys.slice(quarter, 2 * quarter);
//   const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
//   const rightExtraButtons = animKeys.slice(3 * quarter);

//   const placeholderKeys = animKeys.map((_, i) => String.fromCharCode(65 + i % 26));

//   useEffect(() => {
//     const handleKey = (e) => {
//       const index = placeholderKeys.findIndex(k => k.toLowerCase() === e.key.toLowerCase());
//       if (index !== -1 && play) play(animKeys[index]);
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [play]);

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   return (
//     <div className='hide-on-phone' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-70px' }}>

//       {/* KEY DISPLAY ABOVE CANVAS
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
//         {placeholderKeys.map((key, i) => (
//           <div key={i} style={{
//             padding: '4px 6px',
//             border: '1px solid #007aff',
//             borderRadius: '4px',
//             fontWeight: 'bold',
//             color: '#007aff'
//           }}>{key}</div>
//         ))}
//       </div> */}

//       {/* GRID: Extra Left / Left / Canvas / Right / Extra Right */}
//       <div className="grid-container" style={{
//         display: 'grid',
//         gridTemplateColumns: '150px 150px 400px 150px 150px',
//         gap: '15px',
//         alignItems: 'start'
//       }}>

//         {/* LEFT EXTRA BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {leftExtraButtons.map((name, i) => (
//             <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//               {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[i]})
//             </button>
//           ))}
//         </div>

//         {/* LEFT BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {leftButtons.map((name, i) => (
//             <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//               {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[i + leftExtraButtons.length]})
//             </button>
//           ))}
//         </div>

//         {/* CANVAS */}
//         <div className="canvas-container" style={{
//           width: '400px',
//           height: '500px',
//           borderRadius: '12px',
//           overflow: 'hidden',
//           position: 'relative',
//           background: '#e0e0e0'
//         }}>
//           {loading && (
//             <div className="loader" style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '180px',
//               height: '180px',
//               border: '8px solid #ccc',
//               borderTop: '8px solid #007aff',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               zIndex: 10
//             }} />
//           )}

//           <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 3, 5]} intensity={4.4} />
//             <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//             <Suspense fallback={null}>
//               <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//             </Suspense>
//             <OrbitControls enablePan={false} />
//           </Canvas>

//           <style>{`
//             @keyframes spin {
//               0% { transform: translate(-50%, -50%) rotate(0deg); }
//               100% { transform: translate(-50%, -50%) rotate(360deg); }
//             }
//           `}</style>
//         </div>

//         {/* RIGHT BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {rightButtons.map((name, i) => (
//             <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//               {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[i + leftExtraButtons.length + leftButtons.length]})
//             </button>
//           ))}
//         </div>

//         {/* RIGHT EXTRA BUTTONS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {rightExtraButtons.map((name, i) => (
//             <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//               {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[i + leftExtraButtons.length + leftButtons.length + rightButtons.length]})
//             </button>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }


// //code 10 works great without the music
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------t
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   trip_and_fall: '/character/Tripping.fbx',
//   turn: '/character/Turn.fbx',
//   dance: '/character/TwistDancing.fbx',
//   turn_around: '/character/TurnAround.fbx',
//   punching: '/character/Punching.fbx',
//   hanging: '/character/Hanging.fbx',
//   lying: '/character/Lying.fbx',
//   mission_impossible: '/character/Falling.fbx',
//   check_surroundings: '/character/checkSurroundings.fbx',
//   play_golf: '/character/PlayGolf.fbx',
//   land: '/character/Land.fbx',
//   swimming: '/character/Swimming.fbx',
//   cartwheel: '/character/Cartwheel.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

//   const animKeys = Object.keys(animations);

//   // Split buttons into four columns: leftExtra / left / right / rightExtra
//   const quarter = Math.ceil(animKeys.length / 4);
//   const leftExtraButtons = animKeys.slice(0, quarter);
//   const leftButtons = animKeys.slice(quarter, 2 * quarter);
//   const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
//   const rightExtraButtons = animKeys.slice(3 * quarter);

//   const placeholderKeys = animKeys.map((_, i) => String.fromCharCode(65 + i % 26));

//   // Handle window resize for mobile/tablet
//   useEffect(() => {
//     const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       const index = placeholderKeys.findIndex(k => k.toLowerCase() === e.key.toLowerCase());
//       if (index !== -1 && play) play(animKeys[index]);
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [play]);

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   const allButtons = [...leftExtraButtons, ...leftButtons, ...rightButtons, ...rightExtraButtons];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-70px' }}>
//       {isMobileOrTablet ? (
//         <>
//           {/* Canvas */}
//           <div className="canvas-container" style={{ width: '100%', maxWidth: '400px', height: '500px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto' }}>
//             {loading && (
//               <div style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '180px',
//                 height: '180px',
//                 border: '8px solid #ccc',
//                 borderTop: '8px solid #007aff',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite',
//                 zIndex: 10
//               }} />
//             )}
//             <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//               <ambientLight intensity={0.4} />
//               <directionalLight position={[5, 3, 5]} intensity={4.4} />
//               <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//               <Suspense fallback={null}>
//                 <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//               </Suspense>
//               <OrbitControls enablePan={false} />
//             </Canvas>
//           </div>

//           {/* All buttons stacked below canvas */}
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
//             {allButtons.map((name, i) => (
//               <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//                 {name.replace(/_/g, ' ').toUpperCase()} ({String.fromCharCode(65 + i % 26)})
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <>
//           {/* Desktop: keep old 5-column layout */}
//           <div className="grid-container" style={{
//             display: 'grid',
//             gridTemplateColumns: '150px 150px 400px 150px 150px',
//             gap: '15px',
//             alignItems: 'start'
//           }}>
//             {[leftExtraButtons, leftButtons, <div key="canvas" className="canvas-container" style={{
//               width: '400px',
//               height: '500px',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               position: 'relative',
//               background: '#e0e0e0'
//             }}>
//               <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//                 <ambientLight intensity={0.4} />
//                 <directionalLight position={[5, 3, 5]} intensity={4.4} />
//                 <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//                 <Suspense fallback={null}>
//                   <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//                 </Suspense>
//                 <OrbitControls enablePan={false} />
//               </Canvas>
//             </div>, rightButtons, rightExtraButtons].map((column, i) =>
//               <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                 {Array.isArray(column) ? column.map((name, j) => (
//                   <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//                     {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[j + (i > 0 ? i * quarter : 0)]})
//                   </button>
//                 )) : column}
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <style>{`
//         @keyframes spin {
//           0% { transform: translate(-50%, -50%) rotate(0deg); }
//           100% { transform: translate(-50%, -50%) rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

//code 10.5
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------t
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   trip_and_fall: '/character/Tripping.fbx',
//   turn: '/character/Turn.fbx',
//   dance: '/character/TwistDancing.fbx',
//   turn_around: '/character/TurnAround.fbx',
//   punching: '/character/Punching.fbx',
//   hanging: '/character/Hanging.fbx',
//   lying: '/character/Lying.fbx',
//   mission_impossible: '/character/Falling.fbx',
//   check_surroundings: '/character/checkSurroundings.fbx',
//   play_golf: '/character/PlayGolf.fbx',
//   land: '/character/Land.fbx',
//   swimming: '/character/Swimming.fbx',
//   cartwheel: '/character/Cartwheel.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;
//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

//   const animKeys = Object.keys(animations);

//   // Split buttons into four columns: leftExtra / left / right / rightExtra
//   const quarter = Math.ceil(animKeys.length / 4);
//   const leftExtraButtons = animKeys.slice(0, quarter);
//   const leftButtons = animKeys.slice(quarter, 2 * quarter);
//   const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
//   const rightExtraButtons = animKeys.slice(3 * quarter);

//   const placeholderKeys = animKeys.map((_, i) => String.fromCharCode(65 + i % 26));

//   // Handle window resize for mobile/tablet
//   useEffect(() => {
//     const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       const index = placeholderKeys.findIndex(k => k.toLowerCase() === e.key.toLowerCase());
//       if (index !== -1 && play) play(animKeys[index]);
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [play]);

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   const allButtons = [...leftExtraButtons, ...leftButtons, ...rightButtons, ...rightExtraButtons];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-70px' }}>
//       {isMobileOrTablet ? (
//         <>
//           {/* Canvas */}
//           <div className="canvas-container" style={{ width: '100%', maxWidth: '400px', height: '500px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto' }}>
//             {loading && (
//               <div style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '180px',
//                 height: '180px',
//                 border: '8px solid #ccc',
//                 borderTop: '8px solid #007aff',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite',
//                 zIndex: 10
//               }} />
//             )}
//             <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//               <ambientLight intensity={0.4} />
//               <directionalLight position={[5, 3, 5]} intensity={4.4} />
//               <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//               <Suspense fallback={null}>
//                 <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//               </Suspense>
//               <OrbitControls enablePan={false} />
//             </Canvas>
//           </div>

//           {/* All buttons stacked below canvas */}
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
//             {allButtons.map((name, i) => (
//               <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//                 {name.replace(/_/g, ' ').toUpperCase()} ({String.fromCharCode(65 + i % 26)})
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <>
//           {/* Desktop: keep old 5-column layout */}
//           <div className="grid-container" style={{
//             display: 'grid',
//             gridTemplateColumns: '150px 150px 400px 150px 150px',
//             gap: '15px',
//             alignItems: 'start'
//           }}>
//             {[leftExtraButtons, leftButtons, <div key="canvas" className="canvas-container" style={{
//               width: '400px',
//               height: '500px',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               position: 'relative',
//               background: '#e0e0e0'
//             }}>
//               <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//                 <ambientLight intensity={0.4} />
//                 <directionalLight position={[5, 3, 5]} intensity={4.4} />
//                 <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//                 <Suspense fallback={null}>
//                   <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//                 </Suspense>
//                 <OrbitControls enablePan={false} />
//               </Canvas>
//             </div>, rightButtons, rightExtraButtons].map((column, i, arr) =>
//               <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                 {Array.isArray(column) ? column.map((name, j) => {
//                   // fixed letter calculation ignoring canvas column
//                   const prevButtonsCount = arr.slice(0, i).reduce((sum, c) => Array.isArray(c) ? sum + c.length : sum, 0);
//                   return (
//                     <button key={name} style={buttonStyle} onClick={() => play && play(name)}>
//                       {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[(prevButtonsCount + j) % 26]})
//                     </button>
//                   );
//                 }) : column}
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <style>{`
//         @keyframes spin {
//           0% { transform: translate(-50%, -50%) rotate(0deg); }
//           100% { transform: translate(-50%, -50%) rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

//code 10.9
'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// ---------------------------------------------------
// ANIMATION FILES (FBX)
// ---------------------------------------------------
const animations = {
  idle: '/character/Idle.fbx',
  walk: '/character/Walking.fbx',
  run: '/character/Running.fbx',
  stretch: '/character/ArmStretching.fbx',
  capoeira: '/character/Capoeira.fbx',
  kicking: '/character/Kicking.fbx',
  jump: '/character/Jumping.fbx',
  pull: '/character/PullingARope.fbx',
  push: '/character/Push.fbx',
  sit: '/character/Sit.fbx',
  pick_up_and_throw: '/character/Throw.fbx',
  trip_and_fall: '/character/Tripping.fbx',
  turn: '/character/Turn.fbx',
  dance: '/character/TwistDancing.fbx',
  turn_around: '/character/TurnAround.fbx',
  punching: '/character/Punching.fbx',
  hanging: '/character/Hanging.fbx',
  lying: '/character/Lying.fbx',
  mission_impossible: '/character/Falling.fbx',
  check_surroundings: '/character/checkSurroundings.fbx',
  play_golf: '/character/PlayGolf.fbx',
  land: '/character/Land.fbx',
  swimming: '/character/Swimming.fbx',
  cartwheel: '/character/Cartwheel.fbx'
};

// ---------------------------------------------------
// MODEL COMPONENT
// ---------------------------------------------------
function FBXModel({ onReady, setLoading }) {
  const mixer = useRef(null);
  const currentAction = useRef(null);
  const actions = useRef({});
  const group = useRef();

  useEffect(() => {
    const loader = new FBXLoader();

    loader.load('/character/riggedORIGINAL.fbx', (model) => {
      model.scale.set(0.022, 0.022, 0.022);
      model.position.y = -1.2;
      group.current.add(model);

      mixer.current = new THREE.AnimationMixer(model);

      loader.load(animations.idle, (anim) => {
        const action = mixer.current.clipAction(anim.animations[0]);
        actions.current['idle'] = action;
        currentAction.current = action;
        action.play();

        onReady((name) => playAnimation(name));
        setLoading(false);
      });

      Object.entries(animations).forEach(([name, file]) => {
        if (name === 'idle') return;
        loader.load(file, (anim) => {
          const action = mixer.current.clipAction(anim.animations[0]);
          actions.current[name] = action;
        });
      });
    });

    const playAnimation = (name) => {
      if (!actions.current[name]) return;

      if (currentAction.current) currentAction.current.fadeOut(0.2);
      const action = actions.current[name];
      currentAction.current = action;
      action.reset().fadeIn(0.2).play();
    };
  }, []);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <group ref={group} />;
}

// ---------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------
export default function CharacterFBX() {
  const [play, setPlay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const animKeys = Object.keys(animations);
  const quarter = Math.ceil(animKeys.length / 4);

  const leftExtraButtons = animKeys.slice(0, quarter);
  const leftButtons = animKeys.slice(quarter, 2 * quarter);
  const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
  const rightExtraButtons = animKeys.slice(3 * quarter);

  const placeholderKeys = animKeys.map((_, i) => String.fromCharCode(65 + i % 26));

  // AUDIO
  const audioRef = useRef(new Audio('/music/sir.m4a'));

  // Handle window resize for mobile/tablet
  useEffect(() => {
    const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard
  useEffect(() => {
    const handleKey = (e) => {
      const index = placeholderKeys.findIndex(k => k.toLowerCase() === e.key.toLowerCase());
      if (index !== -1 && play) handlePlay(animKeys[index]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [play]);

  const handlePlay = (name) => {
    if (!play) return;

    // Play animation
    play(name);

    // Play/stop music
    if (name === 'dance') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const buttonStyle = {
    padding: '20px 0px',
    margin: '6px 0',
    borderRadius: '8px',
    background: '#007aff',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '150px',
    fontSize: '14px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    textAlign: 'center'
  };

  const allButtons = [...leftExtraButtons, ...leftButtons, ...rightButtons, ...rightExtraButtons];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-70px' }}>
      {isMobileOrTablet ? (
        <>
          {/* Canvas */}
          <div className="canvas-container" style={{ width: '100%', maxWidth: '400px', height: '500px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto' }}>
            {loading && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '180px', height: '180px',
                border: '8px solid #ccc',
                borderTop: '8px solid #007aff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                zIndex: 10
              }} />
            )}
            <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 3, 5]} intensity={4.4} />
              <directionalLight position={[-5, 3, 5]} intensity={4.4} />
              <Suspense fallback={null}>
                <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
              </Suspense>
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
            {allButtons.map((name, i) => (
              <button key={name} style={buttonStyle} onClick={() => handlePlay(name)}>
                {name.replace(/_/g, ' ').toUpperCase()} ({String.fromCharCode(65 + i % 26)})
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Desktop grid layout */}
          <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: '150px 150px 400px 150px 150px', gap: '15px', alignItems: 'start' }}>
            {[leftExtraButtons, leftButtons, <div key="canvas" className="canvas-container" style={{ width: '400px', height: '500px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#e0e0e0' }}>
              <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 3, 5]} intensity={4.4} />
                <directionalLight position={[-5, 3, 5]} intensity={4.4} />
                <Suspense fallback={null}>
                  <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
                </Suspense>
                <OrbitControls enablePan={false} />
              </Canvas>
            </div>, rightButtons, rightExtraButtons].map((column, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Array.isArray(column) ? column.map((name, j) => {
                  const globalIndex = allButtons.indexOf(name); // exact position in full list
                  return (
                    <button key={name} style={buttonStyle} onClick={() => handlePlay(name)}>
                      {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[globalIndex % 26]})
                    </button>
                  )
                }) : column}

              </div>
            ))}
          </div>
        </>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}



// code 11 to add music but some issues, use it as a learning lesson in your free time no less.
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // ANIMATION FILES (FBX)
// // ---------------------------------------------------
// const animations = {
//   idle: '/character/Idle.fbx',
//   walk: '/character/Walking.fbx',
//   run: '/character/Running.fbx',
//   stretch: '/character/ArmStretching.fbx',
//   capoeira: '/character/Capoeira.fbx',
//   kicking: '/character/Kicking.fbx',
//   jump: '/character/Jumping.fbx',
//   pull: '/character/PullingARope.fbx',
//   push: '/character/Push.fbx',
//   sit: '/character/Sit.fbx',
//   pick_up_and_throw: '/character/Throw.fbx',
//   trip_and_fall: '/character/Tripping.fbx',
//   turn: '/character/Turn.fbx',
//   dance: '/character/TwistDancing.fbx',
//   turn_around: '/character/TurnAround.fbx',
//   punching: '/character/Punching.fbx',
//   hanging: '/character/Hanging.fbx',
//   lying: '/character/Lying.fbx',
//   mission_impossible: '/character/Falling.fbx',
//   check_surroundings: '/character/checkSurroundings.fbx',
//   play_golf: '/character/PlayGolf.fbx',
//   land: '/character/Land.fbx',
//   swimming: '/character/Swimming.fbx',
//   cartwheel: '/character/Cartwheel.fbx'
// };

// // ---------------------------------------------------
// // MODEL COMPONENT
// // ---------------------------------------------------
// function FBXModel({ onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       loader.load(animations.idle, (anim) => {
//         const action = mixer.current.clipAction(anim.animations[0]);
//         actions.current['idle'] = action;
//         currentAction.current = action;
//         action.play();

//         onReady((name) => playAnimation(name));
//         setLoading(false);
//       });

//       Object.entries(animations).forEach(([name, file]) => {
//         if (name === 'idle') return;
//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;
//         });
//       });
//     });

//     const playAnimation = (name) => {
//       if (!actions.current[name]) return;

//       if (currentAction.current) currentAction.current.fadeOut(0.2);
//       const action = actions.current[name];
//       currentAction.current = action;
//       action.reset().fadeIn(0.2).play();
//     };
//   }, []);

//   useFrame((_, delta) => {
//     if (mixer.current) mixer.current.update(delta);
//   });

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN EXPORT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

//   const animKeys = Object.keys(animations);
//   const quarter = Math.ceil(animKeys.length / 4);

//   const leftExtraButtons = animKeys.slice(0, quarter);
//   const leftButtons = animKeys.slice(quarter, 2 * quarter);
//   const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
//   const rightExtraButtons = animKeys.slice(3 * quarter);

//   const placeholderKeys = animKeys.map((_, i) => String.fromCharCode(65 + i % 26));

//   // AUDIO
//   const audioRef = useRef(new Audio('/music/sir.m4a'));

//   // Handle window resize for mobile/tablet
//   useEffect(() => {
//     const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle keyboard
//   useEffect(() => {
//     const handleKey = (e) => {
//       const index = placeholderKeys.findIndex(k => k.toLowerCase() === e.key.toLowerCase());
//       if (index !== -1 && play) play(animKeys[index]);
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [play]);

//   const handlePlay = (name) => {
//     if (!play) return;

//     // Play animation
//     play(name);

//     // Play/stop music
//     if (name === 'dance') {
//       audioRef.current.currentTime = 0;
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//     }
//   };

//   const buttonStyle = {
//     padding: '20px 0px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px',
//     whiteSpace: 'normal',
//     wordWrap: 'break-word',
//     textAlign: 'center'
//   };

//   const allButtons = [...leftExtraButtons, ...leftButtons, ...rightButtons, ...rightExtraButtons];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-70px' }}>
//       {isMobileOrTablet ? (
//         <>
//           {/* Canvas */}
//           <div className="canvas-container" style={{ width: '100%', maxWidth: '400px', height: '500px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto' }}>
//             {loading && (
//               <div style={{
//                 position: 'absolute', top: '50%', left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '180px', height: '180px',
//                 border: '8px solid #ccc',
//                 borderTop: '8px solid #007aff',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite',
//                 zIndex: 10
//               }} />
//             )}
//             <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//               <ambientLight intensity={0.4} />
//               <directionalLight position={[5, 3, 5]} intensity={4.4} />
//               <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//               <Suspense fallback={null}>
//                 <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//               </Suspense>
//               <OrbitControls enablePan={false} />
//             </Canvas>
//           </div>

//           {/* Buttons */}
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
//             {allButtons.map((name, i) => (
//               <button key={name} style={buttonStyle} onClick={() => handlePlay(name)}>
//                 {name.replace(/_/g, ' ').toUpperCase()} ({String.fromCharCode(65 + i % 26)})
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <>
//           {/* Desktop grid layout */}
//           <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: '150px 150px 400px 150px 150px', gap: '15px', alignItems: 'start' }}>
//             {[leftExtraButtons, leftButtons, <div key="canvas" className="canvas-container" style={{ width: '400px', height: '500px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#e0e0e0' }}>
//               <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1.5, 4], fov: 40 }}>
//                 <ambientLight intensity={0.4} />
//                 <directionalLight position={[5, 3, 5]} intensity={4.4} />
//                 <directionalLight position={[-5, 3, 5]} intensity={4.4} />
//                 <Suspense fallback={null}>
//                   <FBXModel onReady={(fn) => setPlay(() => fn)} setLoading={setLoading} />
//                 </Suspense>
//                 <OrbitControls enablePan={false} />
//               </Canvas>
//             </div>, rightButtons, rightExtraButtons].map((column, i) => (
//               <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                 {Array.isArray(column) ? column.map((name, j) => (
//                   <button key={name} style={buttonStyle} onClick={() => handlePlay(name)}>
//                     {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[j + (i > 0 ? i * quarter : 0)]})
//                   </button>
//                 )) : column}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//       <style>{`
//         @keyframes spin {
//           0% { transform: translate(-50%, -50%) rotate(0deg); }
//           100% { transform: translate(-50%, -50%) rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }
