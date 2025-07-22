// // hooks/useFlashMessage.ts
// import bus from '../services/bus';

// export default function useFlashMessage() {
//     function setFlashMessage(msg: string, type: 'success' | 'error' | 'info') {
//         bus.dispatchEvent(new CustomEvent('flash', {
//             detail: {
//                 message: msg,
//                 type: type,
//             }
//         }));
//     }

//     return { setFlashMessage };
// }
