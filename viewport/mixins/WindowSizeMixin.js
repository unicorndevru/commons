export default {
  getInitialState: function() {
    return {
      windowWidth: (typeof window !== 'undefined' ? window.innerWidth : 1024),
      windowHeight: (typeof window !== 'undefined' ? window.innerHeight : 768),
    };
  },

  handleResize: function(e) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  },

  componentDidMount: function() {
    window && window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window && window.removeEventListener('resize', this.handleResize);
  }
}