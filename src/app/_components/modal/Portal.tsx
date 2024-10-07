import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: ReactNode }) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    const portalElement = document.getElementById('portal');
    if (portalElement) {
      setPortalElement(portalElement);
    }
  }, []);

  if (!portalElement) {
    return null;
  }

  return createPortal(<>{children}</>, portalElement);
}
