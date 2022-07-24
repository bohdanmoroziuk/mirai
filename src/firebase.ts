import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import config from 'src/config/firebase';

export const app = initializeApp(config);

export const firestore = getFirestore(app);
