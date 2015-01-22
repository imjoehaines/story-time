Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, story, fieldNames) {
        return authorOfStory(userId, story) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createChapterNotification = function(chapter) {
    var story = Stories.findOne(chapter.storyId);
        
    if(chapter.userId !== story.userId) {
        Notifications.insert({
            userId: story.userId,
            storyId: story._id,
            storyTitle: story.title,
            chapterId: chapter._id,
            chapterAuthor: chapter.author,
            read: false,
            createdAt: new Date()
        });
    }
};