Stories = new Mongo.Collection('stories');
Chapters = new Mongo.Collection('chapters');

Stories.allow({
    remove: function(userId, story) {
        return authorOfStory(userId, story);
    }
});

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
    }
});
