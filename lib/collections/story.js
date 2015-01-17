Stories = new Mongo.Collection('stories');
Chapters = new Mongo.Collection('chapters');

Meteor.methods({
    newStory: function(story) {
        check(Meteor.userId(), String);
        check(story, {title: String});

        var user = Meteor.user();
        var newStory = _.extend(story, {
            userId: user._id,
            author: user.username,
            createdAt: new Date(),
            chapterCount: 0
        });

        var storyId = Stories.insert(newStory);

        return {_id: storyId};
    },
    newChapter: function(chapter) {
        check(Meteor.userId(), String);
        check(chapter, {text: String, storyId: String});

        var user = Meteor.user();
        var newChapter = _.extend(chapter, {
            userId: user._id,
            author: user.username,
            createdAt: new Date()
        });

        // increment the chapter count by 1
        Stories.update(newChapter.storyId, {$inc: {chapterCount: 1}});

        chapter._id = Chapters.insert(newChapter);

        createChapterNotification(chapter);

        return {_id: chapter._id};
    },
    deleteStory: function(story) {
        check(Meteor.userId(), String);

        var user = Meteor.user();

        if(story.userId == user._id) {
            Chapters.remove({storyId: story._id});
            Stories.remove(story._id);
        }
    },
    deleteChapter: function(story, chapter) {
        check(Meteor.userId(), String);

        var user = Meteor.user();

        if(chapter.userId == user._id || story.userId == user._id) {
            Stories.update(chapter.storyId, {$inc: {chapterCount: -1}});
            Chapters.remove(chapter._id);
        }
    }
});
