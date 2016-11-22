import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import moment from 'moment'
import injectTapEventPlugin from 'react-tap-event-plugin'
import HarvestDetail from './components/Harvest/HarvestDetail'
import WrappedDatasets from './components/Dataset/WrappedDatasets'
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

moment.locale('fr')

import App from './components/App/App'
import Home from './components/Home/Home'
import Catalogs from './components/Catalogs/Catalogs'
import CatalogDetail from './components/CatalogDetail/CatalogDetail'
import DatasetDetail from './components/Dataset/DatasetDetail'
import NotFound from './components/NotFound/NotFound'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/catalogs" component={Catalogs} />
      <Route path="/catalogs/:catalogId" component={CatalogDetail} />
      <Route path="/catalogs/:catalogId/harvest/:harvestId" component={HarvestDetail} />
      <Route path="/datasets" component={WrappedDatasets} />
      <Route path="/datasets/:datasetId" component={DatasetDetail} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
