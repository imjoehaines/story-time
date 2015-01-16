Template.chapter.helpers({
    canDeleteChapter: function() {
        var story = Stories.findOne({_id: this.storyId});
        return this.userId === Meteor.userId() || Meteor.userId() === story.userId;
    }
});

Template.chapter.events({
    'click .delete': function(e) {
        e.preventDefault();

        var chapterId = this._id;
        var chapter = Chapters.findOne({_id: chapterId});
        var story = Stories.findOne({_id: chapter.storyId});

        swal({
            title: 'Are you sure?',
            text: 'Do you really want to delete this chapter?\nThis can\'t be undone!',
            type: 'warning',
            confirmButtonText: 'Confirm',
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonColor: '#33C3F0'
        }, function() {
            Meteor.call('deleteChapter', story, chapter, function(error) {
                if(error) {
                    return swal({
                        title: 'Oops! :(',
                        text: 'We couldn\'t delete that chapter right now, try again later.',
                        type: 'error',
                        confirmButtonColor: '#33C3F0'
                    });
                } else {
                    swal({
                        title: 'Deleted!',
                        text: 'Successfully deleted the chapter!',
                        type: 'success',
                        confirmButtonColor: '#33C3F0',
                        timer: 2000
                    });
                }
            });
        });
    }
});


Template.chapter.rendered = function() {
    jQuery("time").timeago();
};