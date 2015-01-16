Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('stories'), Meteor.subscribe('notifications')];
    }
});

Router.route('/', {name: 'storyList', fastRender: true });
Router.route('/story/:_id', {
    name: 'storyPage',
    data: function() {
        return Stories.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('chapters', this.params._id);
    }
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