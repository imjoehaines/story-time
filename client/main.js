Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper('storyTitleDate', function() {
    var date = this.createdAt,
        dateString = '',
        now = new Date();

    if(date.getFullYear() != now.getFullYear() ||
        date.getMonth() != now.getMonth() ||
        date.getDate() != now.getDate()) {
            dateString = date.getFullYear();
            dateString += '/' + date.getMonth() + 1;
            dateString += '/' + date.getDate();
    } else {
        dateString = date.getHours();

        if(date.getMinutes() > 10)
            dateString += ':' + date.getMinutes();
        else
            dateString += ':0' + date.getMinutes();
    }

    return dateString;
});

// set timeago strings
jQuery.timeago.settings.strings = {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: null,
    suffixFromNow: null,
    inPast: null,
    seconds: "just now",
    minute: "a minute ago",
    minutes: "%d minutes ago",
    hour: "an hour ago",
    hours: "%d hours ago",
    day: "a day ago",
    days: "%d days ago",
    month: "a month ago",
    months: "%d months ago",
    year: "a year ago",
    years: "%d years ago",
    wordSeparator: " ",
    numbers: []
    
};

Accounts.onLogout(function() {
    Router.go('/');
});