Template.notifications.helpers({
    notifications: function() {
        return Notifications.find({userId: Meteor.userId(), read:false});
    },
    notificationCount: function() {
        return Notifications.find({userId: Meteor.userId(), read:false}).count();
    },
    notificationText: function() {
        var count = Notifications.find({userId: Meteor.userId(), read:false}).count();

        return count > 1 && 'notifications!' || 'notification!';
    }
});

Template.notificationItem.helpers({
    notificationStoryPath: function() {
        return Router.routes.storyPage.path({_id: this.storyId});
    },
    notificationStoryTitle: function() {
        return Notifications.findOne({_id: this._id}).storyTitle;
    },
    notificationTime: function() {
        return Notifications.findOne({_id: this._id}).createdAt;
    },
});

Template.notificationItem.events({
    'click a': function(e) {
        e.preventDefault();

        var storyId = this.storyId;

        Meteor.call('markNotificationsAsRead', storyId);
        Router.go('storyPage', {_id: storyId});
    }
});

Template.notificationItem.rendered = function() {
    jQuery("time").timeago();
};

Template.notificationsDropdown.helpers({
    notifications: function() {
        return Notifications.find({userId: Meteor.userId(), read:false});
    }
});

