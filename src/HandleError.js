import React from 'react';

export default class HandleError extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          An Error occurred and this page couldn't load :c Please try again
          later...
        </h2>
      );
    }

    return this.props.children;
  }
}
