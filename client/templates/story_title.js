Template.storyTitle.helpers({
    ownPost: function() {
        return this.userId === Meteor.userId();
    }
});

Template.storyTitle.events({
    'click .delete': function(e) {
        e.preventDefault();

        var storyId = this._id;
        var story = Stories.findOne({_id: storyId});
        var storyTitle = story.title;

        swal({
            title: 'Are you sure?',
            text: 'Do you really want to delete "' + storyTitle + '"?\nThis can\'t be undone!',
            type: 'warning',
            confirmButtonText: 'Confirm',
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonColor: '#33C3F0'
        }, function() {
            Meteor.call('deleteStory', story, function(error) {
                if(error) {
                    return swal({
                        title: 'Oops! :(',
                        text: 'We couldn\t delete "' + storyTitle + '" right now, try again later.',
                        type: 'error',
                        confirmButtonColor: '#33C3F0'
                    });
                } else {
                    swal({
                        title: 'Deleted!',
                        text: 'Successfully deleted "' + storyTitle + '"!',
                        type: 'success',
                        confirmButtonColor: '#33C3F0',
                        timer: 2000
                    });
                }
            });
        });
    }
});

Template.storyTitle.rendered = function() {
    jQuery("time").timeago();
};
