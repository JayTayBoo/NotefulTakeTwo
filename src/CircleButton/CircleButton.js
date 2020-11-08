import React from 'react';
import './CircleButton.css';
import PropTypes from 'prop-types';

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props;
  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps,
    },
    props.children
  );
}

NavCircleButton.defaultProps = {
  tag: 'a',
};

// added PropTypes here!
NavCircleButton.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes,
  tag: PropTypes.string.isRequired,
};
