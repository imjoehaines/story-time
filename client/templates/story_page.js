Template.storyPage.helpers({
    storyTitle: function() {
        return Stories.findOne({_id: this.story._id}).title;
    },
    chapterCount: function() {
        return Stories.findOne({_id: this.story._id}).chapterCount;
    }
});

Template.storyPage.events({
    'submit': function(e) {
        e.preventDefault();
        var newChapterInput = $('input.newStory');
        var newChapter = newChapterInput.val();
        newChapterInput.val('');

        if(newChapter.length !== 0) {            
            var chapter = {
                text: newChapter,
                storyId: this.story._id
            };

            Meteor.call('newChapter', chapter, function(error, result) {
                if(error) {
                    return swal({
                        title: 'Oops! :(',
                        text: 'We couldn\'t create that chapter right now, try again later.',
                        type: 'error',
                        confirmButtonColor: '#33C3F0'
                    });
                }
            });   
        }
    }
});

Template.storyPage.rendered = function() {
    jQuery("time").timeago();
};
