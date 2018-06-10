const toggleScreen = () => {
    const el = document.documentElement;
    
    if(typeof window.ActiveXObject!="undefined"){
        // for Internet Explorer
        const wscript = new ActiveXObject("WScript.Shell");
        wscript.SendKeys("{F11}");

    } else if ((document.fullScreenElement !== undefined && document.fullScreenElement === null)
        || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null)
        || (document.mozFullScreen !== undefined && !document.mozFullScreen)
        || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {

        // for newer Webkit and Firefox
        let rfs = el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullScreen;

        rfs.call(el);
    } else {
        // for newer Webkit and Firefox
        document.cancelFullScreen && document.cancelFullScreen() ||
        document.webkitCancelFullScreen && document.webkitCancelFullScreen() ||
        document.mozCancelFullScreen && document.mozCancelFullScreen() ||
        document.msExitFullscreen && document.msExitFullscreen();
    }
};


export default toggleScreen;
