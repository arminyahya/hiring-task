import React, { useEffect, useState } from 'react';

const useAutoSizer = ({ listRef }: { listRef: React.RefObject<HTMLElement | null>}) => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = listRef.current;
        if (!element || !element.parentElement) return;
        
        const updateSize = () => {
            const parent = element.parentElement;

            setSize({
                width: (parent as HTMLElement).clientWidth,
                height: (parent as HTMLElement).clientHeight,
            });
        };

        const resizeObserver = new ResizeObserver(updateSize);

        // Observe the parent element
        resizeObserver.observe(element.parentElement);

        // Initial size measurement
        updateSize();

        return () => {
            resizeObserver.unobserve(element.parentElement as HTMLElement);
        };
    }, [listRef]);

    return size;
};

export default useAutoSizer;