import { connect } from 'react-redux'
import React from 'react';
import NextHead from 'next/head'
import { DefaultSeoProps, DefaultSeo } from 'next-seo';

const mapStateToProps = (state: any) => state

const Meta: React.SFC<any> = (props) => {

    const APP_DEFAULT_SEO: DefaultSeoProps = {
        title: props.title || props.projectName || '',
        titleTemplate: '%s | Next SEO',
        description: 'Description A',
        canonical: 'https://www.canonical.ie/a',
        defaultOpenGraphImageHeight: 1200,
        defaultOpenGraphImageWidth: 1200,
        mobileAlternate: {
            media: 'only screen and (max-width: 640px)',
            href: 'https://m.canonical.ie',
        },
        languageAlternates: [
            {
                hrefLang: 'de-AT',
                href: 'https://www.canonical.ie/de',
            },
        ],
        openGraph: {
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.url.ie/a',
            title: 'Open Graph Title A',
            description: 'Open Graph Description A',
            // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
            images: [
                {
                    url: 'https://www.test.ie/og-image-a-01.jpg',
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt A',
                },
            ],
            site_name: 'SiteName A',
        },
        twitter: {
            handle: '@handlea',
            site: '@sitea',
            cardType: 'summary_large_image',
        },
        facebook: {
            appId: '1234567890',
        },
    };

    return (
        <div>
            {props && props.title &&
                //     <NextSeo
                //         title={props.title || props.projectName || 'Kothi for sale | Blogs'}
                //         description={props.metaDesc}
                //         canonical="https://www.canonical.ie/"
                //         openGraph={{
                //             url: 'https://www.url.ie/a',
                //             title: props.title || props.projectName || '',
                //             description: props.metaDesc,
                //             images: [
                //                 {
                //                     url: 'https://www.example.ie/og-image-01.jpg',
                //                     width: 800,
                //                     height: 600,
                //                     alt: 'Og Image Alt',
                //                 },
                //                 {
                //                     url: 'https://www.example.ie/og-image-02.jpg',
                //                     width: 900,
                //                     height: 800,
                //                     alt: 'Og Image Alt Second',
                //                 },
                //                 { url: 'https://www.example.ie/og-image-03.jpg' },
                //                 { url: 'https://www.example.ie/og-image-04.jpg' },
                //             ],
                //             site_name: 'SiteName',
                //         }}
                //         twitter={{
                //             handle: '@handle',
                //             site: '@site',
                //             cardType: 'summary_large_image',
                //         }}
                //     />
                // }

                <DefaultSeo {...APP_DEFAULT_SEO} />


                //  <NextHead>
                //      <meta charSet="UTF-8" />
                //     <title>{props.title || props.projectName || ''}</title>
                //     <meta name="description" property="description" content={props.metaDesc} />
                //     <meta name="keywords" property="keywords" content={props.metaKey} />
                //     <meta property="og:type" content="website" />
                //     <meta name="og:title" property="og:title" content={props.title || props.projectName} />
                //     <meta name="og:description" property="og:description" content={props.metaDesc} />
                //     <meta property="og:site_name" content="Proper Noun" />
                //     <meta property="og:url" content={`${props.canonical}`} />
                //     <meta name="twitter:card" content="summary" />
                //     <meta name="twitter:title" content={props.title || props.projectName} />
                //     <meta name="twitter:description" content={props.metaDesc} />
                //     <meta name="twitter:site" content="@propernounco" />
                //     <meta name="twitter:creator" content="@propernounco" />
                //     <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
                //     <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
                //     {
                //         props.css &&
                //         <link rel="stylesheet" href={`${props.css}`} />
                //     }
                //     {
                //         props.profilePic ? (
                //             <meta property="og:image" content={`${props.profilePic}`} />
                //         ) : (
                //                 <meta property="og:image" content="/assets/images/ps.jpg" />
                //             )
                //     }
                //     {
                //         props.profilePic &&
                //         <meta name="twitter:image" content={`${props.profilePic}`} />
                //     }
                //     {
                //         props.canonical &&
                //         <link rel="canonical" href={`${props.canonical}`} />
                //     }
                //     {
                //         props.js &&
                //         <script type="text/javascript" src={`${props.js}`}></script>
                //     }
                // </NextHead> 
            }
        </div>
    )
}

export default connect<any>(mapStateToProps)(Meta)
