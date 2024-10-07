import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  elementId: string;
}

export default function Portal({ children, elementId }: PortalProps) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    const portalElement = document.getElementById(elementId);
    if (portalElement) {
      setPortalElement(portalElement);
    }
  }, []);

  if (!portalElement) {
    return null;
  }

  return createPortal(<>{children}</>, portalElement);
}
