import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/home/foryou'); // Redirect root to home/foryou
    }, []);

    return null; // or a splash/loading indicator if you want
}

