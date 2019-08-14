function scheduleUpdateCheck(titleArr) {
    chrome.storage.sync.get('schedule', function(items) {
        if($.isEmptyObject(items)){
            chrome.storage.sync.set({'schedule': titleArr});
        } else {
            for(var i=0; i<titleArr.length; i++) {
                if(!items.schedule.includes(titleArr[i])){
                    notification('[JAMRA] 새로운 정모 일정이 등록되었습니다.', titleArr[i]);
                    updateData('schedule', {'schedule': titleArr});
                } 
            }
        }
    });
}

function todayUpdateCheck(todayTitle) {
    chrome.storage.sync.get('today', function(items) {
        if($.isEmptyObject(items)){
            chrome.storage.sync.set({'today': todayTitle});
        } else {
            if(items.today != todayTitle) {
                notification('[JAMRA] 새로운 번개 일정이 등록되었습니다.', todayTitle);
                updateData('today', {'today': todayTitle});
            }
        }
    });
}

function bbsUpdateCheck(bbsTitleArr) {
    chrome.storage.sync.get('bbs', function(items) {
        if($.isEmptyObject(items)){
            chrome.storage.sync.set({'bbs': bbsTitleArr});
        } else {
            for(var i=0; i<bbsTitleArr.length; i++) {
                if(!items.bbs.includes(bbsTitleArr[i])){
                    notification('[JAMRA] 새로운 게시물이 등록되었습니다.', bbsTitleArr[i]);
                    updateData('bbs', {'bbs': bbsTitleArr});
                } 
            }
        }
    });
}

function updateData(type, data) {
    chrome.storage.sync.remove(type);
    chrome.storage.sync.set(data);
}