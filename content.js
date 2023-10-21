window.addEventListener('load',()=>{
    //add state bar
    var state_cont=document.createElement("div")
    var info_cont=document.createElement("div")
    try{
        var video_width=document.querySelector("video").style.width

    }catch{
        var video_width="1000px"
    }
    state_cont.style.width=video_width
    state_cont.style.backgroundColor="white"
    state_cont.style.border="1px solid black"
    state_cont.id="state_cont"
    state_cont.style.position="absolute"
    state_cont.style.zIndex="9999999"
    state_cont.style.top="50px"
    state_cont.style.left="100px"
    state_cont.style.display="flex"
    state_cont.style.flexDirection="row"
    state_cont.style.visibility="hidden"
    
    info_cont.style.width=video_width
    info_cont.style.backgroundColor="white"
    info_cont.style.border="1px solid black"
    info_cont.id="info_cont"
    info_cont.style.position="absolute"
    info_cont.style.zIndex="9999999"
    info_cont.style.top="85px"
    info_cont.style.left="100px"
    info_cont.style.display="flex"
    info_cont.style.flexDirection="column"
    info_cont.style.visibility="hidden"

    var icon= document.createElement("img")
    icon.id="logo_ext"
    icon.style.width="30px"
    icon.style.height="30px"
    icon.style.marginRight="10px"
    var icon_url= chrome.runtime.getURL("yt_img.png")
    icon.src=icon_url
    var state= document.createElement("p")
    state.id="state_text"
    state.textContent=""
    state.style.color="red"
    state.style.fontSize="20px"
    var info_reload= document.createElement("p")
    var info_reload2= document.createElement("p")
    var info_reload3= document.createElement("p")


    info_reload.id="info_reload_text"
    info_reload.textContent="If the red message doesn't disappear, or for any other bug, reload the page."
    info_reload.style.color="blue"
    info_reload.style.fontSize="16px"
    info_reload.style.marginLeft="40px"
    info_reload2.id="info_reload_text2"
    info_reload2.textContent="If the problem persists, reload the extension."
    info_reload2.style.color="blue"
    info_reload2.style.fontSize="16px"
    info_reload2.style.marginLeft="40px"
    info_reload3.id="info_reload_text3"
    info_reload3.textContent="Finally, if nothing works, close and open the browser."
    info_reload3.style.color="blue"
    info_reload3.style.fontSize="16px"
    info_reload3.style.marginLeft="40px"

    state_cont.appendChild(icon)
    state_cont.appendChild(state)
    info_cont.appendChild(info_reload)
    info_cont.appendChild(info_reload2)
    info_cont.appendChild(info_reload3)
    document.body.insertBefore(info_cont,  document.body.firstChild)
    document.body.insertBefore(state_cont, document.body.firstChild)

    var quality_click=false
    //alert("LOADED")
    //re apply promises on each click
    //skip the skippable
        waitForElm('.ytp-ad-skip-button.ytp-button').then((elm) => {
            state_cont.style.visibility="visible"
            info_cont.style.visibility="visible"
            state.textContent="Removing ads... Please do not click until the process is done."
            elm.click()
            state.textContent=""
            state_cont.style.visibility="hidden"
            info_cont.style.visibility="hidden"
            //console.log("Skippable skipped")
        });
        //hide the unskippable
        waitForElm('.ytp-ad-preview-container').then((popup)=>{ //.ytp-ad-player-overlay-instream-info
            state_cont.style.visibility="visible"
            info_cont.style.visibility="visible"
            state.textContent="Removing ads... Please do not click until the process is done."
            for(let i=0; i<31;i++){
                setTimeout(() => {
                    var elm=document.querySelector(".video-stream.html5-main-video")
                    elm.src=""

                    if(i==30){
                        waitForElm('.ytp-large-play-button.ytp-button').then((play_btn)=>{
                            setTimeout(()=>{
                                state.textContent="Adjusting the video quality... Please do not click until the process is done. (It may take up to 10 seconds)"
                                var video_player= document.querySelector(".html5-video-player")
                                if(video_player.className.includes("paused-mode")  || document.querySelector('.ytp-ad-preview-container')){
                                    play_btn.click()
                                    //max quality
                                    //handle this in popup input
                                    var max_quality=true //replace this var with a value of popup checkbox
                                    if(max_quality && quality_click===false){
                                        setTimeout(()=>{ //wait for ad to be removed
                                            var option_btn= document.querySelector(".ytp-button.ytp-settings-button")
                                            option_btn.click()
                                            var all_opts=document.querySelectorAll(".ytp-menuitem")
                                            var quality_opt= all_opts.item(all_opts.length-1)
                                            if(quality_opt.textContent.startsWith("Q")){
                                                quality_opt.click()
                                                setTimeout(()=>{//wait for new section to load
                                                    var all_qualities= document.querySelectorAll(".ytp-menuitem") //same identifier of all_opts cause the div is dynamic
                                                    var all_opts= []
                                                    all_qualities.forEach((d,i)=>{
                                                        if(!all_qualities.item(i).textContent.includes("remium")){ //Premium
                                                            all_opts.push(all_qualities.item(i))
        
                                                        }
                                                    })
                                                    var quality_idx=0 //also add an int input in the popup for the quality
                                                    
                                                    all_opts[quality_idx].click()
                                                    quality_click=true
                                                    state.textContent=""
                                                    state_cont.style.visibility="hidden"
                                                    info_cont.style.visibility="hidden"
                                                    //reset quality click
                                                    setTimeout(()=>{
                                                        quality_click=false
                                                    },5000)
                                                },1000)
                                            }
                                        },10000)

                                    }else{
                                        option_btn.click() //close div and hopefully start a new promise on click

                                    }
                                }
                            },5000)
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
            state_cont.style.visibility="visible"
            info_cont.style.visibility="visible"
            state.textContent="Removing ads... Please do not click until the process is done."
            elm.click()
            //console.log("Skippable skipped")
            state.textContent=""
            state_cont.style.visibility="hidden"
            info_cont.style.visibility="visible"
        });
        //hide the unskippable
        waitForElm('.ytp-ad-preview-container').then((popup)=>{ //.ytp-ad-player-overlay-instream-info
            state_cont.style.visibility="visible"
            info_cont.style.visibility="visible"
            state.textContent="Removing ads... Please do not click until the process is done."
            for(let i=0; i<31;i++){
                setTimeout(() => {
                    var elm=document.querySelector(".video-stream.html5-main-video")
                    elm.src=""

                    if(i==30){
                        waitForElm('.ytp-large-play-button.ytp-button').then((play_btn)=>{
                            setTimeout(()=>{
                                state.textContent="Adjusting the video quality... Please do not click until the process is done. (It may take up to 10 seconds)"
                                var video_player= document.querySelector(".html5-video-player")
                                if(video_player.className.includes("paused-mode")  || document.querySelector('.ytp-ad-preview-container')){
                                    play_btn.click()
                                    //max quality
                                    //handle this in popup input
                                    var max_quality=true //replace this var with a value of popup checkbox
                                    if(max_quality && quality_click===false){
                                        setTimeout(()=>{ //wait for ad to be removed
                                            var option_btn= document.querySelector(".ytp-button.ytp-settings-button")
                                            option_btn.click()
                                            var all_opts=document.querySelectorAll(".ytp-menuitem")
                                            var quality_opt= all_opts.item(all_opts.length-1)
                                            if(quality_opt.textContent.startsWith("Q")){
                                                quality_opt.click()
                                                setTimeout(()=>{//wait for new section to load
                                                    var all_qualities= document.querySelectorAll(".ytp-menuitem") //same identifier of all_opts cause the div is dynamic
                                                    var all_opts= []
                                                    all_qualities.forEach((d,i)=>{
                                                        if(!all_qualities.item(i).textContent.includes("remium")){ //Premium
                                                            all_opts.push(all_qualities.item(i))
        
                                                        }
                                                    })
                                                    var quality_idx=0 //also add an int input in the popup for the quality
                                                    
                                                    all_opts[quality_idx].click()
                                                    quality_click=true
                                                    state.textContent=""
                                                    state_cont.style.visibility="hidden"
                                                    info_cont.style.visibility="hidden"
                                                    //reset quality click
                                                    setTimeout(()=>{
                                                        quality_click=false
                                                    },5000)
                                                },1000)
                                            } else{
                                                option_btn.click() //close div and hopefully start a new promise on click


                                            }
                                        },10000)

                                    }
                                }
                            },5000)
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
    