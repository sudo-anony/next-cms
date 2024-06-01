import React, { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import clsx from 'clsx';
import { DrawerComponent } from '../../assets/ts/components';

type ContentProps = {
  children: ReactNode;
};

const Content: FC<ContentProps> = ({ children }) => {
  const location = useLocation();
  const paths = process.env.REACT_APP_HIDE_LAYOUT_URLS ? process.env.REACT_APP_HIDE_LAYOUT_URLS.split(',') : [];
  const startExam = paths.includes(location.pathname);

  useEffect(() => {
    DrawerComponent.hideAll();
  }, [location]);

  return (
    <div 
      id="kt_content_container" 
      className={clsx('content flex-row-fluid', {
        'container-fulldui': startExam,
        'container': !startExam
      })}
    >
      {children}
    </div>
  );
};

export { Content };
