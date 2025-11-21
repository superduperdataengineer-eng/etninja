// 'use client';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Navbar from '../../components/Navbar';

// export default function Kitchen() {
//   const [actions, setActions] = useState({
//     airconditionerOn: false,
//     alarmOn: false,
//     blenderOn: false,
//     cameraOn: false,
//     coffeemakerOn: false,
//     computerOn: false,
//     cupPutPick: false,
//     dishwasherOn: false,
//     fanOn: false,
//     flashlightOn: false,
//     heaterOn: false,
//     kettleOn: false,
//     microwaveOn: false,
//     radioOn: false,
//     tvOn: false,
//     washingmachineOn: false,
//     boxOpen: false,
//     curtainOpen: false,
//     doorOpen: false,
//     drawerOpen: false,
//     garagedoorOpen: false,
//     suitcaseOpen: false,
//     windowOpen: false,
//     doorLocked: false,
//     blindsUp: false,
//     glassesOn: false,
//     hatOn: false,
//     jacketOn: false,
//     jacketUp: false,
//     necklaceOn: false,
//     seatbeltOn: false,
//     shoesOn: false,
//     fridgeOpen: false,
//     faucetOn: false,
//     ovenOn: false,
//     eyesOpen: false,
//     phonePickUp: false,
//     sitting: false,
//     bookPick: false,
//     carStarted: false,
//     chargerPluggedIn: false,
//     carPut: false,
//     chargerPut: false,
//     chairSit: false,
//     lampOn: false,
//     vacuumPluggedIn: false,
//     microphoneMute: false,
//     tableFold: false,
//     couchCover: false,
//     attachCover: false,
//     armchairMoveLeft:false,
//     bedAssemble: false,
//     trunkOpen: false,
//     doorbellPress: false,
//     shoelacesTie: false,
//     coatHangUp: false,
//     shirtButton: false,
//     socksPutOn: false,
//     sleevesRollUp: false,
//     glovesWear: false,
//     eggsStir: false,
//     milkPour: false,
//     carrotChop: false,
//     breadSlice: false,
//     applePeel: false,
//     eggFry: false,
//     runOn: false,
//     jumpOn: false,
//     lyingOn: false,
//     raiseOn: false,
//     whisperOn: false,
//     biteOn: false,
//     carGetIn: false,
//     vanLoad: false,
//     headlightsOn: false,
//     luggagePack: false,
//     nailHit: false,
//     wallPaint: false,
//     holeDig: false,
//     textHighlight: false,
//     noteWrite: false,
//     sketchDraw: false,
//     shelfAttach: false,
//     eggsStir: false,
//     milkPour: false,
//     carrotChop: false,
//     bedLie: false,
//     runOn: false,
//     jumpOn: false,
//     carGetOn: false,
//     vanLoad: false,
//     wallPaint: false,
//     holeDig: false,
//     textHighlight: false,
//     noteWrite: false,
//   });

//   const [category, setCategory] = useState('Household Appliances & Electronics');
//   const [currentPage, setCurrentPage] = useState(0);
//   const imagesPerPage = 6;

//   const toggleAction = (item, type) => {
//     setActions(prev => {
//       let key;
//       switch (type) {
//         case 'toggle':
//           key = item.toLowerCase().replace(/ /g, '') + 'On';
//           break;
//         case 'openClose':
//           key = item.toLowerCase().replace(/ /g, '') + 'Open';
//           break;
//         case 'putOnTakeOff':
//           key = item.toLowerCase().replace(/ /g, '') + 'PutOn';
//           break;
//         case 'pullUpPullDown':
//           key = item.toLowerCase().replace(/ /g, '') + 'PullUp';
//           break;
//         case 'lockUnlock':
//           key = item.toLowerCase().replace(/ /g, '') + 'Locked';
//           break;
//         case 'zipUnzip':
//           key = item.toLowerCase().replace(/ /g, '') + 'Zipped';
//           break;
//         case 'sitStand':
//           key = item.toLowerCase().replace(/ /g, '') + 'Sit';
//         case 'pickUpHangUp':
//           key = item.toLowerCase().replace(/ /g, '') + 'PickUp';
//           break;
//         case 'pickUpPutDown':
//           key = item.toLowerCase().replace(/ /g, '') + 'PickUp';
//           break;
//         case 'startStop':
//           key = item.toLowerCase().replace(/ /g, '') + 'Started';
//           break;
//         case 'plugInUnplug':
//           key = item.toLowerCase().replace(/ /g, '') + 'PluggedIn';
//           break;
//         case 'putPick':
//           key = item.toLowerCase().replace(/ /g, '') + 'PutPick';
//           break;
//         case 'fillEmpty':
//           key = item.toLowerCase().replace(/ /g, '') + 'Fill';
//           break;
//         case 'muteUnmute':
//           key = item.toLowerCase().replace(/ /g, '') + 'Mute';
//           break;
//         case 'scrollUpScrollDown':
//           key = item.toLowerCase().replace(/ /g, '') + 'ScrollUp';
//           break;
//         case 'foldUnfold':
//           key = item.toLowerCase().replace(/ /g, '') + 'Fold';
//           break;
//         case 'coverUncover':
//           key = item.toLowerCase().replace(/ /g, '') + 'Cover';
//           break;
//         case 'attachDetach':
//           key = item.toLowerCase().replace(/ /g, '') + 'Attach';
//           break;  
//         case 'tieUntie':
//           key = item.toLowerCase().replace(/ /g, '') + 'Tie';
//           break;
//         case 'hangUpTakeDown':
//           key = item.toLowerCase().replace(/ /g, '') + 'HangUp';
//           break;
//         case 'buttonUnbutton':
//           key = item.toLowerCase().replace(/ /g, '') + 'Button';
//           break;
//         case 'stirStopStirring':
//           key = item.toLowerCase().replace(/ /g, '') + 'Stir';
//           break;
//         case 'pourStopPouring':
//           key = item.toLowerCase().replace(/ /g, '') + 'Pour';
//           break;
//         case 'chopStopChopping':
//           key = item.toLowerCase().replace(/ /g, '') + 'Chop';
//           break;
//         case 'runStopRunning':
//           key = item.toLowerCase().replace(/ /g, '') + 'Stir';
//           break;
//         case 'jumpLand':
//           key = item.toLowerCase().replace(/ /g, '') + 'Pour';
//           break;
//         case 'lieDownGetUp':
//           key = item.toLowerCase().replace(/ /g, '') + 'Chop';
//           break;
//         case 'getInGetOut':
//           key = item.toLowerCase().replace(/ /g, '') + 'GetIn';
//           break;
//         case 'packUnpack':
//           key = item.toLowerCase().replace(/ /g, '') + 'Load';
//         case 'hitStopHitting':
//           key = item.toLowerCase().replace(/ /g, '') + 'Hit';
//           break;
//         case 'loadUnload':
//           key = item.toLowerCase().replace(/ /g, '') + 'Load';
//           break;
//         case 'paintStopPainting':
//           key = item.toLowerCase().replace(/ /g, '') + 'Paint';
//           break;
//         case 'digStopDigging':
//           key = item.toLowerCase().replace(/ /g, '') + 'Dig';
//           break;
//         case 'highlightEraseHighlight':
//           key = item.toLowerCase().replace(/ /g, '') + 'Highlight';
//           break;
//         case 'writeStopWriting':
//           key = item.toLowerCase().replace(/ /g, '') + 'Write';
//           break;
//         default:
//           return prev;
//       }
//       return { ...prev, [key]: !prev[key] };
//     });
//   };

//   const categories = [
//     'Household Appliances & Electronics',
//     'Doors, Windows & Furniture',
//     'Clothing and Accessories',
//     'Kitchen & Food',
//     'Personal Actions & Movements',
//     'Vehicles & Travel',
//     'Objects & Tools'
//   ];

//   const items = {
//     'Household Appliances & Electronics': [
//       { name: 'Air Conditioner', type: 'toggle' },
//       { name: 'Alarm', type: 'toggle' },
//       { name: 'Blender', type: 'toggle' },
//       { name: 'Camera', type: 'toggle' },
//       { name: 'Coffee Maker', type: 'toggle' },
//       { name: 'Computer', type: 'toggle' },
//       { name: 'Dishwasher', type: 'toggle' },
//       { name: 'Fan', type: 'toggle' },
//       { name: 'Flashlight', type: 'toggle' },
//       { name: 'Heater', type: 'toggle' },
//       { name: 'Kettle', type: 'fillEmpty' },
//       { name: 'Microwave', type: 'toggle' },
//       { name: 'Radio', type: 'toggle' },
//       { name: 'TV', type: 'toggle' },
//       { name: 'Washing Machine', type: 'toggle' },
//       { name: 'Lamp', type: 'toggle' },
//       { name: 'Vacuum', type: 'plugInUnplug' },
//       { name: 'Microphone', type: 'muteUnmute' },
//       { name: 'Mouse', type: 'scrollUpScrollDown' }

//     ],
//     'Doors, Windows & Furniture': [
//       { name: 'Box', type: 'openClose' },
//       { name: 'Curtain', type: 'openClose' },
//       { name: 'Door', type: 'openClose' },
//       { name: 'Drawer', type: 'openClose' },
//       { name: 'Garage Door', type: 'openClose' },
//       { name: 'Suitcase', type: 'openClose' },
//       { name: 'Window', type: 'openClose' },
//       { name: 'Door(lock)', type: 'lockUnlock' },
//       { name: 'Blinds', type: 'pullUpPullDown' },
//       { name: 'Table', type: 'foldUnfold' },
//       { name: 'Couch', type: 'coverUncover' },
//       { name: 'Shelf', type: 'attachDetach' },

//     ],
//     'Clothing and Accessories': [
//       { name: 'Glasses', type: 'putOnTakeOff' },
//       { name: 'Hat', type: 'putOnTakeOff' },
//       { name: 'Jacket(wear)', type: 'putOnTakeOff' },
//       { name: 'Necklace', type: 'putOnTakeOff' },
//       { name: 'Seatbelt', type: 'putOnTakeOff' },
//       { name: 'Shoes', type: 'putOnTakeOff' },
//       { name: 'Jacket(zip)', type: 'pullUpPullDown' },
//       { name: 'Shoelaces', type: 'tieUntie' },
//       { name: 'Coat', type: 'hangUpTakeDown' },
//       { name: 'Shirt', type: 'buttonUnbutton' }
//     ],
//     'Kitchen & Food': [
//       { name: 'Fridge', type: 'openClose' },
//       { name: 'Faucet', type: 'toggle' },
//       { name: 'Oven', type: 'openClose' },
//       { name: 'Eggs', type: 'stirStopStirring' },
//       { name: 'Milk', type: 'pourStopPouring' },
//       { name: 'Carrot', type: 'chopStopChopping' }
//     ],
//     'Personal Actions & Movements': [
//       { name: 'Eyes', type: 'openClose' },
//       { name: 'Phone', type: 'pickUpHangUp' },
//       { name: 'Chair', type: 'sitStand' },
//       { name: 'Book', type: 'pickUpPutDown' },
//       { name: 'Run', type: 'runStopRunning' },
//       { name: 'Jump', type: 'jumpLand' },
//       { name: 'Bed', type: 'lieDownGetUp' }
//     ],
//     'Vehicles & Travel': [
//       { name: 'Car', type: 'startStop' },
//       { name: 'Charger', type: 'plugInUnplug' },
//       { name: 'CarGetOut', type: 'getInGetOut' },
//       { name: 'Luggage', type: 'packUnpack' },
//       { name: 'Van', type: 'loadUnload'}
//     ],
//     'Objects & Tools': [
//       { name: 'Cup', type: 'putPick' },
//       { name: 'Nail', type: 'hitStopHitting' },
//       { name: 'Wall', type: 'paintStopPainting'},
//       { name: 'Hole', type: 'digStopDigging'},
//       { name: 'Text', type: 'highlightEraseHighlight'},
//       { name: 'Note', type: 'writeStopWriting'}
//       // { name: 'Paper', type: 'putPick' },
//       // { name: 'Pen', type: 'putPick' },
//       // { name: 'Toy', type: 'putPick' },
//     ],

//   };

//   const currentItems = items[category]?.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage) || [];
//   const totalPages = Math.ceil(items[category]?.length / imagesPerPage);

//   // Listen for keyboard events
//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'ArrowLeft') {
//         setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
//       } else if (event.key === 'ArrowRight') {
//         setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     // Cleanup event listener
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [totalPages]);

//   return (
//     <div>
//       <div className="mt-14 flex flex-col items-center justify-center min-h-screen">
      
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 "> */}
//         <div className="buttons-grid">
          
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               className={`px-2 py-1 w-auto bg-blue-500 text-white rounded-lg ${category === cat ? 'bg-blue-700' : ''}`}
//               onClick={() => {
//                 setCategory(cat);
//                 setCurrentPage(0); // Reset page when changing category
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* <div className="flex flex-col items-center justify-center w-full max-w-[800px] min-h-[600px] bg-white p-6 border rounded-lg shadow-md"> */}
//         <div className="category-frame">

//           {/* <div className="grid grid-cols-3 gap-4 mt-6 w-full h-[500px] justify-items-center place-items-center"> */}
//           <div className="icon-grid">
//             {currentItems.map((item, index) => {
//               const keyBase = item.name.toLowerCase().replace(/ /g, '');
//               // const actionState = actions[`${keyBase}On`] || actions[`${keyBase}Open`] || actions[`${keyBase}PutDown`] || actions[`${keyBase}Fill`] || actions[`${keyBase}PutOn`] || actions.sitting;
//               const actionState = actions[`${keyBase}On`]           // toggle
//                   || actions[`${keyBase}Open`]                        // openClose
//                   || actions[`${keyBase}PutOn`]                       // putOnTakeOff
//                   || actions[`${keyBase}PullUp`]                      // pullUpPullDown
//                   || actions[`${keyBase}Locked`]                      // lockUnlock
//                   || actions[`${keyBase}Zipped`]                      // zipUnzip
//                   || actions.sitting                                  // sitStand
//                   || actions[`${keyBase}PickUp`]                  // pickUpHangUp //pickUpPutDown 
//                   || actions[`${keyBase}Started`]                     // startStop
//                   || actions[`${keyBase}PluggedIn`]                   // plugInUnplug
//                   || actions[`${keyBase}PutTake`]                      // putPick
//                   || actions[`${keyBase}Fill`]
//                   || actions[`${keyBase}Mute`]
//                   || actions[`${keyBase}ScrollUp`]
//                   || actions[`${keyBase}PutPick`]                       // fillEmpty
//                   || actions[`${keyBase}Fold`]
//                   || actions[`${keyBase}Cover`]
//                   || actions[`${keyBase}Attach`]
//                   || actions[`${keyBase}Tie`]
//                   || actions[`${keyBase}HangUp`]
//                   || actions[`${keyBase}Button`]
//                   || actions[`${keyBase}Stir`]
//                   || actions[`${keyBase}Pour`]
//                   || actions[`${keyBase}Chop`]
//                   || actions[`${keyBase}Run`]
//                   || actions[`${keyBase}Jump`]
//                   || actions[`${keyBase}Lie`]
//                   || actions[`${keyBase}GetIn`]
//                   || actions[`${keyBase}Pack`]
//                   || actions[`${keyBase}Hit`]
//                   || actions[`${keyBase}Load`]
//                   || actions[`${keyBase}Paint`]
//                   || actions[`${keyBase}Dig`]
//                   || actions[`${keyBase}Highlight`]
//                   || actions[`${keyBase}Write`];
//               return (
//                 <motion.img
//                   key={index}
//                   src={actionState ? `/toggleTPR/${keyBase}-on.jpg` : `/toggleTPR/${keyBase}-off.jpg`}
//                   alt={item.name}
//                   // className="w-32 h-auto object-contain"
//                   className="w-[150px] h-[150px] object-contain"
//                   onClick={() => toggleAction(item.name, item.type)}
//                 />
//               );
//             })}
//           </div>

//           <div className="flex justify-center mt-4 space-x-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 className={`w-3 h-3 rounded-full ${currentPage === i ? 'bg-blue-500' : 'bg-gray-300'}`}
//                 onClick={() => setCurrentPage(i)}
//               />
//             ))}
//           </div>

//           {/* Action Buttons */}
//           {/* <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-4xl"> */}
//           <div className="buttons-grid">
//             {currentItems.map((item, index) => {
//               const keyBase = item.name.toLowerCase().replace(/ /g, '');
//               // const actionState = actions[`${keyBase}On`] || actions[`${keyBase}Open`] || actions[`${keyBase}Put`] || actions[`${keyBase}Fill`] || actions[`${keyBase}PutOn`] || actions.sitting;
//               const actionState = actions[`${keyBase}On`]           // toggle
//                   || actions[`${keyBase}Open`]                        // openClose
//                   || actions[`${keyBase}PutOn`]                       // putOnTakeOff
//                   || actions[`${keyBase}PullUp`]                      // pullUpPullDown
//                   || actions[`${keyBase}Locked`]                      // lockUnlock
//                   || actions[`${keyBase}Zipped`]                      // zipUnzip
//                   || actions.sitting                                  // sitStand
//                   || actions[`${keyBase}PickUp`]                  // pickUpHangUp //PickUpPutDown
//                   || actions[`${keyBase}Started`]                     // startStop
//                   || actions[`${keyBase}PluggedIn`]                   // plugInUnplug
//                   || actions[`${keyBase}PutTake`]                      // putPick
//                   || actions[`${keyBase}PutPick`]
//                   || actions[`${keyBase}Fill`]                       // fillEmpty
//                   || actions[`${keyBase}Mute`]
//                   || actions[`${keyBase}ScrollUp`]
//                   || actions[`${keyBase}PutPick`]  
//                   || actions[`${keyBase}Fold`]
//                   || actions[`${keyBase}Cover`]
//                   || actions[`${keyBase}Attach`]
//                   || actions[`${keyBase}Tie`]
//                   || actions[`${keyBase}HangUp`]
//                   || actions[`${keyBase}Button`]
//                   || actions[`${keyBase}Stir`]
//                   || actions[`${keyBase}Pour`]
//                   || actions[`${keyBase}Chop`]
//                   || actions[`${keyBase}Run`]
//                   || actions[`${keyBase}Jump`]
//                   || actions[`${keyBase}Lie`]
//                   || actions[`${keyBase}GetIn`]
//                   || actions[`${keyBase}Pack`]
//                   || actions[`${keyBase}Hit`]
//                   || actions[`${keyBase}Load`]
//                   || actions[`${keyBase}Paint`]
//                   || actions[`${keyBase}Dig`]
//                   || actions[`${keyBase}Highlight`]
//                   || actions[`${keyBase}Write`];
//               // Determine action label based on action type
//               let actionLabel = '';
//               switch (item.type) {
//                 case 'toggle':
//                   actionLabel = actionState ? `Turn off ${item.name}` : `Turn on ${item.name}`;
//                   break;
//                 case 'openClose':
//                   actionLabel = actionState ? `Close ${item.name}` : `Open ${item.name}`;
//                   break;
//                 case 'putOnTakeOff':
//                   actionLabel = actionState ? `Take off ${item.name}` : `Put on ${item.name}`;
//                   break;
//                 case 'pullUpPullDown':
//                   actionLabel = actionState ? `Pull down ${item.name}` : `Pull up ${item.name}`;
//                   break;
//                 case 'lockUnlock':
//                   actionLabel = actionState ? `Unlock ${item.name}` : `Lock ${item.name}`;
//                   break;
//                 case 'zipUnzip':
//                   actionLabel = actionState ? `Unzip ${item.name}` : `Zip up ${item.name}`;
//                   break;
//                 case 'sitStand':
//                   actionLabel = actionState ? `Stand up from ${item.name}` : `Sit on ${item.name}`;
//                   break;
//                 case 'pickUpHangUp':
//                   actionLabel = actionState ? `Pick Up ${item.name}` : `Hang up ${item.name}`;
//                   break;
//                 case 'pickUpPutDown':
//                   actionLabel = actionState ? `Put down ${item.name}` : `Pick up ${item.name}`;
//                   break;
//                 case 'startStop':
//                   actionLabel = actionState ? `Stop ${item.name}` : `Start ${item.name}`;
//                   break;
//                 case 'plugInUnplug':
//                   actionLabel = actionState ? `Unplug ${item.name}` : `Plug in ${item.name}`;
//                   break;
//                 case 'putTake':
//                   actionLabel = actionState ? `Put ${item.name}` : `Take ${item.name}`;
//                   break;
//                 case 'fillEmpty':
//                   actionLabel = actionState ? `Fill ${item.name}` : `Empty ${item.name}`;
//                   break;
//                 case 'putPick':
//                   actionLabel = actionState ? `Put Down ${item.name}` : `Pick Up ${item.name}`;
//                   break;
//                 case 'muteUnmute':
//                   actionLabel = actionState ? `Mute ${item.name}` : `Unmute ${item.name}`;
//                   break;
//                 case 'scrollUpScrollDown':
//                   actionLabel = actionState ? `Scroll Down ${item.name}` : `Scroll Up ${item.name}`;
//                   break;
//                 case 'foldUnfold':
//                   actionLabel = actionState ? `Fold ${item.name}` : `Unfold ${item.name}`;
//                   break;
//                 case 'coverUncover':
//                   actionLabel = actionState ? `Uncover ${item.name}` : `Cover ${item.name}`;
//                   break;
//                 case 'attachDetach':
//                   actionLabel = actionState ? `Detach ${item.name}` : `Attach ${item.name}`;
//                   break;
//                 case 'tieUntie':
//                   actionLabel = actionState ? `Untie ${item.name}` : `Tie ${item.name}`;
//                   break;
//                 case 'hangUpTakeDown':
//                   actionLabel = actionState ? `Take Down ${item.name}` : `Hang Up ${item.name}`;
//                   break;
//                 case 'buttonUnbutton':
//                   actionLabel = actionState ? `Unbutton ${item.name}` : `Button ${item.name}`;
//                   break;
//                 case 'stirStopStirring':
//                   actionLabel = actionState ? `Stop Stirring ${item.name}` : `Stir ${item.name}`;
//                   break;
//                 case 'pourStopPouring':
//                   actionLabel = actionState ? `Stop Pouring ${item.name}` : `Pour ${item.name}`;
//                   break;
//                 case 'chopStopChopping':
//                   actionLabel = actionState ? `Stop Chopping ${item.name}s` : `Chop ${item.name}s`;
//                   break;
//                 case 'runStopRunning':
//                   actionLabel = actionState ? `Stop Running` : `Run`;
//                   break;
//                 case 'jumpLand':
//                   actionLabel = actionState ? `Land` : `${item.name}`;
//                   break;
//                 case 'lieDownGetUp':
//                   actionLabel = actionState ? `Get Up` : `Lie down in ${item.name}`;
//                   break;
//                 case 'getInGetOut':
//                   actionLabel = actionState ? `Get in the car` : `Get out of the car`;
//                   break;
//                 case 'packUnpack':
//                   actionLabel = actionState ? `Unpack ${item.name}` : `Pack ${item.name}`;
//                   break;
//                 case 'hitStopHitting':
//                   actionLabel = actionState ? `Stop hitting the ${item.name}` : `Hit the ${item.name}`;
//                   break;
//                 case 'loadUnload':
//                   actionLabel = actionState ? `Unload the ${item.name}` : `Load the ${item.name}`;
//                   break;
//                 case 'paintStopPainting':
//                   actionLabel = actionState ? `Stop Painting the ${item.name}` : `Paint the ${item.name}`;
//                   break;
//                 case 'digStopDigging':
//                   actionLabel = actionState ? `Stop Digging` : `Dig`;
//                   break;
//                 case 'highlightEraseHighlight':
//                   actionLabel = actionState ? `Erase Highlight` : `Highlight the ${item.name}`;
//                   break;
//                 case 'writeStopWriting':
//                   actionLabel = actionState ? `Stop writing the ${item.name}` : `Write the ${item.name}`;
//                   break;

//                 default:
//                   actionLabel = 'Unknown Action';
//                   break;
//               }
              
//               return (
//                 <button
//                   key={index}
//                   // className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm md:text-base"
//                   onClick={() => toggleAction(item.name, item.type)}
//                 >
//                   {actionLabel}
//                 </button>
//               );
//             })}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//code 2
// 'use client';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Navbar from '../../components/Navbar';

// export default function Kitchen() {
//   const [actions, setActions] = useState({});
//   const [category, setCategory] = useState('Household Appliances & Electronics');
//   const [currentPage, setCurrentPage] = useState(0);
//   const imagesPerPage = 6;

//   const categories = [
//     'Household Appliances & Electronics',
//     'Doors, Windows & Furniture',
//     'Clothing and Accessories',
//     'Kitchen & Food',
//     'Personal Actions & Movements',
//     'Vehicles & Travel',
//     'Objects & Tools'
//   ];

//   const items = {
//     'Household Appliances & Electronics': [
//       { name: 'Air Conditioner', type: 'toggle' },
//       { name: 'Alarm', type: 'toggle' },
//       { name: 'Blender', type: 'toggle' },
//       { name: 'Camera', type: 'toggle' },
//       { name: 'Coffee Maker', type: 'toggle' },
//       { name: 'Computer', type: 'toggle' },
//       { name: 'Dishwasher', type: 'toggle' },
//       { name: 'Fan', type: 'toggle' },
//       { name: 'Flashlight', type: 'toggle' },
//       { name: 'Heater', type: 'toggle' },
//       { name: 'Kettle', type: 'fillEmpty' },
//       { name: 'Microwave', type: 'toggle' },
//       { name: 'Radio', type: 'toggle' },
//       { name: 'TV', type: 'toggle' },
//       { name: 'Washing Machine', type: 'toggle' },
//       { name: 'Lamp', type: 'toggle' },
//       { name: 'Vacuum', type: 'plugInUnplug' },
//       { name: 'Microphone', type: 'muteUnmute' },
//       { name: 'Mouse', type: 'scrollUpScrollDown' }
//     ],
//     'Doors, Windows & Furniture': [
//       { name: 'Box', type: 'openClose' },
//       { name: 'Curtain', type: 'openClose' },
//       { name: 'Door', type: 'openClose' },
//       { name: 'Drawer', type: 'openClose' },
//       { name: 'Garage Door', type: 'openClose' },
//       { name: 'Suitcase', type: 'openClose' },
//       { name: 'Window', type: 'openClose' },
//       { name: 'Door(lock)', type: 'lockUnlock' },
//       { name: 'Blinds', type: 'pullUpPullDown' },
//       { name: 'Table', type: 'foldUnfold' },
//       { name: 'Couch', type: 'coverUncover' },
//       { name: 'Shelf', type: 'attachDetach' }
//     ],
//     'Clothing and Accessories': [
//       { name: 'Glasses', type: 'putOnTakeOff' },
//       { name: 'Hat', type: 'putOnTakeOff' },
//       { name: 'Jacket(wear)', type: 'putOnTakeOff' },
//       { name: 'Necklace', type: 'putOnTakeOff' },
//       { name: 'Seatbelt', type: 'putOnTakeOff' },
//       { name: 'Shoes', type: 'putOnTakeOff' },
//       { name: 'Jacket(zip)', type: 'pullUpPullDown' },
//       { name: 'Shoelaces', type: 'tieUntie' },
//       { name: 'Coat', type: 'hangUpTakeDown' },
//       { name: 'Shirt', type: 'buttonUnbutton' }
//     ],
//     'Kitchen & Food': [
//       { name: 'Fridge', type: 'openClose' },
//       { name: 'Faucet', type: 'toggle' },
//       { name: 'Oven', type: 'openClose' },
//       { name: 'Eggs', type: 'stirStopStirring' },
//       { name: 'Milk', type: 'pourStopPouring' },
//       { name: 'Carrot', type: 'chopStopChopping' }
//     ],
//     'Personal Actions & Movements': [
//       { name: 'Eyes', type: 'openClose' },
//       { name: 'Phone', type: 'pickUpHangUp' },
//       { name: 'Chair', type: 'sitStand' },
//       { name: 'Book', type: 'pickUpPutDown' },
//       { name: 'Run', type: 'runStopRunning' },
//       { name: 'Jump', type: 'jumpLand' },
//       { name: 'Bed', type: 'lieDownGetUp' }
//     ],
//     'Vehicles & Travel': [
//       { name: 'Car', type: 'startStop' },
//       { name: 'Charger', type: 'plugInUnplug' },
//       { name: 'CarGetOut', type: 'getInGetOut' },
//       { name: 'Luggage', type: 'packUnpack' },
//       { name: 'Van', type: 'loadUnload' }
//     ],
//     'Objects & Tools': [
//       { name: 'Cup', type: 'putPick' },
//       { name: 'Nail', type: 'hitStopHitting' },
//       { name: 'Wall', type: 'paintStopPainting' },
//       { name: 'Hole', type: 'digStopDigging' },
//       { name: 'Text', type: 'highlightEraseHighlight' },
//       { name: 'Note', type: 'writeStopWriting' }
//     ]
//   };

//   const currentItems = items[category]?.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage) || [];
//   const totalPages = Math.ceil(items[category]?.length / imagesPerPage);

//   const toggleAction = (item, type) => {
//     setActions(prev => {
//       const key = item.toLowerCase().replace(/ /g, '') + 'On'; // simplified
//       return { ...prev, [key]: !prev[key] };
//     });
//   };

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'ArrowLeft') setCurrentPage(prev => Math.max(prev - 1, 0));
//       if (event.key === 'ArrowRight') setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [totalPages]);

//   const buttonStyle = (active) => ({
//     padding: '6px 12px',
//     margin: '4px',
//     backgroundColor: active ? '#1D4ED8' : '#3B82F6', // blue
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px'
//   });

//   const dotStyle = (active) => ({
//     width: '12px',
//     height: '12px',
//     borderRadius: '50%',
//     margin: '0 4px',
//     backgroundColor: active ? '#3B82F6' : '#D1D5DB',
//     cursor: 'pointer'
//   });

//   const actionButtonStyle = {
//     padding: '8px 16px',
//     margin: '6px',
//     backgroundColor: '#3B82F6',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px'
//   };

//   return (
//     <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      
//       {/* Category Buttons */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
//         {categories.map(cat => (
//           <button
//             key={cat}
//             style={buttonStyle(category === cat)}
//             onClick={() => { setCategory(cat); setCurrentPage(0); }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Items Grid */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px', marginBottom: '20px' }}>
//         {currentItems.map((item, index) => {
//           const keyBase = item.name.toLowerCase().replace(/ /g, '');
//           const actionState = actions[`${keyBase}On`] || false;
//           return (
//             <motion.img
//               key={index}
//               src={actionState ? `/toggleTPR/${keyBase}-on.jpg` : `/toggleTPR/${keyBase}-off.jpg`}
//               alt={item.name}
//               style={{ width: '150px', height: '150px', objectFit: 'contain', margin: '6px', cursor: 'pointer' }}
//               onClick={() => toggleAction(item.name, item.type)}
//             />
//           );
//         })}
//       </div>

//       {/* Pagination Dots */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <div key={i} style={dotStyle(currentPage === i)} onClick={() => setCurrentPage(i)} />
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {currentItems.map((item, index) => (
//           <button
//             key={index}
//             style={actionButtonStyle}
//             onClick={() => toggleAction(item.name, item.type)}
//           >
//             {`Toggle ${item.name}`}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


//code 3 looks good buttons fucked up
// 'use client';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Navbar from '../../components/Navbar';

// export default function Kitchen() {
//   const [actions, setActions] = useState({});
//   const [category, setCategory] = useState('Household Appliances & Electronics');
//   const [currentPage, setCurrentPage] = useState(0);
//   const imagesPerPage = 6;

//   const categories = [
//     'Household Appliances & Electronics',
//     'Doors, Windows & Furniture',
//     'Clothing and Accessories',
//     'Kitchen & Food',
//     'Personal Actions & Movements',
//     'Vehicles & Travel',
//     'Objects & Tools'
//   ];

//   const items = {
//     'Household Appliances & Electronics': [
//       { name: 'Air Conditioner', type: 'toggle' },
//       { name: 'Alarm', type: 'toggle' },
//       { name: 'Blender', type: 'toggle' },
//       { name: 'Camera', type: 'toggle' },
//       { name: 'Coffee Maker', type: 'toggle' },
//       { name: 'Computer', type: 'toggle' },
//       { name: 'Dishwasher', type: 'toggle' },
//       { name: 'Fan', type: 'toggle' },
//       { name: 'Flashlight', type: 'toggle' },
//       { name: 'Heater', type: 'toggle' },
//       { name: 'Kettle', type: 'fillEmpty' },
//       { name: 'Microwave', type: 'toggle' },
//       { name: 'Radio', type: 'toggle' },
//       { name: 'TV', type: 'toggle' },
//       { name: 'Washing Machine', type: 'toggle' },
//       { name: 'Lamp', type: 'toggle' },
//       { name: 'Vacuum', type: 'plugInUnplug' },
//       { name: 'Microphone', type: 'muteUnmute' },
//       { name: 'Mouse', type: 'scrollUpScrollDown' }
//     ],
//     'Doors, Windows & Furniture': [
//       { name: 'Box', type: 'openClose' },
//       { name: 'Curtain', type: 'openClose' },
//       { name: 'Door', type: 'openClose' },
//       { name: 'Drawer', type: 'openClose' },
//       { name: 'Garage Door', type: 'openClose' },
//       { name: 'Suitcase', type: 'openClose' },
//       { name: 'Window', type: 'openClose' },
//       { name: 'Door(lock)', type: 'lockUnlock' },
//       { name: 'Blinds', type: 'pullUpPullDown' },
//       { name: 'Table', type: 'foldUnfold' },
//       { name: 'Couch', type: 'coverUncover' },
//       { name: 'Shelf', type: 'attachDetach' }
//     ],
//     'Clothing and Accessories': [
//       { name: 'Glasses', type: 'putOnTakeOff' },
//       { name: 'Hat', type: 'putOnTakeOff' },
//       { name: 'Jacket(wear)', type: 'putOnTakeOff' },
//       { name: 'Necklace', type: 'putOnTakeOff' },
//       { name: 'Seatbelt', type: 'putOnTakeOff' },
//       { name: 'Shoes', type: 'putOnTakeOff' },
//       { name: 'Jacket(zip)', type: 'pullUpPullDown' },
//       { name: 'Shoelaces', type: 'tieUntie' },
//       { name: 'Coat', type: 'hangUpTakeDown' },
//       { name: 'Shirt', type: 'buttonUnbutton' }
//     ],
//     'Kitchen & Food': [
//       { name: 'Fridge', type: 'openClose' },
//       { name: 'Faucet', type: 'toggle' },
//       { name: 'Oven', type: 'openClose' },
//       { name: 'Eggs', type: 'stirStopStirring' },
//       { name: 'Milk', type: 'pourStopPouring' },
//       { name: 'Carrot', type: 'chopStopChopping' }
//     ],
//     'Personal Actions & Movements': [
//       { name: 'Eyes', type: 'openClose' },
//       { name: 'Phone', type: 'pickUpHangUp' },
//       { name: 'Chair', type: 'sitStand' },
//       { name: 'Book', type: 'pickUpPutDown' },
//       { name: 'Run', type: 'runStopRunning' },
//       { name: 'Jump', type: 'jumpLand' },
//       { name: 'Bed', type: 'lieDownGetUp' }
//     ],
//     'Vehicles & Travel': [
//       { name: 'Car', type: 'startStop' },
//       { name: 'Charger', type: 'plugInUnplug' },
//       { name: 'CarGetOut', type: 'getInGetOut' },
//       { name: 'Luggage', type: 'packUnpack' },
//       { name: 'Van', type: 'loadUnload' }
//     ],
//     'Objects & Tools': [
//       { name: 'Cup', type: 'putPick' },
//       { name: 'Nail', type: 'hitStopHitting' },
//       { name: 'Wall', type: 'paintStopPainting' },
//       { name: 'Hole', type: 'digStopDigging' },
//       { name: 'Text', type: 'highlightEraseHighlight' },
//       { name: 'Note', type: 'writeStopWriting' }
//     ]
//   };

//   const currentItems = items[category]?.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage) || [];
//   const totalPages = Math.ceil(items[category]?.length / imagesPerPage);

//   const toggleAction = (item, type) => {
//     setActions(prev => {
//       const key = item.toLowerCase().replace(/ /g, '') + 'On';
//       return { ...prev, [key]: !prev[key] };
//     });
//   };

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'ArrowLeft') setCurrentPage(prev => Math.max(prev - 1, 0));
//       if (event.key === 'ArrowRight') setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [totalPages]);

//   const buttonStyle = (active) => ({
//     padding: '6px 12px',
//     margin: '4px',
//     backgroundColor: active ? '#1D4ED8' : '#3B82F6',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px'
//   });

//   const dotStyle = (active) => ({
//     width: '12px',
//     height: '12px',
//     borderRadius: '50%',
//     margin: '0 4px',
//     backgroundColor: active ? '#3B82F6' : '#D1D5DB',
//     cursor: 'pointer'
//   });

//   const actionButtonStyle = {
//     padding: '8px 16px',
//     margin: '6px',
//     backgroundColor: '#3B82F6',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px'
//   };

//   return (
//     <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      
//       {/* Category Buttons */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
//         {categories.map(cat => (
//           <button
//             key={cat}
//             style={buttonStyle(category === cat)}
//             onClick={() => { setCategory(cat); setCurrentPage(0); }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Items Grid */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px', marginBottom: '20px' }}>
//         {currentItems.map((item, index) => {
//           const keyBase = item.name.toLowerCase().replace(/ /g, '');
//           const actionState = actions[`${keyBase}On`] || false;
//           return (
//             <div key={index} style={{ border: '2px solid #ccc', borderRadius: '12px', padding: '4px', margin: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
//               <motion.img
//                 src={actionState ? `/toggleTPR/${keyBase}-on.jpg` : `/toggleTPR/${keyBase}-off.jpg`}
//                 alt={item.name}
//                 style={{ width: '150px', height: '150px', objectFit: 'contain', cursor: 'pointer' }}
//                 onClick={() => toggleAction(item.name, item.type)}
//               />
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination Dots */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <div key={i} style={dotStyle(currentPage === i)} onClick={() => setCurrentPage(i)} />
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {currentItems.map((item, index) => (
//           <button
//             key={index}
//             style={actionButtonStyle}
//             onClick={() => toggleAction(item.name, item.type)}
//           >
//             {`Toggle ${item.name}`}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


//code 4
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

export default function Kitchen() {
  const [actions, setActions] = useState({});
  const [category, setCategory] = useState('Household Appliances & Electronics');
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6;

  const categories = [
    'Household Appliances & Electronics',
    'Doors, Windows & Furniture',
    'Clothing and Accessories',
    'Kitchen & Food',
    'Personal Actions & Movements',
    'Vehicles & Travel',
    'Objects & Tools'
  ];

  const items = {
    'Household Appliances & Electronics': [
      { name: 'Air Conditioner', type: 'toggle' },
      { name: 'Alarm', type: 'toggle' },
      { name: 'Blender', type: 'toggle' },
      { name: 'Camera', type: 'toggle' },
      { name: 'Coffee Maker', type: 'toggle' },
      { name: 'Computer', type: 'toggle' },
      { name: 'Dishwasher', type: 'toggle' },
      { name: 'Fan', type: 'toggle' },
      { name: 'Flashlight', type: 'toggle' },
      { name: 'Heater', type: 'toggle' },
      { name: 'Kettle', type: 'fillEmpty' },
      { name: 'Microwave', type: 'toggle' },
      { name: 'Radio', type: 'toggle' },
      { name: 'TV', type: 'toggle' },
      { name: 'Washing Machine', type: 'toggle' },
      { name: 'Lamp', type: 'toggle' },
      { name: 'Vacuum', type: 'plugInUnplug' },
      { name: 'Microphone', type: 'muteUnmute' },
      { name: 'Mouse', type: 'scrollUpScrollDown' }
    ],
    'Doors, Windows & Furniture': [
      { name: 'Box', type: 'openClose' },
      { name: 'Curtain', type: 'openClose' },
      { name: 'Door', type: 'openClose' },
      { name: 'Drawer', type: 'openClose' },
      { name: 'Garage Door', type: 'openClose' },
      { name: 'Suitcase', type: 'openClose' },
      { name: 'Window', type: 'openClose' },
      { name: 'Door(lock)', type: 'lockUnlock' },
      { name: 'Blinds', type: 'pullUpPullDown' },
      { name: 'Table', type: 'foldUnfold' },
      { name: 'Couch', type: 'coverUncover' },
      { name: 'Shelf', type: 'attachDetach' }
    ],
    'Clothing and Accessories': [
      { name: 'Glasses', type: 'putOnTakeOff' },
      { name: 'Hat', type: 'putOnTakeOff' },
      { name: 'Jacket(wear)', type: 'putOnTakeOff' },
      { name: 'Necklace', type: 'putOnTakeOff' },
      { name: 'Seatbelt', type: 'putOnTakeOff' },
      { name: 'Shoes', type: 'putOnTakeOff' },
      { name: 'Jacket(zip)', type: 'pullUpPullDown' },
      { name: 'Shoelaces', type: 'tieUntie' },
      { name: 'Coat', type: 'hangUpTakeDown' },
      { name: 'Shirt', type: 'buttonUnbutton' }
    ],
    'Kitchen & Food': [
      { name: 'Fridge', type: 'openClose' },
      { name: 'Faucet', type: 'toggle' },
      { name: 'Oven', type: 'openClose' },
      { name: 'Eggs', type: 'stirStopStirring' },
      { name: 'Milk', type: 'pourStopPouring' },
      { name: 'Carrot', type: 'chopStopChopping' }
    ],
    'Personal Actions & Movements': [
      { name: 'Eyes', type: 'openClose' },
      { name: 'Phone', type: 'pickUpHangUp' },
      { name: 'Chair', type: 'sitStand' },
      { name: 'Book', type: 'pickUpPutDown' },
      { name: 'Run', type: 'runStopRunning' },
      { name: 'Jump', type: 'jumpLand' },
      { name: 'Bed', type: 'lieDownGetUp' }
    ],
    'Vehicles & Travel': [
      { name: 'Car', type: 'startStop' },
      { name: 'Charger', type: 'plugInUnplug' },
      { name: 'CarGetOut', type: 'getInGetOut' },
      { name: 'Luggage', type: 'packUnpack' },
      { name: 'Van', type: 'loadUnload' }
    ],
    'Objects & Tools': [
      { name: 'Cup', type: 'putPick' },
      { name: 'Nail', type: 'hitStopHitting' },
      { name: 'Wall', type: 'paintStopPainting' },
      { name: 'Hole', type: 'digStopDigging' },
      { name: 'Text', type: 'highlightEraseHighlight' },
      { name: 'Note', type: 'writeStopWriting' }
    ]
  };

  const currentItems = items[category]?.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage) || [];
  const totalPages = Math.ceil(items[category]?.length / imagesPerPage);

  const toggleAction = (item, type) => {
    setActions(prev => {
      let key;
      switch (type) {
        case 'toggle': key = item.toLowerCase().replace(/ /g, '') + 'On'; break;
        case 'openClose': key = item.toLowerCase().replace(/ /g, '') + 'Open'; break;
        case 'putOnTakeOff': key = item.toLowerCase().replace(/ /g, '') + 'PutOn'; break;
        case 'pullUpPullDown': key = item.toLowerCase().replace(/ /g, '') + 'PullUp'; break;
        case 'lockUnlock': key = item.toLowerCase().replace(/ /g, '') + 'Locked'; break;
        case 'zipUnzip': key = item.toLowerCase().replace(/ /g, '') + 'Zipped'; break;
        case 'sitStand': key = item.toLowerCase().replace(/ /g, '') + 'Sit'; break;
        case 'pickUpHangUp':
        case 'pickUpPutDown': key = item.toLowerCase().replace(/ /g, '') + 'PickUp'; break;
        case 'startStop': key = item.toLowerCase().replace(/ /g, '') + 'Started'; break;
        case 'plugInUnplug': key = item.toLowerCase().replace(/ /g, '') + 'PluggedIn'; break;
        case 'putPick': key = item.toLowerCase().replace(/ /g, '') + 'PutPick'; break;
        case 'fillEmpty': key = item.toLowerCase().replace(/ /g, '') + 'Fill'; break;
        case 'muteUnmute': key = item.toLowerCase().replace(/ /g, '') + 'Mute'; break;
        case 'scrollUpScrollDown': key = item.toLowerCase().replace(/ /g, '') + 'ScrollUp'; break;
        case 'foldUnfold': key = item.toLowerCase().replace(/ /g, '') + 'Fold'; break;
        case 'coverUncover': key = item.toLowerCase().replace(/ /g, '') + 'Cover'; break;
        case 'attachDetach': key = item.toLowerCase().replace(/ /g, '') + 'Attach'; break;
        case 'tieUntie': key = item.toLowerCase().replace(/ /g, '') + 'Tie'; break;
        case 'hangUpTakeDown': key = item.toLowerCase().replace(/ /g, '') + 'HangUp'; break;
        case 'buttonUnbutton': key = item.toLowerCase().replace(/ /g, '') + 'Button'; break;
        case 'stirStopStirring': key = item.toLowerCase().replace(/ /g, '') + 'Stir'; break;
        case 'pourStopPouring': key = item.toLowerCase().replace(/ /g, '') + 'Pour'; break;
        case 'chopStopChopping': key = item.toLowerCase().replace(/ /g, '') + 'Chop'; break;
        case 'runStopRunning': key = item.toLowerCase().replace(/ /g, '') + 'Run'; break;
        case 'jumpLand': key = item.toLowerCase().replace(/ /g, '') + 'Jump'; break;
        case 'lieDownGetUp': key = item.toLowerCase().replace(/ /g, '') + 'Lie'; break;
        case 'getInGetOut': key = item.toLowerCase().replace(/ /g, '') + 'GetIn'; break;
        case 'packUnpack': key = item.toLowerCase().replace(/ /g, '') + 'Pack'; break;
        case 'hitStopHitting': key = item.toLowerCase().replace(/ /g, '') + 'Hit'; break;
        case 'loadUnload': key = item.toLowerCase().replace(/ /g, '') + 'Load'; break;
        case 'paintStopPainting': key = item.toLowerCase().replace(/ /g, '') + 'Paint'; break;
        case 'digStopDigging': key = item.toLowerCase().replace(/ /g, '') + 'Dig'; break;
        case 'highlightEraseHighlight': key = item.toLowerCase().replace(/ /g, '') + 'Highlight'; break;
        case 'writeStopWriting': key = item.toLowerCase().replace(/ /g, '') + 'Write'; break;
        default: return prev;
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') setCurrentPage(prev => Math.max(prev - 1, 0));
      if (event.key === 'ArrowRight') setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalPages]);

  const buttonStyle = (active) => ({
    padding: '6px 12px',
    margin: '4px',
    backgroundColor: active ? '#1D4ED8' : '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  });

  const dotStyle = (active) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    margin: '0 4px',
    backgroundColor: active ? '#3B82F6' : '#D1D5DB',
    cursor: 'pointer'
  });

  const actionButtonStyle = {
    padding: '8px 16px',
    margin: '6px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const getActionLabel = (item, actionState) => {
    switch (item.type) {
      case 'toggle': return actionState ? `Turn off ${item.name}` : `Turn on ${item.name}`;
      case 'openClose': return actionState ? `Close ${item.name}` : `Open ${item.name}`;
      case 'putOnTakeOff': return actionState ? `Take off ${item.name}` : `Put on ${item.name}`;
      case 'pullUpPullDown': return actionState ? `Pull down ${item.name}` : `Pull up ${item.name}`;
      case 'lockUnlock': return actionState ? `Unlock ${item.name}` : `Lock ${item.name}`;
      case 'zipUnzip': return actionState ? `Unzip ${item.name}` : `Zip up ${item.name}`;
      case 'sitStand': return actionState ? `Stand up from ${item.name}` : `Sit on ${item.name}`;
      case 'pickUpHangUp': return actionState ? `Hang up ${item.name}` : `Pick up ${item.name}`;
      case 'pickUpPutDown': return actionState ? `Put down ${item.name}` : `Pick up ${item.name}`;
      case 'startStop': return actionState ? `Stop ${item.name}` : `Start ${item.name}`;
      case 'plugInUnplug': return actionState ? `Unplug ${item.name}` : `Plug in ${item.name}`;
      case 'putPick': return actionState ? `Put down ${item.name}` : `Pick up ${item.name}`;
      case 'fillEmpty': return actionState ? `Fill ${item.name}` : `Empty ${item.name}`;
      case 'muteUnmute': return actionState ? `Mute ${item.name}` : `Unmute ${item.name}`;
      case 'scrollUpScrollDown': return actionState ? `Scroll down ${item.name}` : `Scroll up ${item.name}`;
      case 'foldUnfold': return actionState ? `Fold ${item.name}` : `Unfold ${item.name}`;
      case 'coverUncover': return actionState ? `Uncover ${item.name}` : `Cover ${item.name}`;
      case 'attachDetach': return actionState ? `Detach ${item.name}` : `Attach ${item.name}`;
      case 'tieUntie': return actionState ? `Untie ${item.name}` : `Tie ${item.name}`;
      case 'hangUpTakeDown': return actionState ? `Take down ${item.name}` : `Hang up ${item.name}`;
      case 'buttonUnbutton': return actionState ? `Unbutton ${item.name}` : `Button ${item.name}`;
      case 'stirStopStirring': return actionState ? `Stop stirring ${item.name}` : `Stir ${item.name}`;
      case 'pourStopPouring': return actionState ? `Stop pouring ${item.name}` : `Pour ${item.name}`;
      case 'chopStopChopping': return actionState ? `Stop chopping ${item.name}` : `Chop ${item.name}`;
      case 'runStopRunning': return actionState ? `Stop running` : `Run`;
      case 'jumpLand': return actionState ? `Land` : `Jump`;
      case 'lieDownGetUp': return actionState ? `Get up` : `Lie down in ${item.name}`;
      case 'getInGetOut': return actionState ? `Get in the car` : `Get out of the car`;
      case 'packUnpack': return actionState ? `Unpack ${item.name}` : `Pack ${item.name}`;
      case 'hitStopHitting': return actionState ? `Stop hitting ${item.name}` : `Hit ${item.name}`;
      case 'loadUnload': return actionState ? `Unload ${item.name}` : `Load ${item.name}`;
      case 'paintStopPainting': return actionState ? `Stop painting ${item.name}` : `Paint ${item.name}`;
      case 'digStopDigging': return actionState ? `Stop digging ${item.name}` : `Dig ${item.name}`;
      case 'highlightEraseHighlight': return actionState ? `Stop highlighting ${item.name}` : `Highlight ${item.name}`;
      case 'writeStopWriting': return actionState ? `Stop writing ${item.name}` : `Write ${item.name}`;
      default: return `Toggle ${item.name}`;
    }
  };

  return (
    <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {/* Category Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            style={buttonStyle(category === cat)}
            onClick={() => { setCategory(cat); setCurrentPage(0); }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px', marginBottom: '20px' }}>
        {currentItems.map((item, index) => {
          const keyBase = item.name.toLowerCase().replace(/ /g, '');
          const actionState = actions[`${keyBase}On`] || actions[`${keyBase}Open`] || actions[`${keyBase}PutOn`] || actions[`${keyBase}PullUp`] || actions[`${keyBase}Locked`] || actions[`${keyBase}Zipped`] || actions[`${keyBase}Sit`] || actions[`${keyBase}PickUp`] || actions[`${keyBase}Started`] || actions[`${keyBase}PluggedIn`] || actions[`${keyBase}PutPick`] || actions[`${keyBase}Fill`] || actions[`${keyBase}Mute`] || actions[`${keyBase}ScrollUp`] || actions[`${keyBase}Fold`] || actions[`${keyBase}Cover`] || actions[`${keyBase}Attach`] || actions[`${keyBase}Tie`] || actions[`${keyBase}HangUp`] || actions[`${keyBase}Button`] || actions[`${keyBase}Stir`] || actions[`${keyBase}Pour`] || actions[`${keyBase}Chop`] || actions[`${keyBase}Run`] || actions[`${keyBase}Jump`] || actions[`${keyBase}Lie`] || actions[`${keyBase}GetIn`] || actions[`${keyBase}Pack`] || actions[`${keyBase}Hit`] || actions[`${keyBase}Load`] || actions[`${keyBase}Paint`] || actions[`${keyBase}Dig`] || actions[`${keyBase}Highlight`] || actions[`${keyBase}Write`] || false;
          return (
            <div key={index} style={{ border: '2px solid #ccc', borderRadius: '12px', padding: '4px', margin: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
              <motion.img
                src={actionState ? `/toggleTPR/${keyBase}-on.jpg` : `/toggleTPR/${keyBase}-off.jpg`}
                alt={item.name}
                style={{ width: '150px', height: '150px', objectFit: 'contain', cursor: 'pointer' }}
                onClick={() => toggleAction(item.name, item.type)}
              />
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <div key={i} style={dotStyle(currentPage === i)} onClick={() => setCurrentPage(i)} />
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentItems.map((item, index) => {
          const keyBase = item.name.toLowerCase().replace(/ /g, '');
          const actionState = actions[`${keyBase}On`] || actions[`${keyBase}Open`] || actions[`${keyBase}PutOn`] || actions[`${keyBase}PullUp`] || actions[`${keyBase}Locked`] || actions[`${keyBase}Zipped`] || actions[`${keyBase}Sit`] || actions[`${keyBase}PickUp`] || actions[`${keyBase}Started`] || actions[`${keyBase}PluggedIn`] || actions[`${keyBase}PutPick`] || actions[`${keyBase}Fill`] || actions[`${keyBase}Mute`] || actions[`${keyBase}ScrollUp`] || actions[`${keyBase}Fold`] || actions[`${keyBase}Cover`] || actions[`${keyBase}Attach`] || actions[`${keyBase}Tie`] || actions[`${keyBase}HangUp`] || actions[`${keyBase}Button`] || actions[`${keyBase}Stir`] || actions[`${keyBase}Pour`] || actions[`${keyBase}Chop`] || actions[`${keyBase}Run`] || actions[`${keyBase}Jump`] || actions[`${keyBase}Lie`] || actions[`${keyBase}GetIn`] || actions[`${keyBase}Pack`] || actions[`${keyBase}Hit`] || actions[`${keyBase}Load`] || actions[`${keyBase}Paint`] || actions[`${keyBase}Dig`] || actions[`${keyBase}Highlight`] || actions[`${keyBase}Write`] || false;
          return (
            <button
              key={index}
              style={actionButtonStyle}
              onClick={() => toggleAction(item.name, item.type)}
            >
              {getActionLabel(item, actionState)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
