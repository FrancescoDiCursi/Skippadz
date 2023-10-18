window.addEventListener('load',()=>{
    //alert("LOADED")
    //re apply promises on each click
    window.addEventListener('click',()=>{
        console.log("Promises reapplied")
        //skip the skippable
        waitForElm('.ytp-ad-skip-button.ytp-button').then((elm) => {
            elm.click()
            console.log("Skippable skipped")
        });
        //hide the unskippable
        waitForElm('ytp-ad-player-overlay-instream-info').then((popup)=>{


            var elm= document.querySelector(".video-stream.html5-main-video")
            elm.src=""
            console.log("Unskippable skipped")
            var random_elm= document.querySelector("#primary")
            random_elm.click()


        })
    })

    //only once
    //skip the skippable
    waitForElm('.ytp-ad-skip-button.ytp-button').then((elm) => {
        elm.click()
        console.log("Skippable skipped")
    });
    //hide the unskippable
    waitForElm('.ytp-ad-player-overlay-instream-info').then((popup)=>{

        
        var elm= document.querySelector(".video-stream.html5-main-video")
        elm.src=""
        console.log("Unskippable skipped")

        var random_elm= document.querySelector("#primary")
        random_elm.click()

    })



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