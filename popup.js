

var auto_quality_check= document.getElementById("auto_quality_check")
var time_tracker= document.getElementById("time_tracker")
var info_box= document.getElementById("info_box")

var quality_cont= document.getElementById("auto_quality_cont")
var time_cont= document.getElementById("time_tracker_cont")
var quality_info="<u><b>It automatically set the higher quality after ad removal</b></u><br>(unfortunatly, the video is set to the lowest quality).<br><b>EXPERIMENTAL: it may not work as excpected.<b>"
var time_info="<u><b>It automatically set the video to the last saved time in case of unwanted video rewind.</b></u><br>(unfortunatly, the video may be set to the beginning after some mid-roll ads).<br><b>EXPERIMENTAL: it may not work as excpected.<br>Setting the video to a value less than 5 triggers the function if the saved time is higher than the current one.<b>"
let opt_list=[quality_cont, time_cont]
let infos=[quality_info,time_info]

opt_list.forEach((element,i) => {
    element.addEventListener("mouseover", ()=>{
        info_box.innerHTML=infos[i]
    })
    
    element.addEventListener("mouseout",()=>{
        info_box.innerHTML=""
    })
});
//add onhover for info-box

chrome.storage.local.get((val)=>{
    console.log("STORAGEOLD", val, auto_quality_check.value)
    auto_quality_check.value= val.auto_quality_check
    auto_quality_check.checked= val.auto_quality_check==="on" ?true :false

    time_tracker.value= val.time_tracker
    time_tracker.checked= val.time_tracker==="on" ?true :false

    console.log("STORAGE", val, auto_quality_check.value, time_tracker.value)

    
    auto_quality_check.addEventListener("click",(e)=>{
        if (e.target.value==="on"||e.target.value===null){
            e.target.value="off"
            chrome.storage.local.set({"auto_quality_check":"off"})
    
        }else if(e.target.value==="off"){
            e.target.value="on"
            chrome.storage.local.set({"auto_quality_check":"on"})
    
        }
    
    })
     
    time_tracker.addEventListener("click",(e)=>{
        if (e.target.value==="on"||e.target.value===null){
            e.target.value="off"
            chrome.storage.local.set({"time_tracker":"off"})
    
        }else if(e.target.value==="off"){
            e.target.value="on"
            chrome.storage.local.set({"time_tracker":"on"})
    
        }
    
    })


    
})

