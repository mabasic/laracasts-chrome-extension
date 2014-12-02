var NotifierItem = React.createClass({displayName: 'NotifierItem',
    render: function () {
        return (
        	React.createElement("a", {target: "_blank", href: this.props.href, className: "list-group-item"}, 
		    	React.createElement("h4", {className: "list-group-item-heading"}, this.props.heading), 
		    	React.createElement("p", {className: "list-group-item-text"}, this.props.text)
		  	)
        );
    }
});

var Notifier = React.createClass({displayName: 'Notifier',
	getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        //this.fetchFeedFromLaracasts();
        //setInterval(this.fetchFeedFromLaracasts, this.props.pollInterval);
        this.setState({data: this.props.data});
    },
    fetchFeedFromLaracasts: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data.data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {

    	var optionNodes = this.state.data.map(function (item) {
            return (
                React.createElement(NotifierItem, {heading: item.heading, text: item.text, href: item.link})
            );
        });
        return (
        	React.createElement("div", {className: "list-group"}, 
			  	optionNodes
			)
        );
    }
});

var data = [
  {
  	heading: "How to Build Command-Line Apps",
  	text: "In this series, we'll learn how how to build command-line apps from scratch, using Symfony's excellent console component. In no time, you'll be whipping up executables to perform all sorts of tasks.",
  	link: "https://laracasts.com/series/how-to-build-command-line-apps-in-php"
  },
  {
  	heading: "Case Study: The Laravel Installer",
  	text: "To continue our learning, let's review the makeup of Laravel's command-line installer tool. In fact, we'll reproduce it from scratch!",
  	link: "https://laracasts.com/series/how-to-build-command-line-apps-in-php/episodes/4"
  },
  {
  	heading: "Laravel and the Front-end",
  	text: "Let's take a break from the back-end, and instead focus on that other world: the front-end! Don't worry, Laravel 5 has made this process as enjoyable as it can be. We'll review everything from Bower to Laravel Elixir.",
  	link: "https://laracasts.com/series/laravel-5-and-the-front-end"
  },
  {
  	heading: "Elixir TDD",
  	text: "We can also use Elixir to assist with test-driven development. Let me show you what I mean!",
  	link: "https://laracasts.com/series/laravel-5-and-the-front-end/episodes/5"
  },
  {
  	heading: "Elixir Asset Concatenation",
  	text: "To save on countless HTTP requests, you'll often want to merge, or concatenate, any number of stylesheets or scripts. Let me show you how to do this, using Laravel Elixir.",
  	link: "https://laracasts.com/series/laravel-5-and-the-front-end/episodes/4"
  }
];

React.render(
	React.createElement(Notifier, {url: "https://laracasts.com/feed", data: data, pollInterval: 10000}),
	document.getElementById('notifier')
);