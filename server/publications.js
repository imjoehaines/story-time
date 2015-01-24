Meteor.publish('chapters', function(storyId, options) {
    check(storyId, String);
    check(options, {
        sort: Object,
        limit: Number
    });

    return Chapters.find({storyId: storyId}, options);
});

Meteor.publish('stories', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });

    return Stories.find({}, options);
});

Meteor.publish('singleStory', function(id) {
    check(id, String);

    return Stories.find(id);
});

Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});
