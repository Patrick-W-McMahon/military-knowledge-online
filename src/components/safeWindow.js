const serverWindow = {
    addEventListener() {},
    removeEventListener() {},
    requestAnimationFrame() {}
}

const safeWindow = typeof window !== `undefined` ? window : serverWindow;
export default safeWindow;