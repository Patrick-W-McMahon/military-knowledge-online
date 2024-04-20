const serverWindow = {
    addEventListener() {},
    removeEventListener() {},
    requestAnimationFrame() {}
}

const safeWindow = window !== undefined ? window : serverWindow;
export default safeWindow;