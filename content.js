window.addEventListener('load',()=>{
    //alert("LOADED")
    waitForElm('.ytp-ad-skip-button.ytp-button').then((elm) => {
        console.log('Element is ready');
        console.log(elm.textContent);
        elm.click()
        console.log("AD SKIPPED")
    });
})

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}