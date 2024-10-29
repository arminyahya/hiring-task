export default function getVerticalScrollbarWidth(element: HTMLElement): number {
    if(!element) {
        return 0
    }
    // Create a temporary outer div
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // Force scrollbar to appear
    outer.style.width = '100px'; // Set a width
    outer.style.height = '100px'; // Set a height
    document.body.appendChild(outer);

    // Create an inner div to measure the scrollbar
    const inner = document.createElement('div');
    inner.style.width = '100%'; // Set width to 100%
    inner.style.height = '100%'; // Set height to 100%
    outer.appendChild(inner);

    // Calculate the scrollbar width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Clean up the DOM
    outer.parentNode?.removeChild(outer);

    // If the element has a vertical scrollbar, return the scrollbar width
    if (element.scrollHeight > element.clientHeight) {
        return scrollbarWidth;
    }

    // If there is no vertical scrollbar, return 0
    return 0;
}