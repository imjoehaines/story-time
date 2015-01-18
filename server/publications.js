Meteor.publish('chapters', function(storyId) {
    check(storyId, String);
    return Chapters.find({storyId: storyId});
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
