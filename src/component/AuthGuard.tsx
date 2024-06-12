import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthGuard: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthorization = () => {
            if (typeof window !== 'undefined') {
                const token = sessionStorage.getItem('token');
                setIsAuthorized(!!token);
                if (!!token && router.pathname === '/auth') {
                    router.push('/dashboard');
                } else if (!token && router.pathname !== '/auth' && router.pathname !== '/') {
                    router.push('/auth');
                }
            }
        };
        checkAuthorization();
    }, [router.pathname]);

    return <>{children}</>;
};

export default AuthGuard;
