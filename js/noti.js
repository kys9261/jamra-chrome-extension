var notificationOption = {
    type: "basic",
    title: "",
    message: "",
    iconUrl: "img/icon.png",
    requireInteraction: true
}

function notification(title, message){
    notificationOption.title = title;
    notificationOption.message = message;
    chrome.notifications.create(notificationOption);
}