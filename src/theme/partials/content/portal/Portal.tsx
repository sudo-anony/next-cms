import React, { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  className?: string;
}

const Portal: React.FC<PortalProps> = ({ children, className = '' }) => {
  const [container] = useState(document.createElement('div'));

  if (className) container.classList.add(className);

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
};

export { Portal };
