Template.storyPage.helpers({
    storyTitle: function() {
        return Stories.findOne({_id: this.story._id}).title;
    },

    // returns the other attributes for the chapter input box
    // (disabled & placeholder)
    otherAttributes: function() {
        var isLastAuthor = this.story.lastChapterBy === Meteor.user()._id;

        if(isLastAuthor) {
            placeholderText = 'You can\'t write two chapters in a row, wait for someone else to write one!';
            isDisabled = true;
        } else {
            placeholderText = 'Add a chapter to this story...';
            // has to be undefined - false will still add disabled attribute to inputbox ???
            isDisabled = undefined;
        }

        return {
            disabled: isDisabled,
            placeholder: placeholderText
        };
    },

    // returns true if the user wrote the last chapter in the story
    isLastAuthor: function() {
        return this.story.lastChapterBy === Meteor.user()._id;
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
                } else if(result.success === false) {
                    return swal({
                        title: 'Oops! :(',
                        text: 'You can\'t write two chapters in a row, wait for someone else to write one before trying again.',
                        type: 'info',
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
