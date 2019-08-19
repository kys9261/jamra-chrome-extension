setInterval(function() {
    ajaxGroupInfo(function(response) {
        scheduleUpdateCheck([response.g.en, response.g.en2, response.g.en3]);        
    });

    ajaxToday(function(response) {
        if(response.ei == null){
            return;
        }
        todayUpdateCheck(response.ei.en);
    });
    
    ajaxBbsList(function(response) {
        var bbsTitleArr = [];

        var bbsList = response.cs.splice(0, 7);
        for (var i = 0; i < 7; i++) {
            bbsTitleArr.push(bbsList[i].at);
        }
        bbsUpdateCheck(bbsTitleArr);
    });
}, 10000);