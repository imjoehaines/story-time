Meteor.methods({
    markNotificationsAsRead: function(storyId) {
        Notifications.update({storyId: storyId, read: false}, {$set: {read: true}}, {multi: true});
        Notifications.remove({read:true});
    }
});