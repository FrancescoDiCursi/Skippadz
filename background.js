//init the storage
chrome.storage.local.get((strg)=>{
    console.log(strg)
    if(!Object.keys(strg).includes("auto_quality_check") || !Object.keys(strg).includes("time_tracker_els") ||  !Object.keys(strg).includes("time_tracker")){
        chrome.storage.local.set({"auto_quality_check":"off", "time_tracker_els":[0,0,""], "time_tracker":'off'})
    }
})