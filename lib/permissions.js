authorOfStory = function(userId, story) {
    return story && story.userId === userId;
};

authorOfChapter = function(userId, chapter) {
    return chapter && chapter.userId === userId;
};