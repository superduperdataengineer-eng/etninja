// code 10.9
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
//       if (index !== -1 && play) handlePlay(animKeys[index]);
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
//     textAlign: 'center',
//     padding: '20px'
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
//                 {Array.isArray(column) ? column.map((name, j) => {
//                   const globalIndex = allButtons.indexOf(name); // exact position in full list
//                   return (
//                     <button key={name} style={buttonStyle} onClick={() => handlePlay(name)}>
//                       {name.replace(/_/g, ' ').toUpperCase()} ({placeholderKeys[globalIndex % 26]})
//                     </button>
//                   )
//                 }) : column}

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




//code 13 works great, but tts works for chrome great not the others
// 'use client';

// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// // ---------------------------------------------------
// // SET 1
// // ---------------------------------------------------
// const animationsSet1 = {
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
// // SET 2
// // ---------------------------------------------------
// const animationsSet2 = {
//   check_shoe: '/character/CheckShoe.fbx',
//   play_guitar: '/character/GuitarPlaying.fbx',
//   shaking_hands: '/character/ShakingHands.fbx',
//   pet_animal: '/character/PettingAnimal.fbx',
//   kneel_and_pray: '/character/PrayAndKneel.fbx',
//   find: '/character/Find.fbx',
//   driving: '/character/Driving.fbx',
//   blow_a_kiss: '/character/BlowAKiss.fbx',
//   get_up: '/character/GetUp.fbx',
//   open_close_go_in: '/character/OpenCloseGoIn.fbx',
//   put_down: '/character/PuttingDown.fbx',
//   grab_get: '/character/GrabGet.fbx',
//   pick_up_put_down: '/character/PickUpPutDown.fbx'
// };

// // ---------------------------------------------------
// // TRANSLATIONS
// // ---------------------------------------------------
// const translations = {
//   english: {
//     idle: 'Idle',
//     walk: 'Walk',
//     run: 'Run',
//     stretch: 'Stretch',
//     capoeira: 'Capoeira',
//     kicking: 'Kicking',
//     jump: 'Jump',
//     pull: 'Pull',
//     push: 'Push',
//     sit: 'Sit',
//     pick_up_and_throw: 'Pick Up and Throw',
//     trip_and_fall: 'Trip and Fall',
//     turn: 'Turn',
//     dance: 'Dance',
//     turn_around: 'Turn Around',
//     punching: 'Punching',
//     hanging: 'Hanging',
//     lying: 'Lying',
//     mission_impossible: 'Mission Impossible',
//     check_surroundings: 'Check Surroundings',
//     play_golf: 'Play Golf',
//     land: 'Land',
//     swimming: 'Swimming',
//     cartwheel: 'Cartwheel',
//     check_shoe: 'Check Shoe',
//     play_guitar: 'Play Guitar',
//     shaking_hands: 'Shaking Hands',
//     pet_animal: 'Pet Animal',
//     kneel_and_pray: 'Kneel and Pray',
//     find: 'Find',
//     driving: 'Driving',
//     blow_a_kiss: 'Blow a Kiss',
//     get_up: 'Get Up',
//     open_close_go_in: 'Open/Close/Go In',
//     put_down: 'Put Down',
//     grab_get: 'Grab/Get',
//     pick_up_put_down: 'Pick Up/Put Down'
//   },
//   portuguese: {
//     idle: 'Parado',
//     walk: 'Andar',
//     run: 'Correr',
//     stretch: 'Alongar',
//     capoeira: 'Capoeira',
//     kicking: 'Chutar',
//     jump: 'Pular',
//     pull: 'Puxar',
//     push: 'Empurrar',
//     sit: 'Sentar',
//     pick_up_and_throw: 'Pegar e Jogar',
//     trip_and_fall: 'Tropeçar e Cair',
//     turn: 'Virar',
//     dance: 'Dançar',
//     turn_around: 'Virar-se',
//     punching: 'Socar',
//     hanging: 'Pendurar',
//     lying: 'Deitar',
//     mission_impossible: 'Missão Impossível',
//     check_surroundings: 'Verificar Ao Redor',
//     play_golf: 'Jogar Golfe',
//     land: 'Pousar',
//     swimming: 'Nadar',
//     cartwheel: 'Aureola',
//     check_shoe: 'Ver Sapato',
//     play_guitar: 'Tocar Guitarra',
//     shaking_hands: 'Apertar Mãos',
//     pet_animal: 'Fazer Carinho no Animal',
//     kneel_and_pray: 'Ajoelhar e Orar',
//     find: 'Encontrar',
//     driving: 'Dirigir',
//     blow_a_kiss: 'Mandar Beijo',
//     get_up: 'Levantar-se',
//     open_close_go_in: 'Abrir/Fechar/Entrar',
//     put_down: 'Colocar',
//     grab_get: 'Pegar',
//     pick_up_put_down: 'Pegar/Colocar'
//   },
//   spanish: {
//     idle: 'Quieto',
//     walk: 'Caminar',
//     run: 'Correr',
//     stretch: 'Estirar',
//     capoeira: 'Capoeira',
//     kicking: 'Patear',
//     jump: 'Saltar',
//     pull: 'Tirar',
//     push: 'Empujar',
//     sit: 'Sentarse',
//     pick_up_and_throw: 'Recoger y Lanzar',
//     trip_and_fall: 'Tropezar y Caer',
//     turn: 'Girar',
//     dance: 'Bailar',
//     turn_around: 'Girar',
//     punching: 'Golpear',
//     hanging: 'Colgado',
//     lying: 'Acostado',
//     mission_impossible: 'Misión Imposible',
//     check_surroundings: 'Revisar Alrededores',
//     play_golf: 'Jugar Golf',
//     land: 'Aterrizar',
//     swimming: 'Nadar',
//     cartwheel: 'Voltereta',
//     check_shoe: 'Revisar Zapato',
//     play_guitar: 'Tocar Guitarra',
//     shaking_hands: 'Dar la Mano',
//     pet_animal: 'Acariciar Animal',
//     kneel_and_pray: 'Arrodillarse y Orar',
//     find: 'Encontrar',
//     driving: 'Conducir',
//     blow_a_kiss: 'Mandar Beso',
//     get_up: 'Levantarse',
//     open_close_go_in: 'Abrir/Cerrar/Entrar',
//     put_down: 'Dejar',
//     grab_get: 'Tomar',
//     pick_up_put_down: 'Recoger/Dejar'
//   },
//   italian: {
//     idle: 'Fermo',
//     walk: 'Camminare',
//     run: 'Correre',
//     stretch: 'Allungare',
//     capoeira: 'Capoeira',
//     kicking: 'Calciare',
//     jump: 'Saltare',
//     pull: 'Tirare',
//     push: 'Spingere',
//     sit: 'Sedersi',
//     pick_up_and_throw: 'Prendere e Lanciare',
//     trip_and_fall: 'Inciampare e Cadere',
//     turn: 'Girare',
//     dance: 'Danzare',
//     turn_around: 'Voltarsi',
//     punching: 'Pugni',
//     hanging: 'Appeso',
//     lying: 'Sdraiato',
//     mission_impossible: 'Missione Impossibile',
//     check_surroundings: 'Controlla Intorno',
//     play_golf: 'Giocare a Golf',
//     land: 'Atterrare',
//     swimming: 'Nuotare',
//     cartwheel: 'Capriola',
//     check_shoe: 'Controlla Scarpe',
//     play_guitar: 'Suonare Chitarra',
//     shaking_hands: 'Stringere Mani',
//     pet_animal: 'Accarezzare Animale',
//     kneel_and_pray: 'Inginocchiarsi e Pregare',
//     find: 'Trovare',
//     driving: 'Guidare',
//     blow_a_kiss: 'Mandare Bacio',
//     get_up: 'Alzarsi',
//     open_close_go_in: 'Aprire/Chiudere/Entrare',
//     put_down: 'Posare',
//     grab_get: 'Prendere',
//     pick_up_put_down: 'Prendere/Posare'
//   },
//   french: {
//     idle: 'Inactif',
//     walk: 'Marcher',
//     run: 'Courir',
//     stretch: 'Étirement',
//     capoeira: 'Capoeira',
//     kicking: 'Coup de pied',
//     jump: 'Sauter',
//     pull: 'Tirer',
//     push: 'Pousser',
//     sit: 'S’asseoir',
//     pick_up_and_throw: 'Ramasser et Lancer',
//     trip_and_fall: 'Trébucher et Tomber',
//     turn: 'Tourner',
//     dance: 'Danser',
//     turn_around: 'Faire demi-tour',
//     punching: 'Frapper',
//     hanging: 'Suspendu',
//     lying: 'Allongé',
//     mission_impossible: 'Mission Impossible',
//     check_surroundings: 'Vérifier les environs',
//     play_golf: 'Jouer au Golf',
//     land: 'Atterrir',
//     swimming: 'Nager',
//     cartwheel: 'Roue',
//     check_shoe: 'Vérifier Chaussure',
//     play_guitar: 'Jouer Guitare',
//     shaking_hands: 'Se serrer la main',
//     pet_animal: 'Caresser Animal',
//     kneel_and_pray: 'S’agenouiller et prier',
//     find: 'Trouver',
//     driving: 'Conduire',
//     blow_a_kiss: 'Envoyer un baiser',
//     get_up: 'Se Lever',
//     open_close_go_in: 'Ouvrir/Fermer/Entrer',
//     put_down: 'Poser',
//     grab_get: 'Prendre',
//     pick_up_put_down: 'Ramasser/Poser'
//   },
//   german: {
//     idle: 'Stillstehen',
//     walk: 'Gehen',
//     run: 'Laufen',
//     stretch: 'Dehnen',
//     capoeira: 'Capoeira',
//     kicking: 'Treten',
//     jump: 'Springen',
//     pull: 'Ziehen',
//     push: 'Schieben',
//     sit: 'Sitzen',
//     pick_up_and_throw: 'Aufheben und Werfen',
//     trip_and_fall: 'Stolpern und Fallen',
//     turn: 'Drehen',
//     dance: 'Tanzen',
//     turn_around: 'Umdrehen',
//     punching: 'Schlagen',
//     hanging: 'Hängen',
//     lying: 'Liegen',
//     mission_impossible: 'Unmögliche Mission',
//     check_surroundings: 'Umsehen',
//     play_golf: 'Golf Spielen',
//     land: 'Landen',
//     swimming: 'Schwimmen',
//     cartwheel: 'Radschlag',
//     check_shoe: 'Schuh Prüfen',
//     play_guitar: 'Gitarre Spielen',
//     shaking_hands: 'Händeschütteln',
//     pet_animal: 'Tier Streicheln',
//     kneel_and_pray: 'Knieen und Beten',
//     find: 'Finden',
//     driving: 'Fahren',
//     blow_a_kiss: 'Küsschen Geben',
//     get_up: 'Aufstehen',
//     open_close_go_in: 'Öffnen/Schließen/Einsteigen',
//     put_down: 'Ablegen',
//     grab_get: 'Greifen',
//     pick_up_put_down: 'Aufheben/Ablegen'
//   },
//   japanese: {
//     idle: '待機',
//     walk: '歩く',
//     run: '走る',
//     stretch: 'ストレッチ',
//     capoeira: 'カポエイラ',
//     kicking: '蹴る',
//     jump: 'ジャンプ',
//     pull: '引く',
//     push: '押す',
//     sit: '座る',
//     pick_up_and_throw: '拾って投げる',
//     trip_and_fall: 'つまずいて転ぶ',
//     turn: '回る',
//     dance: '踊る',
//     turn_around: '回転',
//     punching: 'パンチ',
//     hanging: 'ぶら下がる',
//     lying: '横たわる',
//     mission_impossible: 'ミッションインポッシブル',
//     check_surroundings: '周囲確認',
//     play_golf: 'ゴルフ',
//     land: '着地',
//     swimming: '泳ぐ',
//     cartwheel: '側転',
//     check_shoe: '靴チェック',
//     play_guitar: 'ギターを弾く',
//     shaking_hands: '握手',
//     pet_animal: '動物をなでる',
//     kneel_and_pray: 'ひざまずいて祈る',
//     find: '見つける',
//     driving: '運転',
//     blow_a_kiss: 'キスを送る',
//     get_up: '立ち上がる',
//     open_close_go_in: '開ける/閉める/入る',
//     put_down: '置く',
//     grab_get: '取る',
//     pick_up_put_down: '拾う/置く'
//   },
//   chinese: {
//     idle: '待机',
//     walk: '走',
//     run: '跑',
//     stretch: '伸展',
//     capoeira: '卡波耶拉',
//     kicking: '踢',
//     jump: '跳',
//     pull: '拉',
//     push: '推',
//     sit: '坐下',
//     pick_up_and_throw: '捡起并扔',
//     trip_and_fall: '绊倒',
//     turn: '转',
//     dance: '跳舞',
//     turn_around: '转身',
//     punching: '拳击',
//     hanging: '悬挂',
//     lying: '躺下',
//     mission_impossible: '不可能的任务',
//     check_surroundings: '检查周围',
//     play_golf: '打高尔夫',
//     land: '着陆',
//     swimming: '游泳',
//     cartwheel: '侧手翻',
//     check_shoe: '检查鞋子',
//     play_guitar: '弹吉他',
//     shaking_hands: '握手',
//     pet_animal: '抚摸动物',
//     kneel_and_pray: '跪下祈祷',
//     find: '找到',
//     driving: '驾驶',
//     blow_a_kiss: '飞吻',
//     get_up: '起身',
//     open_close_go_in: '开/关/进入',
//     put_down: '放下',
//     grab_get: '抓取',
//     pick_up_put_down: '捡起/放下'
//   },
//   korean: {
//     idle: '대기',
//     walk: '걷기',
//     run: '달리기',
//     stretch: '스트레칭',
//     capoeira: '카포에이라',
//     kicking: '차기',
//     jump: '점프',
//     pull: '당기기',
//     push: '밀기',
//     sit: '앉기',
//     pick_up_and_throw: '줍고 던지기',
//     trip_and_fall: '넘어지고 떨어지기',
//     turn: '돌기',
//     dance: '춤추기',
//     turn_around: '회전',
//     punching: '주먹질',
//     hanging: '매달리기',
//     lying: '눕기',
//     mission_impossible: '미션 임파서블',
//     check_surroundings: '주변 확인',
//     play_golf: '골프',
//     land: '착지',
//     swimming: '수영',
//     cartwheel: '측구르기',
//     check_shoe: '신발 확인',
//     play_guitar: '기타 연주',
//     shaking_hands: '악수',
//     pet_animal: '동물 쓰다듬기',
//     kneel_and_pray: '무릎 꿇고 기도하기',
//     find: '찾기',
//     driving: '운전',
//     blow_a_kiss: '키스 날리기',
//     get_up: '일어나기',
//     open_close_go_in: '열기/닫기/들어가기',
//     put_down: '내려놓기',
//     grab_get: '잡기',
//     pick_up_put_down: '줍기/내려놓기'
//   }
// };

// // ---------------------------------------------------
// // FBX Model Component
// // ---------------------------------------------------
// function FBXModel({ animations, onReady, setLoading }) {
//   const mixer = useRef(null);
//   const currentAction = useRef(null);
//   const actions = useRef({});
//   const group = useRef();

//   useEffect(() => {
//     const loader = new FBXLoader();

//     group.current.clear();
//     actions.current = {};
//     currentAction.current = null;

//     loader.load('/character/riggedORIGINAL.fbx', (model) => {
//       model.scale.set(0.022, 0.022, 0.022);
//       model.position.y = -1.2;
//       group.current.add(model);

//       mixer.current = new THREE.AnimationMixer(model);

//       Object.entries(animations).forEach(([name, file]) => {
//         if (typeof file !== 'string') {
//           console.warn(`Invalid FBX path for animation "${name}"`, file);
//           return;
//         }

//         loader.load(file, (anim) => {
//           const action = mixer.current.clipAction(anim.animations[0]);
//           actions.current[name] = action;

//           if (!currentAction.current) {
//             currentAction.current = action;
//             action.play();
//             setLoading(false);
//           }
//         });
//       });

//       onReady((name) => {
//         if (!actions.current[name]) return;
//         currentAction.current?.fadeOut(0.2);
//         currentAction.current = actions.current[name];
//         currentAction.current.reset().fadeIn(0.2).play();
//       });
//     });

//     return () => mixer.current?.stopAllAction();
//   }, [animations]);

//   useFrame((_, delta) => mixer.current?.update(delta));

//   return <group ref={group} />;
// }

// // ---------------------------------------------------
// // MAIN COMPONENT
// // ---------------------------------------------------
// export default function CharacterFBX() {
//   const [play, setPlay] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeSet, setActiveSet] = useState(1);
//   const [language, setLanguage] = useState('english');
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

//   const activeAnimations = activeSet === 1 ? animationsSet1 : animationsSet2;
//   const animKeys = Object.keys(activeAnimations);
//   const quarter = Math.ceil(animKeys.length / 4);

//   const leftExtraButtons = animKeys.slice(0, quarter);
//   const leftButtons = animKeys.slice(quarter, 2 * quarter);
//   const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
//   const rightExtraButtons = animKeys.slice(3 * quarter);

//   const placeholderKeys = animKeys.map((_, i) =>
//     String.fromCharCode(65 + (i % 26))
//   );

//   useEffect(() => {
//     const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       const index = placeholderKeys.findIndex(
//         k => k.toLowerCase() === e.key.toLowerCase()
//       );
//       if (index !== -1 && play) play(animKeys[index]);
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [play, animKeys]);

//   const buttonStyle = {
//     padding: '20px',
//     margin: '6px 0',
//     borderRadius: '8px',
//     background: '#007aff',
//     border: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     width: '150px',
//     fontSize: '14px',
//     textAlign: 'center'
//   };

//   const allButtons = [
//     ...leftExtraButtons,
//     ...leftButtons,
//     ...rightButtons,
//     ...rightExtraButtons
//   ];

//   // ---------------------------------------------------
//   // AUDIO PRONUNCIATION HELPER
//   // ---------------------------------------------------

//   const languageToBCP47 = {
//     english: 'en-US',
//     portuguese: 'pt-BR',
//     spanish: 'es-ES',
//     french: 'fr-FR',
//     german: 'de-DE',
//     italian: 'it-IT',
//     japanese: 'ja-JP',
//     chinese: 'zh-CN',
//     korean: 'ko-KR'
//   };

//   let cachedVoices = [];

//   function loadVoices() {
//     return new Promise(resolve => {
//       const voices = speechSynthesis.getVoices();
//       if (voices.length) {
//         cachedVoices = voices;
//         resolve(voices);
//       } else {
//         speechSynthesis.onvoiceschanged = () => {
//           cachedVoices = speechSynthesis.getVoices();
//           resolve(cachedVoices);
//         };
//       }
//     });
//   }

//   // async function speakText(text, language) {
//   //   await loadVoices();

//   //   const utterance = new SpeechSynthesisUtterance(text);
//   //   utterance.lang = languageToBCP47[language];

//   //   // Pick the most natural voice available
//   //   const voice = cachedVoices.find(v =>
//   //     v.lang === utterance.lang && v.name.toLowerCase().includes('neural')
//   //   ) || cachedVoices.find(v => v.lang === utterance.lang);

//   //   if (voice) utterance.voice = voice;

//   //   utterance.rate = 0.92;   // natural pacing
//   //   utterance.pitch = 1.0;   // neutral pitch

//   //   speechSynthesis.cancel();
//   //   speechSynthesis.speak(utterance);
//   // }
//   async function speakText(text, language) {
//     await loadVoices();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = languageToBCP47[language];

//     let voice = null;

//     // SPECIAL CASE: ENGLISH (avoid robotic defaults)
//     if (language === 'english') {
//       voice =
//         cachedVoices.find(v => v.name.includes('Google US English')) ||
//         cachedVoices.find(v => v.name.includes('Microsoft David')) ||
//         cachedVoices.find(v => v.name.includes('Microsoft Zira')) ||
//         cachedVoices.find(v => v.lang === 'en-US');
//     } else {
//       // Other languages already sound good
//       voice =
//         cachedVoices.find(v => v.lang === utterance.lang && v.name.toLowerCase().includes('neural')) ||
//         cachedVoices.find(v => v.lang === utterance.lang);
//     }

//     if (voice) utterance.voice = voice;

//     // These values reduce "robot feel"
//     utterance.rate = 0.9;
//     utterance.pitch = 1.05;
//     utterance.volume = 1;

//     speechSynthesis.cancel();
//     speechSynthesis.speak(utterance);
//   }


//   async function playPronunciation(animationKey, text, language) {
//     const audioPath = `/TPRSounds/${animationKey}.m4a`;

//     try {
//       const audio = new Audio(audioPath);
//       audio.preload = 'auto';

//       audio.onerror = async () => {
//         await speakText(text, language);
//       };

//       await audio.play();
//     } catch {
//       await speakText(text, language);
//     }
//   }


//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       {/* LANGUAGE SWITCH */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(5, 1fr)',
//           gap: '8px',
//           marginBottom: '10px',
//           width: 'max-content'
//         }}
//       >
//         {Object.keys(translations).map(lang => (
//           <button key={lang} style={buttonStyle} onClick={() => setLanguage(lang)}>
//             {lang.toUpperCase()}
//           </button>
//         ))}
//       </div>


//       {/* SET SWITCH */}
//       <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//         <button style={buttonStyle} onClick={() => setActiveSet(1)}>SET 1</button>
//         <button style={buttonStyle} onClick={() => setActiveSet(2)}>SET 2</button>
//       </div>

//       {/* DESKTOP LAYOUT */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '150px 150px 400px 150px 150px',
//           gap: '15px'
//         }}
//       >
//         {[leftExtraButtons, leftButtons,
//           <Canvas key="canvas" camera={{ position: [0, 1.5, 4], fov: 40 }}>
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 3, 5]} intensity={4.4} />
//             <Suspense fallback={null}>
//               <FBXModel
//                 animations={activeAnimations}
//                 onReady={(fn) => setPlay(() => fn)}
//                 setLoading={setLoading}
//               />
//             </Suspense>
//             <OrbitControls enablePan={false} />
//           </Canvas>,
//           rightButtons, rightExtraButtons].map((col, i) => (
//           <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
//             {Array.isArray(col)
//               ? col.map((name, j) => (
//                   <button
//                     key={name}
//                     style={buttonStyle}
//                    onClick={() => {
//                     play?.(name);

//                     const spokenText = translations[language][name] || name;
//                     playPronunciation(name, spokenText, language);
//                   }}

//                   >
//                     {translations[language][name] || name} ({placeholderKeys[allButtons.indexOf(name)]})
//                   </button>
//                 ))
//               : col}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//code 16
'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// ---------------------------------------------------
// SET 1
// ---------------------------------------------------
const animationsSet1 = {
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
// SET 2
// ---------------------------------------------------
const animationsSet2 = {
  check_shoe: '/character/CheckShoe.fbx',
  play_guitar: '/character/GuitarPlaying.fbx',
  shaking_hands: '/character/ShakingHands.fbx',
  pet_animal: '/character/PettingAnimal.fbx',
  kneel_and_pray: '/character/PrayAndKneel.fbx',
  find: '/character/Find.fbx',
  driving: '/character/Driving.fbx',
  blow_a_kiss: '/character/BlowAKiss.fbx',
  get_up: '/character/GetUp.fbx',
  open_close_go_in: '/character/OpenCloseGoIn.fbx',
  put_down: '/character/PutDown.fbx',
  grab_get: '/character/GrabGet.fbx',
  pick_up_put_down: '/character/PickUpPutDown.fbx'
};

// ---------------------------------------------------
// TRANSLATIONS
// ---------------------------------------------------
const translations = {
  english: {
    idle: 'Idle',
    walk: 'Walk',
    run: 'Run',
    stretch: 'Stretch',
    capoeira: 'Capoeira',
    kicking: 'Kicking',
    jump: 'Jump',
    pull: 'Pull',
    push: 'Push',
    sit: 'Sit',
    pick_up_and_throw: 'Pick Up and Throw',
    trip_and_fall: 'Trip and Fall',
    turn: 'Turn',
    dance: 'Dance',
    turn_around: 'Turn Around',
    punching: 'Punching',
    hanging: 'Hanging',
    lying: 'Lying',
    mission_impossible: 'Mission Impossible',
    check_surroundings: 'Check Surroundings',
    play_golf: 'Play Golf',
    land: 'Land',
    swimming: 'Swimming',
    cartwheel: 'Cartwheel',
    check_shoe: 'Check Shoe',
    play_guitar: 'Play Guitar',
    shaking_hands: 'Shaking Hands',
    pet_animal: 'Pet Animal',
    kneel_and_pray: 'Kneel and Pray',
    find: 'Find',
    driving: 'Driving',
    blow_a_kiss: 'Blow a Kiss',
    get_up: 'Get Up',
    open_close_go_in: 'Open/Close/Go In',
    put_down: 'Put Down',
    grab_get: 'Grab/Get',
    pick_up_put_down: 'Pick Up/Put Down'
  },
  portuguese: {
    idle: 'Parado',
    walk: 'Andar',
    run: 'Correr',
    stretch: 'Alongar',
    capoeira: 'Capoeira',
    kicking: 'Chutar',
    jump: 'Pular',
    pull: 'Puxar',
    push: 'Empurrar',
    sit: 'Sentar',
    pick_up_and_throw: 'Pegar e Jogar',
    trip_and_fall: 'Tropeçar e Cair',
    turn: 'Virar',
    dance: 'Dançar',
    turn_around: 'Virar-se',
    punching: 'Socar',
    hanging: 'Pendurar',
    lying: 'Deitar',
    mission_impossible: 'Missão Impossível',
    check_surroundings: 'Verificar Ao Redor',
    play_golf: 'Jogar Golfe',
    land: 'Pousar',
    swimming: 'Nadar',
    cartwheel: 'Aureola',
    check_shoe: 'Ver Sapato',
    play_guitar: 'Tocar Guitarra',
    shaking_hands: 'Apertar Mãos',
    pet_animal: 'Fazer Carinho no Animal',
    kneel_and_pray: 'Ajoelhar e Orar',
    find: 'Encontrar',
    driving: 'Dirigir',
    blow_a_kiss: 'Mandar Beijo',
    get_up: 'Levantar-se',
    open_close_go_in: 'Abrir/Fechar/Entrar',
    put_down: 'Colocar',
    grab_get: 'Pegar',
    pick_up_put_down: 'Pegar/Colocar'
  },
  spanish: {
    idle: 'Quieto',
    walk: 'Caminar',
    run: 'Correr',
    stretch: 'Estirar',
    capoeira: 'Capoeira',
    kicking: 'Patear',
    jump: 'Saltar',
    pull: 'Tirar',
    push: 'Empujar',
    sit: 'Sentarse',
    pick_up_and_throw: 'Recoger y Lanzar',
    trip_and_fall: 'Tropezar y Caer',
    turn: 'Girar',
    dance: 'Bailar',
    turn_around: 'Girar',
    punching: 'Golpear',
    hanging: 'Colgado',
    lying: 'Acostado',
    mission_impossible: 'Misión Imposible',
    check_surroundings: 'Revisar Alrededores',
    play_golf: 'Jugar Golf',
    land: 'Aterrizar',
    swimming: 'Nadar',
    cartwheel: 'Voltereta',
    check_shoe: 'Revisar Zapato',
    play_guitar: 'Tocar Guitarra',
    shaking_hands: 'Dar la Mano',
    pet_animal: 'Acariciar Animal',
    kneel_and_pray: 'Arrodillarse y Orar',
    find: 'Encontrar',
    driving: 'Conducir',
    blow_a_kiss: 'Mandar Beso',
    get_up: 'Levantarse',
    open_close_go_in: 'Abrir/Cerrar/Entrar',
    put_down: 'Dejar',
    grab_get: 'Tomar',
    pick_up_put_down: 'Recoger/Dejar'
  },
  italian: {
    idle: 'Fermo',
    walk: 'Camminare',
    run: 'Correre',
    stretch: 'Allungare',
    capoeira: 'Capoeira',
    kicking: 'Calciare',
    jump: 'Saltare',
    pull: 'Tirare',
    push: 'Spingere',
    sit: 'Sedersi',
    pick_up_and_throw: 'Prendere e Lanciare',
    trip_and_fall: 'Inciampare e Cadere',
    turn: 'Girare',
    dance: 'Danzare',
    turn_around: 'Voltarsi',
    punching: 'Pugni',
    hanging: 'Appeso',
    lying: 'Sdraiato',
    mission_impossible: 'Missione Impossibile',
    check_surroundings: 'Controlla Intorno',
    play_golf: 'Giocare a Golf',
    land: 'Atterrare',
    swimming: 'Nuotare',
    cartwheel: 'Capriola',
    check_shoe: 'Controlla Scarpe',
    play_guitar: 'Suonare Chitarra',
    shaking_hands: 'Stringere Mani',
    pet_animal: 'Accarezzare Animale',
    kneel_and_pray: 'Inginocchiarsi e Pregare',
    find: 'Trovare',
    driving: 'Guidare',
    blow_a_kiss: 'Mandare Bacio',
    get_up: 'Alzarsi',
    open_close_go_in: 'Aprire/Chiudere/Entrare',
    put_down: 'Posare',
    grab_get: 'Prendere',
    pick_up_put_down: 'Prendere/Posare'
  },
  french: {
    idle: 'Inactif',
    walk: 'Marcher',
    run: 'Courir',
    stretch: 'Étirement',
    capoeira: 'Capoeira',
    kicking: 'Coup de pied',
    jump: 'Sauter',
    pull: 'Tirer',
    push: 'Pousser',
    sit: 'S’asseoir',
    pick_up_and_throw: 'Ramasser et Lancer',
    trip_and_fall: 'Trébucher et Tomber',
    turn: 'Tourner',
    dance: 'Danser',
    turn_around: 'Faire demi-tour',
    punching: 'Frapper',
    hanging: 'Suspendu',
    lying: 'Allongé',
    mission_impossible: 'Mission Impossible',
    check_surroundings: 'Vérifier les environs',
    play_golf: 'Jouer au Golf',
    land: 'Atterrir',
    swimming: 'Nager',
    cartwheel: 'Roue',
    check_shoe: 'Vérifier Chaussure',
    play_guitar: 'Jouer Guitare',
    shaking_hands: 'Se serrer la main',
    pet_animal: 'Caresser Animal',
    kneel_and_pray: 'S’agenouiller et prier',
    find: 'Trouver',
    driving: 'Conduire',
    blow_a_kiss: 'Envoyer un baiser',
    get_up: 'Se Lever',
    open_close_go_in: 'Ouvrir/Fermer/Entrer',
    put_down: 'Poser',
    grab_get: 'Prendre',
    pick_up_put_down: 'Ramasser/Poser'
  },
  german: {
    idle: 'Stillstehen',
    walk: 'Gehen',
    run: 'Laufen',
    stretch: 'Dehnen',
    capoeira: 'Capoeira',
    kicking: 'Treten',
    jump: 'Springen',
    pull: 'Ziehen',
    push: 'Schieben',
    sit: 'Sitzen',
    pick_up_and_throw: 'Aufheben und Werfen',
    trip_and_fall: 'Stolpern und Fallen',
    turn: 'Drehen',
    dance: 'Tanzen',
    turn_around: 'Umdrehen',
    punching: 'Schlagen',
    hanging: 'Hängen',
    lying: 'Liegen',
    mission_impossible: 'Unmögliche Mission',
    check_surroundings: 'Umsehen',
    play_golf: 'Golf Spielen',
    land: 'Landen',
    swimming: 'Schwimmen',
    cartwheel: 'Radschlag',
    check_shoe: 'Schuh Prüfen',
    play_guitar: 'Gitarre Spielen',
    shaking_hands: 'Händeschütteln',
    pet_animal: 'Tier Streicheln',
    kneel_and_pray: 'Knieen und Beten',
    find: 'Finden',
    driving: 'Fahren',
    blow_a_kiss: 'Küsschen Geben',
    get_up: 'Aufstehen',
    open_close_go_in: 'Öffnen/Schließen/Einsteigen',
    put_down: 'Ablegen',
    grab_get: 'Greifen',
    pick_up_put_down: 'Aufheben/Ablegen'
  },
  japanese: {
    idle: '待機',
    walk: '歩く',
    run: '走る',
    stretch: 'ストレッチ',
    capoeira: 'カポエイラ',
    kicking: '蹴る',
    jump: 'ジャンプ',
    pull: '引く',
    push: '押す',
    sit: '座る',
    pick_up_and_throw: '拾って投げる',
    trip_and_fall: 'つまずいて転ぶ',
    turn: '回る',
    dance: '踊る',
    turn_around: '回転',
    punching: 'パンチ',
    hanging: 'ぶら下がる',
    lying: '横たわる',
    mission_impossible: 'ミッションインポッシブル',
    check_surroundings: '周囲確認',
    play_golf: 'ゴルフ',
    land: '着地',
    swimming: '泳ぐ',
    cartwheel: '側転',
    check_shoe: '靴チェック',
    play_guitar: 'ギターを弾く',
    shaking_hands: '握手',
    pet_animal: '動物をなでる',
    kneel_and_pray: 'ひざまずいて祈る',
    find: '見つける',
    driving: '運転',
    blow_a_kiss: 'キスを送る',
    get_up: '立ち上がる',
    open_close_go_in: '開ける/閉める/入る',
    put_down: '置く',
    grab_get: '取る',
    pick_up_put_down: '拾う/置く'
  },
  chinese: {
    idle: '待机',
    walk: '走',
    run: '跑',
    stretch: '伸展',
    capoeira: '卡波耶拉',
    kicking: '踢',
    jump: '跳',
    pull: '拉',
    push: '推',
    sit: '坐下',
    pick_up_and_throw: '捡起并扔',
    trip_and_fall: '绊倒',
    turn: '转',
    dance: '跳舞',
    turn_around: '转身',
    punching: '拳击',
    hanging: '悬挂',
    lying: '躺下',
    mission_impossible: '不可能的任务',
    check_surroundings: '检查周围',
    play_golf: '打高尔夫',
    land: '着陆',
    swimming: '游泳',
    cartwheel: '侧手翻',
    check_shoe: '检查鞋子',
    play_guitar: '弹吉他',
    shaking_hands: '握手',
    pet_animal: '抚摸动物',
    kneel_and_pray: '跪下祈祷',
    find: '找到',
    driving: '驾驶',
    blow_a_kiss: '飞吻',
    get_up: '起身',
    open_close_go_in: '开/关/进入',
    put_down: '放下',
    grab_get: '抓取',
    pick_up_put_down: '捡起/放下'
  },
  korean: {
    idle: '대기',
    walk: '걷기',
    run: '달리기',
    stretch: '스트레칭',
    capoeira: '카포에이라',
    kicking: '차기',
    jump: '점프',
    pull: '당기기',
    push: '밀기',
    sit: '앉기',
    pick_up_and_throw: '줍고 던지기',
    trip_and_fall: '넘어지고 떨어지기',
    turn: '돌기',
    dance: '춤추기',
    turn_around: '회전',
    punching: '주먹질',
    hanging: '매달리기',
    lying: '눕기',
    mission_impossible: '미션 임파서블',
    check_surroundings: '주변 확인',
    play_golf: '골프',
    land: '착지',
    swimming: '수영',
    cartwheel: '측구르기',
    check_shoe: '신발 확인',
    play_guitar: '기타 연주',
    shaking_hands: '악수',
    pet_animal: '동물 쓰다듬기',
    kneel_and_pray: '무릎 꿇고 기도하기',
    find: '찾기',
    driving: '운전',
    blow_a_kiss: '키스 날리기',
    get_up: '일어나기',
    open_close_go_in: '열기/닫기/들어가기',
    put_down: '내려놓기',
    grab_get: '잡기',
    pick_up_put_down: '줍기/내려놓기'
  },
    dutch: {
    idle: 'Stilstaan',
    walk: 'Lopen',
    run: 'Rennen',
    stretch: 'Rekken',
    capoeira: 'Capoeira',
    kicking: 'Schoppen',
    jump: 'Springen',
    pull: 'Trekken',
    push: 'Duwen',
    sit: 'Zitten',
    pick_up_and_throw: 'Oppakken en Gooien',
    trip_and_fall: 'Struikelen en Vallen',
    turn: 'Draaien',
    dance: 'Dansen',
    turn_around: 'Omdraaien',
    punching: 'Stoten',
    hanging: 'Hangen',
    lying: 'Liggen',
    mission_impossible: 'Mission Impossible',
    check_surroundings: 'Rondkijken',
    play_golf: 'Golf Spelen',
    land: 'Landen',
    swimming: 'Zwemmen',
    cartwheel: 'Radslag',
    check_shoe: 'Schoen Controleren',
    play_guitar: 'Gitaar Spelen',
    shaking_hands: 'Handen Schudden',
    pet_animal: 'Dier Aaien',
    kneel_and_pray: 'Knielen en Bidden',
    find: 'Vinden',
    driving: 'Rijden',
    blow_a_kiss: 'Kusje Gooien',
    get_up: 'Opstaan',
    open_close_go_in: 'Openen/Sluiten/Binnengaan',
    put_down: 'Neerzetten',
    grab_get: 'Grijpen',
    pick_up_put_down: 'Oppakken/Neerzetten'
  }
};

// ---------------------------------------------------
// FBX Model Component
// ---------------------------------------------------
function FBXModel({ animations, onReady, setLoading }) {
  const mixer = useRef(null);
  const currentAction = useRef(null);
  const actions = useRef({});
  const group = useRef();

  useEffect(() => {
    const loader = new FBXLoader();

    group.current.clear();
    actions.current = {};
    currentAction.current = null;

    loader.load('/character/riggedORIGINAL.fbx', (model) => {
      model.scale.set(0.022, 0.022, 0.022);
      model.position.y = -1.2;
      group.current.add(model);

      mixer.current = new THREE.AnimationMixer(model);

      Object.entries(animations).forEach(([name, file]) => {
        if (typeof file !== 'string') {
          console.warn(`Invalid FBX path for animation "${name}"`, file);
          return;
        }

        loader.load(file, (anim) => {
          const action = mixer.current.clipAction(anim.animations[0]);
          actions.current[name] = action;

          if (!currentAction.current) {
            currentAction.current = action;
            action.play();
            setLoading(false);
          }
        });
      });

      onReady((name) => {
        if (!actions.current[name]) return;
        currentAction.current?.fadeOut(0.2);
        currentAction.current = actions.current[name];
        currentAction.current.reset().fadeIn(0.2).play();
      });
    });

    return () => mixer.current?.stopAllAction();
  }, [animations]);

  useFrame((_, delta) => mixer.current?.update(delta));

  return <group ref={group} />;
}

// ---------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------
export default function CharacterFBX() {
  const [play, setPlay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSet, setActiveSet] = useState(1);
  const [language, setLanguage] = useState('english');
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const activeAnimations = activeSet === 1 ? animationsSet1 : animationsSet2;
  const animKeys = Object.keys(activeAnimations);
  const quarter = Math.ceil(animKeys.length / 4);

  const leftExtraButtons = animKeys.slice(0, quarter);
  const leftButtons = animKeys.slice(quarter, 2 * quarter);
  const rightButtons = animKeys.slice(2 * quarter, 3 * quarter);
  const rightExtraButtons = animKeys.slice(3 * quarter);

  const placeholderKeys = animKeys.map((_, i) =>
    String.fromCharCode(65 + (i % 26))
  );

  useEffect(() => {
    const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      const index = placeholderKeys.findIndex(
        k => k.toLowerCase() === e.key.toLowerCase()
      );
      if (index !== -1 && play) play(animKeys[index]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [play, animKeys]);

  
    //buttons 4
    const buttonStyle = {
      padding: '14px 10px',
      margin: '6px 0',
      borderRadius: '8px',
      background: 'linear-gradient(145deg, #4da6ff, #007aff)', // gradient for shine
      border: 'none',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '14px',
      textAlign: 'center',
      whiteSpace: 'normal',
      overflowWrap: 'break-word',
      wordBreak: 'normal',
      maxWidth: '150px',
      boxSizing: 'border-box',

      /* 3D & shiny effects */
      boxShadow: '0 4px 6px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.2) inset',
      transition: 'all 0.2s ease',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    };

  const allButtons = [
    ...leftExtraButtons,
    ...leftButtons,
    ...rightButtons,
    ...rightExtraButtons
  ];

  // ---------------------------------------------------
  // AUDIO PRONUNCIATION HELPER
  // ---------------------------------------------------

  const languageToBCP47 = {
    english: 'en-US',
    portuguese: 'pt-BR',
    spanish: 'es-ES',
    french: 'fr-FR',
    german: 'de-DE',
    italian: 'it-IT',
    japanese: 'ja-JP',
    chinese: 'zh-CN',
    korean: 'ko-KR',
    dutch: 'nl-NL'
  };

  let cachedVoices = [];

  function loadVoices() {
    return new Promise(resolve => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        cachedVoices = voices;
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          cachedVoices = speechSynthesis.getVoices();
          resolve(cachedVoices);
        };
      }
    });
  }


  //version 3 of speakText
  async function speakText(text, language) {
  await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageToBCP47[language];

  const ua = navigator.userAgent;
  const isEdge = ua.includes('Edg');
  const isFirefox = ua.includes('Firefox');
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = ua.includes('Android');

  let voice = null;

  if (language === 'english') {
    if (isIOS) {
      voice = cachedVoices.find(v => v.lang === 'en-US');
    } else if (isEdge) {
      voice =
        cachedVoices.find(v => v.name.includes('Aria')) ||
        cachedVoices.find(v => v.name.includes('Jenny'));
    } else if (!isFirefox) {
      voice =
        cachedVoices.find(v => v.name.includes('Google US English')) ||
        cachedVoices.find(v => v.lang === 'en-US');
    }
  } else {
    voice =
      cachedVoices.find(v => v.lang === utterance.lang) ||
      cachedVoices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
  }

  if (voice) utterance.voice = voice;

  // Firefox needs heavy smoothing
  utterance.rate = isFirefox ? 0.8 : 0.92;
  utterance.pitch = isFirefox ? 1.1 : 1.02;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

  async function playPronunciation(animationKey, text, language) {
  const audioPath = `/TPRSounds/${animationKey}.m4a`;

  // 1. HUMAN AUDIO (always preferred)
  const audio = new Audio(audioPath);
  audio.preload = 'auto';

  audio.oncanplaythrough = () => audio.play();

  audio.onerror = async () => {
    // 2. TTS FALLBACK (platform aware)
    if ('speechSynthesis' in window) {
      await speakText(text, language);
    } else {
      console.warn('No TTS available on this platform.');
    }
  };
}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '12px',
        }}
        >
           USE CHROME
        </div>

      {/* LANGUAGE SWITCH */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobileOrTablet
            ? 'repeat(2, 1fr)'
            : 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '10px',
          width: isMobileOrTablet ? '100%' : 'max-content',
          maxWidth: '500px',
        }}
      >
        {Object.keys(translations).map(lang => (
          <button
            key={lang}
            style={{
              ...buttonStyle,
              width: '100%'
            }}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>



      {/* SET SWITCH */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button style={buttonStyle} onClick={() => setActiveSet(1)}>SET 1</button>
        <button style={buttonStyle} onClick={() => setActiveSet(2)}>SET 2</button>
      </div>

      {/* DESKTOP LAYOUT */}
      {/* RESPONSIVE LAYOUT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobileOrTablet
            ? '1fr'
            : '150px 150px 400px 150px 150px',
          gap: '15px',
          justifyItems: 'center'
        }}
      >
        {isMobileOrTablet ? (
          <>
            {/* MODEL ON TOP */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }}>
                <ambientLight intensity={3.4} />
                <directionalLight position={[5, 3, 5]} intensity={4.4} />
                <Suspense fallback={null}>
                  <FBXModel
                    animations={activeAnimations}
                    onReady={(fn) => setPlay(() => fn)}
                    setLoading={setLoading}
                  />
                </Suspense>
                <OrbitControls enablePan={false} />
              </Canvas>
            </div>

            {/* BUTTONS STACKED */}
            {allButtons.map((name) => (
              <button
                key={name}
                style={{ ...buttonStyle, width: '90%' }}
                onClick={() => {
                  play?.(name);
                  const spokenText = translations[language][name] || name;
                  playPronunciation(name, spokenText, language);
                }}
              >
                {translations[language][name] || name} (
                {placeholderKeys[allButtons.indexOf(name)]})
              </button>
            ))}
          </>
        ) : (
          [leftExtraButtons, leftButtons,
            <Canvas key="canvas" camera={{ position: [0, 1.5, 4], fov: 40 }}>
              <ambientLight intensity={3.4} />
              <directionalLight position={[5, 3, 5]} intensity={4.4} />
              <Suspense fallback={null}>
                <FBXModel
                  animations={activeAnimations}
                  onReady={(fn) => setPlay(() => fn)}
                  setLoading={setLoading}
                />
              </Suspense>
              <OrbitControls enablePan={false} />
            </Canvas>,
            rightButtons, rightExtraButtons].map((col, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              {Array.isArray(col)
                ? col.map((name) => (
                    <button
                      key={name}
                      style={buttonStyle}
                      onClick={() => {
                        play?.(name);
                        const spokenText = translations[language][name] || name;
                        playPronunciation(name, spokenText, language);
                      }}
                    >
                      {translations[language][name] || name} (
                      {placeholderKeys[allButtons.indexOf(name)]})
                    </button>
                  ))
                : col}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
