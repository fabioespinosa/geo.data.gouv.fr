import React from 'react'
import PropTypes from 'prop-types'

import colors from '../styles/colors'

const Counter = ({ value, label, unit, size = '', color = '', title = '' }) => (
  <div>
    {title && <h3>{title}</h3>}
    <div className={`value ${color}`}>
      {value || 0} {unit && <small>{unit}</small>}
    </div>
    {label && <div className={`label ${size}`}>{label}</div>}

    <style jsx>{`
      .value {
        font-size: 2.2rem;
        height: 1.8rem;
        text-align: left;
      }

      small {
        font-size: 1rem;
      }

      .success {
        color: ${colors.green};
      }

      .warning {
        color: ${colors.yellow};
      }

      .error {
        color: ${colors.red};
      }

      .label {
        text-align: center;
      }

      .small {
        font-size: 0.8rem;
        line-height: 0.8rem;
      }

      .medium {
        font-size: 2rem;
        line-height: 2rem;
        font-weight: 300;
      }

      .large {
        font-size: 4rem;
        line-height: 4rem;
      }
    `}</style>
  </div>
)

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  unit: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string
}

export default Counter
