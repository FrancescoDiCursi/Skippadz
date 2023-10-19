window.addEventListener('load',()=>{
    
    //alert("LOADED")
    //re apply promises on each click
    //skip the skippable
        waitForElm('.ytp-ad-skip-button.ytp-button').then((elm) => {
            elm.click()
            //console.log("Skippable skipped")
        });
        //hide the unskippable
        waitForElm('.ytp-ad-preview-container').then((popup)=>{ //.ytp-ad-player-overlay-instream-info
    
    
            for(let i=0; i<31;i++){
                setTimeout(() => {
                    var elm=document.querySelector(".video-stream.html5-main-video")
                    elm.src=""

                    if(i==30){
                        waitForElm('.ytp-large-play-button.ytp-button').then((play_btn)=>{
                            setTimeout(()=>{
                                var video_player= document.querySelector(".html5-video-player")
                                if(video_player.className.includes("paused-mode")  || document.querySelector('.ytp-ad-preview-container')){
                                    play_btn.click()
                                }
                            },3000)
                        })
                    }
                }, 100*(i+1));

            }
            //console.log("Unskippable skipped")
            //some ads, after being removed, pause the video. Press play.
    
    
        })

    window.addEventListener('click',()=>{
        console.log("Promises reapplied")
        //skip the skippable
        waitForElm('.ytp-ad-skip-button.ytp-button').then((elm) => {
            elm.click()
            //console.log("Skippable skipped")
        });
        //hide the unskippable
        waitForElm('.ytp-ad-preview-container').then((popup)=>{ //.ytp-ad-player-overlay-instream-info


            for(let i=0; i<31;i++){
                setTimeout(() => {
                    var elm=document.querySelector(".video-stream.html5-main-video")
                    elm.src=""

                    if(i==30){
                        waitForElm('.ytp-large-play-button.ytp-button').then((play_btn)=>{
                            setTimeout(()=>{
                                var video_player= document.querySelector(".html5-video-player")
                                //console.log(video_player.className)
                                if(video_player.className.includes("paused-mode") || document.querySelector('.ytp-ad-preview-container')){
                                    play_btn.click()
                                }
                            },3000)
                        })
                    }
                }, 100*(i+1));
            }
           // console.log("Unskippable skipped")



        })
    })

    document.body.click()
    document.body.click()
    
    document.body.click()
    document.body.click()
    
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

function reloadPage() {

    // The last "domLoading" Time //
    
    var currentDocumentTimestamp =
    
    new Date(performance.timing.domLoading).getTime();
    
    // Current Time //
    
    var now = Date.now();
    
    // Ten Seconds //
    
    var tenSec = 10 * 1000;
    
    // Plus Ten Seconds //
    
    var plusTenSec = currentDocumentTimestamp + tenSec;
    
    if (now > plusTenSec) {
    
    location.reload();
    
    } else {}
    
    }
    