Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('notifications')];
    }
});

Router.route('/story/:_id', {
    name: 'storyPage',
    data: function() {
        return Stories.findOne(this.params._id);
    },
    waitOn: function() {
        return [
            Meteor.subscribe('singleStory', this.params._id),
            Meteor.subscribe('chapters', this.params._id)
        ];
    }
});

StoryListController = RouteController.extend({
    template: 'storyList',
    increment: 5,
    storyLimit: function() {
        return parseInt(this.params.storyLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {createdAt: -1}, limit: this.storyLimit()};
    },
    subscriptions: function() {
        this.storySub = Meteor.subscribe('stories', this.findOptions());
    },
    stories: function() {
        return Stories.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.stories().count() === this.storyLimit();
        var nextPath = this.route.path({
            storyLimit: this.storyLimit() + this.increment
        });

        return {
            stories: this.stories(),
            ready: this.storySub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.route('/:storyLimit?', {
    name: 'storyList',
    fastRender: true
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction('dataNotFound', {only: 'storyPage'});
Router.onBeforeAction(requireLogin, {only: 'storyPage'});