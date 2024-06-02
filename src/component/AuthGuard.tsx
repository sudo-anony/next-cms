import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthPage } from '../modules/auth/AuthPage';

const AuthGuard: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();
    debugger
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsAuthorized(!!token);
    }, []);

    if (!isAuthorized && router.pathname !== '/auth') {
        // return <AuthPage />;
        router.push('/auth');
    }

    return <>{children}</>;
};

export default AuthGuard;
