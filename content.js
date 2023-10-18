window.addEventListener('load',()=>{
    //alert("LOADED")
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
        try{
            random_elm.click() //reapply promises also for unskippable which doesn't need a click
        }catch{
            var random_elm= document.querySelector("#content")
            random_elm.click() //reapply promises also for unskippable which doesn't need a click

        }

    })
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
            try{
                random_elm.click() //reapply promises also for unskippable which doesn't need a click
            }catch{
                var random_elm= document.querySelector("#content")
                random_elm.click() //reapply promises also for unskippable which doesn't need a click
    
            }


        })
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