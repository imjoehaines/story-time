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
            chapterCount: 0,
            lastChapterBy: null
        });

        var storyId = Stories.insert(newStory);

        return {_id: storyId};
    },
    newChapter: function(chapter) {
        check(Meteor.userId(), String);
        check(chapter, {text: String, storyId: String});

        var user = Meteor.user();
        // TODO: Make this return with a helpful message instead of throwing an error. 
        if(Stories.findOne(chapter.storyId).lastChapterBy == user._id) {
            throw Meteor.Error('Permission error: can\'t add two chapters in a row!');
        }

        var newChapter = _.extend(chapter, {
            userId: user._id,
            author: user.username,
            createdAt: new Date()
        });

        // increment the chapter count by 1
        Stories.update(newChapter.storyId, {$inc: {chapterCount: 1}, $set: {lastChapterBy: user._id}});

        chapter._id = Chapters.insert(newChapter);

        createChapterNotification(chapter);

        return {_id: chapter._id};
    },
    deleteStory: function(story) {
        check(Meteor.userId(), String);

        var user = Meteor.user();

        if(story.userId == user._id) {
            Notifications.remove({storyId: story._id});
            Chapters.remove({storyId: story._id});
            Stories.remove(story._id);
        } else {
            throw Meteor.Error('Permission error: can\'t delete a story you didn\'t create');
        }
    },
    deleteChapter: function(story, chapter) {
        check(Meteor.userId(), String);

        var user = Meteor.user();

        if(chapter.userId == user._id || story.userId == user._id) {
            Stories.update(chapter.storyId, {$inc: {chapterCount: -1}});
            Chapters.remove(chapter._id);
            Notifications.remove({chapterId: chapter._id});
        }
    }
});
