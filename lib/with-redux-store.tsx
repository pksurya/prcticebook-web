import React from 'react'

import { initializeStore, exampleInitialState } from '../domain/store'
import { getRouteSEOData } from '../asyncActions/commonAsyncActions'
import { setWebsiteCode, getInitialPropsU } from '../utility'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export type Store = ReturnType<typeof getOrCreateStore>

type Props = { reduxStore: Store }

const withReduxStore = (Component: React.ComponentClass<Props>) => {
  return class Redux extends React.Component<Props> {
    private reduxStore

    static async getInitialProps(appContext) {
      // console.log(appContext);
      const reduxStore = getOrCreateStore(exampleInitialState)

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if ((Component as any).getInitialProps) {
        appProps = await (Component as any).getInitialProps(appContext)
      }
      //console.log(appContext.ctx.req.headers.host.split('.')[0]);

      //let domain = (!!appContext.ctx.req) ? appContext.ctx.req.headers.host : window.location.host;
      let domain = "property.sale";
      //let domain = "foodcourt.forsale";
      //let domain = "plots.forsale";
      //let domain = "yamunaexpressway.plots.forsale";

      //This code gets the SEO data for the URL for all pages on reload
      //getInitialPropsU(appContext, domain);
      let url = appContext.ctx.asPath.split('/').join('@');
      if (appContext.ctx.req && appContext.ctx.req.headers) {
        await appContext.ctx.reduxStore.dispatch(getRouteSEOData(url, setWebsiteCode(domain)));
      }
      // let url = appContext.ctx.asPath.split('/').join('@');
      // if (appContext.ctx.req && appContext.ctx.req.headers) {
      //   await appContext.ctx.reduxStore.dispatch(getRouteSEOData(url, setWebsiteCode(domain)));
      // }

      return {
        ...appProps,
        //domain: (!!appContext.ctx.req) ? appContext.ctx.req.headers.host.split('.')[0] : window.location.host.split('.')[0],
        //domain:(!!appContext.ctx.req) ? appContext.ctx.req.headers.host : window.location.host,
        domain: domain,
        server: !!appContext.ctx.req,
        initialReduxState: reduxStore.getState(),
        seo: 'routes'
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return (
        <Component {...this.props} reduxStore={this.reduxStore} />
      )
    }
  }
}

export default withReduxStore

export const mapDispatchToProps = dispatch => ({ dispatch })

export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps>
