import React, { useEffect, useRef, useState } from 'react';
import getVerticalScrollbarWidth from '../utils/getVerticalScrollbarWidth';


export default function useVerticalScrollbarMeasure({ listRef }: { listRef: React.RefObject<HTMLElement | null> }) {
    const [scrolbarWidth, setScrollbarWidth] = useState(listRef ? getVerticalScrollbarWidth(listRef.current as HTMLElement) : null);
    useEffect(() => {
        if (!listRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === listRef.current) {
                    setScrollbarWidth(getVerticalScrollbarWidth(listRef.current as HTMLElement))
                }
            }
        });

        resizeObserver.observe(listRef.current as HTMLElement);
        return () => {
            if (listRef.current) {
                resizeObserver.unobserve(listRef.current as HTMLElement);
            }
        };
    }, []);

    return [
        scrolbarWidth
    ]
}
