import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../../theme/partials';

const ChatPage = dynamic(() => import('../../../modules/apps/chat/ChatPage'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Chat = () => {
    return <ChatPage />;
};

export default Chat;
