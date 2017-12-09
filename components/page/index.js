import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import NProgress from 'nprogress'
import FontFaceObserver from 'fontfaceobserver'

import Meta from './meta'
import Header from './header'
import Footer from './footer'
import Piwik from './piwik'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class Page extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  componentDidMount() {
    console.log('page/index componentDidMount')

    // if (sessionStorage.fontsLoaded) {
    //   document.documentElement.classList.add('font-loaded')
    //   return
    // }

    const lato = new FontFaceObserver('Lato')
    lato.load().then(() => {
      console.log('page/index font loaded')
      document.documentElement.classList.add('font-loaded')
      sessionStorage.fontLoaded = true
    })
  }

  render() {
    const { children } = this.props

    return (
      <div>
        <Meta />
        <Header />
        {children}
        <Footer />
        <Piwik />

        <style jsx>{`
          div {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            position: relative;
          }
        `}</style>

        <style jsx global>{`
          @import 'reset';
          @import 'fonts';
          @import 'colors';

          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: $blue;
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px $blue, 0 0 5px $blue;
            opacity: 1.0;
            transform: rotate(3deg) translate(0px, -4px);
          }
        `}</style>
      </div>
    )
  }
}

export default Page
