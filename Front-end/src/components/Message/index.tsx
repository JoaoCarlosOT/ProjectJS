// import { useState, useEffect } from 'react';
// import bus from '../../services/bus';
// import styles from './message.module.css';

// const Message = () => {
//     const [visible, setVisible] = useState(false);
//     const [type, setType] = useState<'success' | 'error' | 'info'>('info');
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const handler = (event: Event) => {
//             const customEvent = event as CustomEvent<{ message: string; type: 'success' | 'error' | 'info' }>;
//             setVisible(true);
//             setMessage(customEvent.detail.message);
//             setType(customEvent.detail.type);

//             setTimeout(() => {
//                 setVisible(false);
//             }, 3000);
//         };

//         bus.addEventListener('flash', handler);
//         return () => bus.removeEventListener('flash', handler);
//     }, []);

//     return (
//         <>
//             {visible && (
//                 <p className={`${styles.message} ${styles[type] || ''}`}>
//                     {message}
//                 </p>
//             )}
//         </>
//     );
// };

// export default Message;
