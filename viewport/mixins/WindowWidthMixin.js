export default {
  getInitialState: function() {
    return {windowWidth: (typeof window !== 'undefined' ? window.innerWidth : 1024)};
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  componentDidMount: function() {
    window && window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window && window.removeEventListener('resize', this.handleResize);
  }
}