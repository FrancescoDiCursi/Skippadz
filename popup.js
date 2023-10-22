

var auto_quality_check= document.getElementById("auto_quality_check")
chrome.storage.local.get((val)=>{
    console.log("STORAGEOLD", val, auto_quality_check.value)
    auto_quality_check.value= val.auto_quality_check
    auto_quality_check.checked= val.auto_quality_check==="on" ?true :false
    console.log("STORAGE", val, auto_quality_check.value)

    
    auto_quality_check.addEventListener("click",(e)=>{
        if (e.target.value==="on"||e.target.value===null){
            e.target.value="off"
            chrome.storage.local.set({"auto_quality_check":"off"})
    
        }else if(e.target.value==="off"){
            e.target.value="on"
            chrome.storage.local.set({"auto_quality_check":"on"})
    
        }
    
    })
})

