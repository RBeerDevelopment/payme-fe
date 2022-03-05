import React, { useEffect, useState } from "react";

interface Props {
    children: React.ReactElement
}

export function ClientOnly ({ children, ...delegated }: Props): React.ReactElement | null {
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
        setHasMounted(true);
    }, []);
  
    if (!hasMounted) {
        return null;
    }
  
    return (<div {...delegated}>
        {children}
    </div>);
}