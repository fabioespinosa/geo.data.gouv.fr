import React, { Component } from 'react'

import CheckLicense from '../Checks/CheckLicense'
import CheckProducers from '../Checks/CheckProducers'
import CheckDataAvailability from '../Checks/CheckDataAvailability'


class DatasetChecklist extends Component {
  render() {
    const { metadata, organizations, dataset } = this.props.dataset

    return (
      <div>
        <h3>Publication sur data.gouv.fr</h3>
        <div>
          <CheckLicense license={metadata.license} />
          <CheckProducers organizations={organizations} />
          <CheckDataAvailability distributions={dataset.distributions} />
        </div>
      </div>
    )
  }
}

export default DatasetChecklist