import 'isomorphic-fetch'
import * as React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withReduxStore, { Store } from '../lib/with-redux-store';
import { DefaultSeo,BlogJsonLd  } from 'next-seo';
import Layout from '../components/layout';
import { mapSEO, deepClone, getBlogJsonLd, getArticleJsonLd } from '../utility';

import '../styles/bootstrap.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/owl.carousel.min.css';
import '../styles/owl.theme.default.min.css';
import '../styles/demo.css';
import '../styles/flexslider.css';
import '../styles/component.css';
import '../styles/app.css';
import 'react-input-range/lib/css/index.css';
import 'react-toastify/dist/ReactToastify.css';

interface Props { reduxStore: Store }

export default withReduxStore(
    class extends App<Props> {
        async getInitialProps({ Component, ctx, reduxStore, router }) {

            const server = !!ctx.req
            const store = reduxStore;
            const state = store.getState()
            const out = { state, server } as any

            if (Component.getInitialProps) {
                return {
                    ...out,
                    pageProps: {
                        ...router,
                        ...await Component.getInitialProps(ctx)
                    }
                }
            }
            return out
        }

        render() {
            const { props } = this as any
            const { Component, pageProps, reduxStore, domain } = props;
            let newProp = deepClone(pageProps);
            newProp=Object.assign({domain:domain},newProp);
            return (
                <div>
                    <DefaultSeo {...mapSEO(props)} />
                    {getBlogJsonLd(props)}
                    {getArticleJsonLd(props)}
                    <Provider store={reduxStore}>
                        <React.Fragment>
                            <Layout {...props}>
                                <Component {...newProp} />
                            </Layout>
                        </React.Fragment>
                    </Provider>
                </div>
            )
        }
    }
)

























// import App,{ Container } from 'next/app'
// import React from 'react'
// import withReduxStore, { Store } from '../lib/with-redux-store'
// import { Provider } from 'react-redux'
// import '../styles/bootstrap.css';
// import '../styles/style.css';
// // import '../styles/font-awesome.min.css';

// import '../styles/owl.carousel.min.css';
// import '../styles/owl.theme.default.min.css';
// import '../styles/demo.css';
// //import '../styles/flexslider.css';
// import Layout from '../components/layout';

// interface Props {
//   reduxStore: Store
// }

// //AppComponentProps
// export default withReduxStore(
//   class MyApp extends React.Component<Props & App> {
//     static async getInitialProps({ Component, ctx }) {
//       const pageProps = Component.getInitialProps
//         ? await Component.getInitialProps(ctx)
//         : {};
//       return { pageProps };
//     }

//     render() {
//       const { Component, pageProps, reduxStore } = this.props
//       return (
//         <Container>
//           <Provider store={reduxStore}>
//             <Layout>
//               <Component {...pageProps} />
//             </Layout>
//           </Provider>
//         </Container>
//       )
//     }
//   }
// )
