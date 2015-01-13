Template.storyTitle.helpers({
    ownPost: function() {
        return this.userId === Meteor.userId();
    }
});

Template.storyTitle.events({
    'click .delete': function(e) {
        e.preventDefault();

        var storyId = this._id;
        var currentStoryTitle = Stories.findOne({_id: storyId}).title;

        swal({
            title: 'Are you sure?',
            text: 'Do you really want to delete "' + currentStoryTitle + '"?\nThis can\'t be undone!',
            type: 'warning',
            confirmButtonText: 'Confirm',
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonColor: '#33C3F0'
        }, function() {
            Stories.remove(storyId);
            swal({
                title: 'Deleted!',
                text: 'Successfully deleted "' + currentStoryTitle + '"!',
                type: 'success',
                confirmButtonColor: '#33C3F0'            
            });
        });
    }
});

Template.storyTitle.rendered = function() {
    jQuery("time").timeago();
};
