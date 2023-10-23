

    window.addEventListener('load',()=>{
        chrome.storage.local.get("auto_quality_check").then((val)=>{
                //add state bar
                [state_cont, info_cont, state, info_reload, info_reload2, info_reload3] = add_nodes()
                console.log("STORAGE", val)

                //reload the page if error
                waitForElm(".ytp-error").then(()=>{
                    location.reload()
                })

                var quality_click=false
                var max_quality=  val.auto_quality_check==="off" ?false :true //replace this var with a value of popup checkbox

                console.log("MAX QUALITY", max_quality)
                //alert("LOADED")
                //re apply promises on each click
            skip_skippable(state_cont, info_cont, state, info_reload, info_reload2, info_reload3,quality_click,max_quality)
                //hide the unskippable
                skip_unskippable(state_cont, info_cont, state, info_reload, info_reload2, info_reload3,quality_click,max_quality)   
                window.addEventListener('click',()=>{
                    console.log("Promises reapplied")
                    //skip the skippable
                    skip_skippable(state_cont, info_cont, state, info_reload, info_reload2, info_reload3, quality_click,max_quality)
                    //hide the unskippable
                    skip_unskippable(state_cont, info_cont, state, info_reload, info_reload2, info_reload3, quality_click,max_quality)
                })

                document.body.click()
                document.body.click()
                
                document.body.click()
                document.body.click()



        })


        //time tracker
        chrome.storage.local.get("time_tracker").then((val)=>{
            var time_tracker_= val.time_tracker==="off" ?false :true

            if(time_tracker_){
                setInterval(()=>{
                    //detect if video playing
                    //if ads, do not excecute
                    let skippable_sign=document.querySelector(".ytp-ad-skip-button.ytp-button")
                    let unskippable_sign= document.querySelector(".ytp-ad-preview-container")
                    if(skippable_sign===null && unskippable_sign===null){
                        eval_time()
                    }else{
                        //
                    }
        
                },15000)
            }
            
            //reset storage time_tracker on yt-progress bar click!
            //understand how to detect the click on the progress bar
            //NOW: temporary workaround: if the current time is close to 0 (lower than 5) then reload the page with the storage value
            //but now, if one clicks on 0, it may happen that the video is reloaded to the greater value saved in storage
            //FIX THIS!
            //document.querySelector(".ytp-progress-list").addEventListener("click",()=>{console.log("clicked")}) // NOT WORKING
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



    function skip_skippable(state_cont, info_cont, state, info_reload, info_reload2, info_reload3,quality_click,max_quality){
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
    }

    function skip_unskippable(state_cont, info_cont, state, info_reload, info_reload2, info_reload3, quality_click,max_quality){
        waitForElm('.ytp-ad-preview-container').then((popup)=>{ //.ytp-ad-player-overlay-instream-info
            state_cont.style.visibility="visible"
            info_cont.style.visibility="visible"
            state.textContent="Removing ads... Please do not click until the process is done."
            for(let i=0; i<6;i++){
                setTimeout(() => {
                    var elm=document.querySelector(".video-stream.html5-main-video")
                    elm.src=""

                    if(i===5){
                        waitForElm('.ytp-large-play-button.ytp-button').then((play_btn)=>{
                            setTimeout(()=>{
                                if(max_quality){
                                    state.textContent="Adjusting the video quality... Please do not click until the process is done. (It may take up to 10 seconds)"
                                }                              
                                var video_player= document.querySelector(".html5-video-player")
                                if(video_player.className.includes("paused-mode")  || document.querySelector('.ytp-ad-preview-container')){
                                    play_btn.click()
                                    //max quality
                                    //handle this in popup input
                                   
                                    if(max_quality && quality_click===false){ //&& quality_click===false
                                        setTimeout(()=>{ //wait for ad to be removed
                                            var option_btn= document.querySelector(".ytp-button.ytp-settings-button")
                                            var option_div= document.querySelector(".ytp-popup.ytp-settings-menu")
                                            //option_div.style.display="block"

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
                                                },3000)
                                            }
                                            else{
                                                state.textContent=""
                                                state_cont.style.visibility="hidden"
                                                info_cont.style.visibility="hidden"
                                                option_btn.click()
                                            }
                                        },10000)

                                    }else{
                                        state.textContent=""
                                        state_cont.style.visibility="hidden"
                                        info_cont.style.visibility="hidden"
                                        //option_btn.click() //close div and hopefully start a new promise on click

                                    }
                                }

                                if(!max_quality){
                                    state.textContent=""
                                    state_cont.style.visibility="hidden"
                                    info_cont.style.visibility="hidden"
                                    //option_btn.click() //close div and hopefully start a new promise on click
                                }
                                
                            },7000)
                        })
                    }

                }, 10*(i+1));

            }
            //console.log("Unskippable skipped")
            //some ads, after being removed, pause the video. Press play.
    
    
        })

    }

function add_nodes(){
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

    return [state_cont, info_cont, state, info_reload, info_reload2, info_reload3]
}

function eval_time(){
    chrome.storage.local.get((strg)=>{
    let strg_arr = strg.time_tracker_els
    let curr_arr= track_time()
    
    console.log("TIMER")
    console.log(strg_arr)
    //console.log(whole_time_temp, curr_time_temp, video_title_temp)
    console.log(curr_arr)

    //handle
    //if equal title, equal whole time AND current time lower than storage one and particularly curr time is close to 0, then the ad removal restarted the video.
    //load the page at the saved seconds 
    //CHECK FROM HERE!
    if(curr_arr[-1]===strg_arr[-1] && curr_arr[0]===strg_arr[0] && curr_arr[1]<strg_arr[1] && curr_arr[1]<=5){ //
        let current_url=window.location.href
        let new_time=`&t=${strg_arr[1]+5}`
        window.location.href=current_url+new_time
    }
    })
}

function track_time(save_to_strg=true){
 //show the bottom bar
 var opt_btn=document.querySelector(".ytp-button.ytp-settings-button")
 opt_btn.click()
 //retrieve time
 var video_title=document.querySelector("h1.style-scope.ytd-watch-metadata")
 var video_title_text= video_title.textContent.replace("\n","").trim()
 var curr_time=document.querySelector(".ytp-time-current")
 var curr_time_text= curr_time.textContent
 var whole_time= document.querySelector(".ytp-time-duration")
 var whole_time_text= whole_time.textContent

 //convert
 var curr_time_sec=convert_time_to_sec(curr_time_text)
 var whole_time_sec=convert_time_to_sec(whole_time_text)

 //save to storage
 if(save_to_strg){
    chrome.storage.local.set({"time_tracker_els":[whole_time_sec, curr_time_sec, video_title_text]})
 }
 opt_btn.click()

 console.log("TRACK TIME DATA", [whole_time_sec,curr_time_sec,video_title_text])

return [whole_time_sec,curr_time_sec,video_title_text]


}

function convert_time_to_sec(s){
    var raw_time_list= s.split(":")
    var hours=0
    var minutes=0
    var seconds=0
    if (raw_time_list.length===2){
        minutes= +raw_time_list[0]*60
        seconds= +raw_time_list[1]

    }else if (raw_time_list.length===3){
        hours= +raw_time_list[0]*3600
        minutes= +raw_time_list[1]*60
        seconds= +raw_time_list[2]

    }


    return [hours, minutes, seconds].reduce((a,b)=>a+b,0)
}