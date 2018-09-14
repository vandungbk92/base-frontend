import React from 'react';

class ScrollToTopButton extends React.Component {
  constructor() {
    super();

    this.state = {
      btnDisplayed: false,
      intervalId: 0
    };

    this.setButtonVisibility = this.setButtonVisibility.bind(this);
  }

  componentDidMount() {
    this.setButtonVisibility();
    window.onscroll = this.setButtonVisibility;
  }

  setButtonVisibility() {
    var scrollPos = (window.pageYOffset !== undefined) ? window.pageYOffset :
      (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var winHeight = window.innerHeight;
    if (!this.state.btnDisplayed && scrollPos > winHeight) {
      //display scroll button
      this.refs.btnScrollToTop.classList.add('visible');
      this.setState({ btnDisplayed: true });
    } else if (this.state.btnDisplayed && scrollPos < winHeight) {
      this.refs.btnScrollToTop.classList.remove('visible');
      this.setState({ btnDisplayed: false });
    }
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop(e) {
    e.preventDefault();
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render () {
    const scrollTopImg = require('../../../assets/img/scroll-top.png');
    return <a ref="btnScrollToTop" href="#top" className="scroll-to-top" onClick={this.scrollToTop.bind(this)}>
      <img src={scrollTopImg} alt="" />
    </a>;
  }
}

export default (ScrollToTopButton);