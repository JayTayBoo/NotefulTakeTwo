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
  children: PropTypes.array,
};


{'attachment_id' : 'muzzle_flash','attachment_name': 'Flash Guard','compatible_weapons': {'assault': ['ara', 'arb', 'arc', 'ard', 'are', 'arf', 'arg', 'arh', 'ari', 'arj', 'ark', 'arl'], 'smg' :[] 'shotgun': [], 'lmg': [], 'marksman': [], 'sniper': [], 'handgun': []},}