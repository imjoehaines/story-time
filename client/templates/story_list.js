Template.storyList.events({
    'submit': function(e) {
        e.preventDefault();
        var newStoryInput = $('input.newStory');

        if(newStoryInput.val().length !== 0) {            
            var story = {
                title: newStoryInput.val(),
            };

            Meteor.call('newStory', story, function(error, result) {
                if(error)
                    return alert(error.reason);

                newStoryInput.val('');

                swal({
                    title: 'Success!',
                    text: 'Your story "' + story.title + '" was successfully created!',
                    type: 'success',
                    confirmButtonText: 'Go to story →',
                    showCancelButton: true,
                    cancelButtonText: 'Close',
                    allowOutsideClick: true,
                    closeOnConfirm: true,
                    confirmButtonColor: '#33C3F0'
                }, function() {
                    Router.go('storyPage', {_id: result._id});
                });
            });

        }
    }
});