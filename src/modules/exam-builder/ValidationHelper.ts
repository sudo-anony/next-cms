class ValidationHelper {
    threshold: number;
    isConsoleOpen: boolean;
    intervalId: any;
    debuggerIntervalId: any;

    constructor(threshold = 160) {
        this.threshold = threshold;
        this.isConsoleOpen = false;
        this.intervalId = null;
        this.debuggerIntervalId = null;
    }

    checkConsole = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > this.threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > this.threshold;
        if (widthThreshold || heightThreshold) {
            if (!this.isConsoleOpen) {
                this.isConsoleOpen = true;
                alert('Developer tools are open. Please close them to continue using the site.');
            }
        } else {
            this.isConsoleOpen = false;
        }
    };

    

    startConsoleCheck = () => {
        this.intervalId = setInterval(this.checkConsole, 1000);

        this.debuggerIntervalId = setInterval(() => {
            const before = new Date().getTime();
            debugger;
            const after = new Date().getTime();
            if (after - before > 100) {
                alert('Developer tools are open. Please close them to continue using the site.');
            }
        }, 1000);
    };

    stopConsoleCheck = () => {
        if (this.intervalId) clearInterval(this.intervalId);
        if (this.debuggerIntervalId) clearInterval(this.debuggerIntervalId);
    };

    handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = '';
    };

    handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            console.log('User has switched to a different tab or minimized the window');
        } else {
            console.log('User is back on the page');
        }
    };
}

export default ValidationHelper;
