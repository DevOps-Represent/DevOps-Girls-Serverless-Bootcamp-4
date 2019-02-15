import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.less';
import { CheckMarkIcon } from 'seek-style-guide/react';
import classnames from 'classnames';

function combineClassNames(props = {}, ...classNames) {
  const { className, ...restProps } = props;

  return {
    className: classnames.apply(null, [...classNames, className]), // eslint-disable-line no-useless-call
    ...restProps
  };
}

export default class Checkbox extends Component {
  static displayName = 'Checkbox';

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    inputProps: PropTypes.object,
    valid: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.node]),
    messageProps: PropTypes.object
  };

  static defaultProps = {
    className: '',
    checked: false,
    inputProps: {}
  };

  renderStandard(label) {
    return (
      <div className={styles.standard}>
        <div className={styles.checkbox}>
          <CheckMarkIcon
            className={styles.checkMark}
            svgClassName={classnames(
              styles.checkMarkSvg,
              styles.checkMarkSvg_isHover
            )}
          />
          <CheckMarkIcon
            svgClassName={classnames(
              styles.checkMarkSvg,
              styles.checkMarkSvg_isSelected
            )}
            className={styles.checkMark}
          />
        </div>
        <span>{label}</span>
      </div>
    );
  }

  renderLabel() {
    const { id, label } = this.props;

    return (
      <label htmlFor={id} className={styles.label}>
        {this.renderStandard(label)}
      </label>
    );
  }

  renderInput() {
    const {
      id,
      value,
      checked,
      onChange,
      onFocus,
      onBlur,
      inputProps
    } = this.props;

    const allInputProps = {
      id,
      value,
      checked,
      onChange,
      onFocus,
      onBlur,
      ...combineClassNames(inputProps, styles.input),
      type: 'checkbox'
    };

    return <input {...allInputProps} />;
  }

  render() {
    const { className } = this.props;

    const rootClassNames = classnames({
      [styles.root]: true,
      [className]: className
    });

    return (
      <div className={rootClassNames}>
        {this.renderInput()}
        {this.renderLabel()}
      </div>
    );
  }
}
