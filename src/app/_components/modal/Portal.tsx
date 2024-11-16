import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalElementId = 'draggable' | 'modal' | 'toast';

interface PortalProps {
  children: ReactNode;
  elementId: PortalElementId;
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
