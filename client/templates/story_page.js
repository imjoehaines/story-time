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

        if(newChapterInput.val().length !== 0) {            
            var chapter = {
                text: newChapterInput.val(),
                storyId: this._id
            };

            Meteor.call('newChapter', chapter, function(error, result) {
                if(error)
                    return alert(error.reason);

                newChapterInput.val('');
            });

        }
    }
});

Template.storyPage.rendered = function() {
    jQuery("time").timeago();
};
