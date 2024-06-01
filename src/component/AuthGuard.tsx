// src/components/AuthGuard.tsx
import { FC } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../setup';
import { AuthPage } from '../modules/auth/AuthPage';

const AuthGuard: FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthorized = useSelector<RootState, boolean>(({ auth }) => !!auth.accessToken);
    const router = useRouter();

    if (!isAuthorized && router.pathname !== '/auth') {
        return <AuthPage />;
    }

    return <>{children}</>;
};

export default AuthGuard;
