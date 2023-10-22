//init the storage
chrome.storage.local.get((strg)=>{
    console.log(strg)
    if(!Object.keys(strg).includes("auto_quality_check")){
        chrome.storage.local.set({"auto_quality_check":"off"})
    }
})