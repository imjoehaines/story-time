Template.storyPage.helpers({
    chapterList: function() {
        return Chapters.find({storyId: this._id}, {sort: {createdAt: -1}});
    },
    storyTitle: function() {
        return Stories.findOne({_id: this._id}).title;
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
                storyId: this._id
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
