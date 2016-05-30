const getScroll = () => typeof window !== 'undefined' ? {
    scrollTop: window.pageYOffset || Math.max(document.documentElement.scrollTop, document.body.scrollTop),
    scrollLeft: window.pageXOffset || Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
} : {scrollTop: 0, scrollLeft: 0}

export default {
    getInitialState: function() {
        return getScroll();
    },

    handleScroll: function(e) {
        this.setState(getScroll());
    },

    componentDidMount: function() {
        window && window.addEventListener('scroll', this.handleScroll);
    },

    componentWillUnmount: function() {
        window && window.removeEventListener('scroll', this.handleScroll);
    }
}