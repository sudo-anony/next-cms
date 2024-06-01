import React from 'react';
import { PageTitle } from '../../../theme/layout/core';
import { Private } from './components/Private';
import { Group } from './components/Group';
import { Drawer } from './components/Drawer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const chatBreadCrumbs = [
  {
    title: 'Chat',
    path: '/apps/chat/private-chat',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];

const ChatPage: React.FC = () => {
  const { pathname, push } = useRouter();
  const isChatRoute = pathname.startsWith('/apps/chat');

  if (!isChatRoute) {
    push('/apps/chat/private-chat');
    return null;
  }

  let pageTitle = '';
  let chatComponent: JSX.Element | null = null;

  if (pathname === '/apps/chat/private-chat') {
    pageTitle = 'Private chat';
    chatComponent = <Private />;
  } else if (pathname === '/apps/chat/group-chat') {
    pageTitle = 'Group chat';
    chatComponent = <Group />;
  } else if (pathname === '/apps/chat/drawer-chat') {
    pageTitle = 'Drawer chat';
    chatComponent = <Drawer />;
  }

  return (
    <>
      <PageTitle breadcrumbs={chatBreadCrumbs}>{pageTitle}</PageTitle>
      {chatComponent}
    </>
  );
};

export default ChatPage;
