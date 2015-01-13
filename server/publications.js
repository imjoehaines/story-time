Meteor.publish('chapters', function(storyId) {
    check(storyId, String);
    return Chapters.find({storyId: storyId});
});

Meteor.publish('stories', function() {
    return Stories.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});