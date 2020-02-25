// Viewport size
const getWinSize = () => { 
    return {
        width: window.innerWidth, 
        height: window.innerHeight
    };
};
let winsize = getWinSize();
window.addEventListener('resize', () => winsize = getWinSize());

export default winsize;