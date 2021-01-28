import { DefaultSeoProps, BlogJsonLd, ArticleJsonLd } from "next-seo";
import Router from "next/router";
import { getRouteSEODataV2, getRouteSEOData } from "./asyncActions/commonAsyncActions";
//import * as $ from "jquery";
import { toast } from 'react-toastify';
import { glink, constant } from "./constant";
import { initSettingState } from "./reducers/settingReducer";
declare var window: any;

export const convertISOStringToMonthDay = date => {
  const tempDate = new Date(Number(date)).toString().split(' ');
  const formattedDate = `${tempDate[1]} ${+tempDate[2]}, ${+tempDate[3]}`;
  return formattedDate;
};

export const createMarkup = (htm) => { return { __html: htm }; };

export const viewsFormat = (n, d) => {
  if (n > 1000) {
    let x = ('' + n).length; let p = Math.pow; d = p(10, d)
    x -= x % 3
    return Math.round(n * d / p(10, x)) / d + " kMGTPE"[x / 3]
  }
  else {
    return n;
  }
}

export const priceMap = (val, tf = 2) => {
  if (!isNaN(val)) {
    let IsCrore = false;
    let x = 0;
    x = Number(val);
    x = Math.ceil(x);
    if (x >= 100) {
      val = x / 100;
      IsCrore = true;
    }
    if (IsCrore) {
      return Number(val).toFixed(tf) + " Crore";
    }
    else {
      return Number(val).toFixed(tf) + " Lakhs";
    }
  }
  else {
    return "99 Lakhs";
  }
}

export const addOrRemoveInFIlter = (filter, key: string[], cval: string[], isLoop) => {
  let f = deepClone(filter);
  key.forEach((e, i) => {
    if (isLoop) {
      let arr = f[e].split(',');
      let exist: boolean = false;
      let index = 0;
      arr.forEach((e, i) => {
        if (e == cval[i]) {
          exist = true;
          index = i;
        }
      });
      if (exist) {
        arr.splice(index, 1);
      }
      else {
        arr.push(cval[i]);
      }
      f[e] = arr.join(',');
    }
    else {
      f[e] = cval[i];
    }
  });
  f.reset = true;
  return f;
}

export const ConvertObjToQueryString = (obj, url) => {
  var queryString = Object.keys(obj).map(key => {
    if (typeof obj[key] == 'number') {
      if (obj[key] && obj[key] != "All") {
        return key + '=' + (obj[key] || "0")
      }
    }
    else {
      if (obj[key] && obj[key] != "All" && key != 'country') {
        return key + '=' + (obj[key] || "")
      }
    }
  }).filter(x => { return x != null }).join('&');
  queryString = queryString.replace(/\_/g, ' ');
  return url + "?" + queryString;
}

export const createDataTree = dataset => {
  let hashTable = Object.create(null)
  dataset.forEach(aData => hashTable[aData._id] = { ...aData, childNodes: [] })

  let dataTree: any = []
  dataset.forEach(aData => {
    if (aData.parentId) {
      let a = hashTable[aData.parentId];
      if (typeof a != 'undefined') {
        a.childNodes.push(hashTable[aData._id])
      }
    }
    else {
      dataTree.push(hashTable[aData._id])
    }
  })

  return dataTree
}



export const getRecordByIdFromArray = (arr: any, key: string, id: string) => {
  let index = null;
  arr.forEach((e, i) => {
    if (e[key] == id && index == null) {
      index = i;
    }
  });
  if (index) {
    return arr[index];
  }
  else {
    return null;
  }
}

export const absoluteUrl = (req, setLocalhost) => {
  var protocol = "https:";
  var host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
  };
}

export const getRouteURLfromFilter = (filters) => {
  let url = `@${filters.country}@${filters.location}@${filters.subArea}@properties`;
  if (filters.propType != '' && filters.propType != 'All') {
    url = `${url}@${filters.propType}`;
  }
  return url;
}

export const MapFilterToSetting = (obj, setting) => {
  obj.filters.location = setting.location;
  obj.filters.subArea = setting.subArea;
  if (!obj.filters.reset) {
    obj.filters.propType = setting.propType;
    if (obj.routes && obj.routes.data) {
      obj.filters.query = obj.routes.data.query;
      let a = JSON.parse(obj.routes.data.query);

      obj.filters.location = a['cities.name'];
      obj.filters.subArea = a['subArea.name'];
      obj.filters.propType = a['propType.name'];
      obj.filters.category = a['category.name'];
      obj.filters.subCategory = a['subCategory.name'];
    }
  }
  //obj.filters.propType = setting.propType;
  return obj;
}


export const getLocationAreaText = (obj) => {
  return `${obj.location}${(obj.subArea != '' && obj.subArea != 'All') ? ` - (${obj.subArea})` : ''}`
}


export const loadScript = (url, callback) => {

  let script: any = document.createElement("script")
  script.type = "text/javascript";
  script.src = url;
  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback();
    };
  }


  document.getElementsByTagName("head")[0].appendChild(script);
}

export const loadOwl = () => {
  setTimeout(function () {
    loadScript('/assets/js/owl.carousel.min.js', function () {
      loadScript('/assets/js/owl.js', function () {
      });
    });
  }, 100); //2000
}
export const loadFlex = () => {
  //loadScript('/assets/js/jquery-1.11.1.min.js', function () {
  loadScript('/assets/js/jquery.flexslider.js', function () {
    loadScript('/assets/js/flex.js', function () {
    });
  });
  //});
}
export const loadJquery = () => {
  // loadScript('/assets/js/jquery-1.11.1.min.js', function () {

  // });
}
export const loadLeadForms = () => {
  //loadScript('/assets/js/jquery-1.11.1.min.js', function () {
  loadScript('/assets/js/leadform.js', function () {
  });
  // });
}
export const loadLeadFormsHide = () => {
  //loadScript('/assets/js/jquery-1.11.1.min.js', function () {
  loadScript('/assets/js/leadform-hide.js', function () {
  });
  // });
}



export const isClientOrServer = () => {
  return (typeof window !== 'undefined' && window.document) ? 'Client' : 'Server';
};

export const mapSEO = (props) => {
  let asPath = props.router.asPath;
  let pathname = props.router.pathname;
  var seoKey = "";
  if (pathname == glink.href.property || pathname == glink.href.project || pathname == glink.href.blog) {
    seoKey = props.pageProps.seo //seoKey;
  }
  else {
    seoKey = props.seo;
  }

  //console.log(props);

  let domain = props.domain; //domain;
  let forsale = (props.website && props.website.code == 'w12') ? 'rent' : 'sale';
  var text = (props.website) ? props.website.text : setWebsiteTextByHost(props.domain);

  let data: any = null;
  let url = `https://${domain}${asPath}`
  //${(props.pageProps.url) ? props.pageProps.url : ''}`;

  let APP_DEFAULT_SEO: DefaultSeoProps;
  if (props.initialReduxState[seoKey] && props.initialReduxState[seoKey].data) {
    data = props.initialReduxState[seoKey].data;

    APP_DEFAULT_SEO = {
      title: data.title || data.projectName || `${text} for ${forsale} in Delhi-NCR`,
      //titleTemplate: '%s | Property.Sale',
      description: data.metaDesc,
      //canonical: 'https://www.canonical.ie/a',
      // defaultOpenGraphImageHeight: 1200,
      // defaultOpenGraphImageWidth: 1200,
      // mobileAlternate: {
      //   media: 'only screen and (max-width: 640px)',
      //   href: 'https://m.canonical.ie',
      // },
      // languageAlternates: [
      //   {
      //     hrefLang: 'de-AT',
      //     href: 'https://www.canonical.ie/de',
      //   },
      // ],
      //domain
      openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: url,
        title: data.title || data.projectName || `${text} for ${forsale} in Delhi-NCR`,
        description: data.metaDesc,
        // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
        images: [
          {
            url: data.profilePic || data.image || '/assets/images/ps.jpg',
            width: 300,
            height: 300,
            alt: data.title || data.projectName || `${text} for ${forsale} in Delhi-NCR`,
          },
        ],
        site_name: props.domain,
      },
      twitter: {
        handle: '@handlea',
        site: '@sitea',
        cardType: 'summary_large_image',
      },
      // facebook: {
      //   appId: '1234567890',
      // },
    };
  }
  else {
    //try to get seo url
    // let asPath = props.router.asPath;
    // let data = await getRouteSEODataV2(asPath.split('/').join('@'));
    // console.log(data);


    let setting = getSettingsFromURL(props.router.asPath, props.initialReduxState.setting); // props.initialReduxState.setting;
    // console.log(props);
    // console.log((props.website) ? props.website.propType : '');
    let title = `${(setting.propType == 'All') ? '' : setting.propType} ${text} for ${forsale} in ${setting.location}`;
    let desc = `Online search portal for ${(setting.propType == 'All') ? '' : setting.propType} ${text} for ${forsale} in ${setting.location}`;
    APP_DEFAULT_SEO = {
      title: title,
      //titleTemplate: '%s | Property.Sale',
      description: desc,
      //canonical: 'https://www.canonical.ie/a',
      // defaultOpenGraphImageHeight: 1200,
      // defaultOpenGraphImageWidth: 1200,
      // mobileAlternate: {
      //   media: 'only screen and (max-width: 640px)',
      //   href: 'https://m.canonical.ie',
      // },
      // languageAlternates: [
      //   {
      //     hrefLang: 'de-AT',
      //     href: 'https://www.canonical.ie/de',
      //   },
      // ],
      openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: url,
        title: title,
        description: desc,
        // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
        images: [
          {
            url: '/assets/images/ps.jpg',
            width: 300,
            height: 300,
            alt: title,
          },
        ],
        site_name: props.domain,
      },
      twitter: {
        handle: '@handlea',
        site: '@sitea',
        cardType: 'summary_large_image',
      },
      // facebook: {
      //   appId: '1234567890',
      // },
    };
  }
  //console.log(APP_DEFAULT_SEO);
  return APP_DEFAULT_SEO;
}

export const getSettingsFromURL = (asPath, StoreSetting) => {
  asPath = (asPath) ? asPath : "";
  let arr = asPath.split("/");
  let setting = deepClone(StoreSetting);
  if (arr) {
    if (arr.length >= 2) {
      setting.country = arr[1];
    }
    if (arr.length >= 3) {
      setting.location = arr[2];
    }
    if (arr.length >= 4) {
      setting.subArea = arr[3];
    }
    // if (arr.length >= 5) {
    //   setting.country = arr[4];
    // }
    if (arr.length >= 6) {
      setting.propType = arr[5];
    }
  }
  return setting;
}


export const getBlogJsonLd = (props) => {
  let text = (props.website) ? props.website.text : 'Property';
  let domain = props.domain;
  let data: any = null;
  let url = `https://${(props.pageProps.domain) ? props.pageProps.domain : ''}${domain}${props.router.asPath}`
  if (props.initialReduxState[props.pageProps.seo] && props.initialReduxState[props.pageProps.seo].data) {
    data = props.initialReduxState[props.pageProps.seo].data;
    return (
      <>
        <BlogJsonLd
          url={url}
          title={data.title || data.projectName || `${props.pageProps.domain} ${text} for sale in Delhi-NCR`}
          images={[
            data.profilePic || '/assets/images/ps.jpg'
          ]}
          datePublished={data.listingDtae}
          dateModified={data.listingDtae}
          authorName={(data.publisher) ? data.publisher.name : 'Prashant Surya'}
          description={data.metaDesc}
        />
      </>
    );
  }
}
export const getArticleJsonLd = (props) => {
  let data: any = null;
  let domain = props.domain || props.pageProps.domain;
  var text = (props.website) ? props.website.text : 'Property';
  let url = `https://${(props.pageProps.domain) ? props.pageProps.domain : ''}${domain}${props.router.asPath}`
  if (props.initialReduxState[props.pageProps.seo] && props.initialReduxState[props.pageProps.seo].data) {
    data = props.initialReduxState[props.pageProps.seo].data;
    return (
      <>
        <ArticleJsonLd
          url={url}
          title={data.title || data.projectName || `${props.pageProps.domain} ${text} for sale in Delhi-NCR`}
          images={[
            data.profilePic || '/assets/images/ps.jpg'
          ]}
          datePublished={data.listingDtae}
          dateModified={data.listingDtae}
          authorName={(data.publisher) ? data.publisher.name : 'Prashant Surya'}
          publisherName={domain}
          publisherLogo="/assets/images/ps.jpg"
          description={data.metaDesc}
        />
      </>
    );
  }
}


export const shorten = (text, maxLength, delimiter, overflow) => {
  delimiter = delimiter || "&hellip;";
  overflow = overflow || false;
  var ret = text;
  if (ret && ret.length > maxLength) {
    var breakpoint = overflow ? maxLength + ret.substr(maxLength).indexOf(" ") : ret.substr(0, maxLength).lastIndexOf(" ");
    ret = ret.substr(0, breakpoint) + delimiter;
  }
  return ret;
}

export const btnClick = (id) => {
  const btn = window.document.getElementById(id)!;
  btn.click();
}
export const openModal = (id) => {
  window.$("#" + id).modal();
}
export const openLogin = () => {
  btnClick('msgboxClose');
  btnClick('loginbtn');
  Router.push(glink.href.home);
}

export const loadGoogleMap = (next) => {
  //&callback=initAutocomplete
  loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAkI8Sh7XXwpjbaUi-1S1mOIRehs7KLu0w&libraries=places', function () {
    next();
  });
}

export const getRoute = (router, country, location, subArea, propType) => {
  location = (location) ? encodeURIComponent(location.trim()) : location;
  const { asPath, pathname } = Router;
  if (pathname == glink.href.properties || pathname == glink.href.projects) {
    let pn = router.pathname;
    pn = pn.replace('[country]', country);
    pn = pn.replace('[location]', location);
    pn = pn.replace('[area]', subArea);
    let val = router.query['all'];
    if (val) {
      pn = pn.replace('[...all]', val.join('/'));
    }
    return pn;
  }
  else if (pathname == glink.href.property) {
    let pn = glink.href.properties;
    pn = pn.replace('[country]', country);
    pn = pn.replace('[location]', location);
    pn = pn.replace('[area]', subArea);
    pn = pn.replace('[...all]', propType);
    return pn;
  }
  else if (pathname == glink.href.project) {
    let pn = glink.href.projects;
    pn = pn.replace('[country]', country);
    pn = pn.replace('[location]', location);
    pn = pn.replace('[area]', subArea);
    pn = pn.replace('[...all]', propType);
    return pn;
  }
  else if (pathname == glink.href.home || pathname == glink.href.homeLocation) {
    let url = `/${country}/${location}`;
    if (url == asPath) {
      return null;
    }
    else {
      return url;
    }
  }
  else {
    return asPath;
  }

}


export const closePageAfterLogin = (asPath) => {
  if (asPath == glink.href.reg || asPath == glink.href.fp) {
    Router.push(glink.href.home);
  }
}

export const closePageAfterLogout = () => {
  const { asPath } = Router;
  if (asPath == glink.href.myProfile) {
    Router.push(glink.href.home);
  }
  window.scrollTo(0, 0);
  toast.success(constant.msg.logoutSuccess);
}

export function getSubdomain(req) {
  let host
  let sub
  if (req && req.headers.host) {
    host = req.headers.host
  }
  if (typeof window !== "undefined") {
    host = window.location.host
  }
  if (host) {
    sub = host.split('localhost:3000')[0]
    if (sub) {
      return sub.split(".")[0]
    }
  }
}

export const setWebsites = (f, d) => {
  if (d == 'distress') {
    f.websites = "w9";
  }
  return f;
}
export const verifyWebsiteCode = (obj) => {
  if (obj) {
    return obj.code;
  }
  else {
    return '';
  }
}
export const setWebsiteCode = (d) => {
  var code = "w1";
  switch (d) {
    case 'practicebook.in': {
      code = "w1";
      break;
    }
    case 'factory.forsale': {
      code = "w4";
      break;
    }
    case 'distress.property.sale': {
      code = "w8";
      break;
    }
    case 'kothi.forsale': {
      code = "w9";
      break;
    }
    case 'plots.forsale': {
      code = "w10";
      break;
    }
    case 'property.golf': {
      code = "w11";
      break;
    }
    case 'property.rent': {
      code = "w12";
      break;
    }
    case 'petrolpump.forsale': {
      code = "w13";
      break;
    }
    case 'gaur.city': {
      code = "w14";
      break;
    }
    case 'gaur.yamuna.city': {
      code = "w15";
      break;
    }
    case 'yamunaexpressway.plots.forsale': {
      code = "w16";
      break;
    }
    case 'foodcourt.forsale': {
      code = "w17";
      break;
    }
    default: {
      code = "w1";
      break;
    }
  }
  return code;
}

export const setWebsiteTextByHost = (host) => {
  var webText = "Property";
  if (host) {
    if (host == "property.sale") { webText = "Property"; }
    else if (host == "property.golf") { webText = "Property"; }
    else if (host == "property.rent") { webText = "Property"; }
    else if (host == "distress.property.sale") { webText = "Distress Property"; }
    else if (host == "kothi.forsale") { webText = "Kothi"; }
    else if (host == "plots.forsale") { webText = "Plots"; }
    else if (host == "petrolpump.forsale") { webText = "PetrolPump"; }
    else if (host == "factory.forsale") { webText = "Factory"; }
  }
  return webText
}

// export const setWebsiteTextByCode = (data) => {
//   var webText = "Property";
//   if (data) {
//     if (data.code == "w1") { webText = "Property"; }
//     else if (data.code == "w4") { webText = "Factory"; }
//     else if (data.code == "w8") { webText = "Distress Property"; }
//     else if (data.code == "w9") { webText = "Kothi"; }
//     else if (data.code == "w10") { webText = "Plots"; }
//   }
//   return webText
// }


export const Mapfd = (obj, cat) => {
  let res: any = { keys: [], data: {} };
  let c = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key].for != "rent") {
        //let order = obj[key].order;
        let newObj = obj[key];
        res.keys.push(key);
        res.data[c] = newObj;
        c = c + 1;
      }
    }
  }
  if (cat && res.data["0"] && res.data["0"].child && res.data["0"].child.length == 1) {
    cat.forEach((x, i) => {
      let a = { id: i + 1, name: x.name }
      res.data["0"].child.push(a);
    })
  }
  return res;
}



export const getWATemplateOfProperty = (obj, props) => {
  if (props.website) {
    let host = props.domain;
    let url = `https://${host}/${props.filters.country}/${props.filters.location.replace(/ /g, '%20')}/${props.filters.subArea}/property/${obj.slug}`;
    let msg = `
${shorten(obj.metaDesc, 135, ` ... Read More ( ${url} )`, false)}
        
${(obj.propType) ? obj.propType.name : ""} ${props.website.text} for sale
City : ${(obj.cities) ? obj.cities.name : ""} ${(obj.subArea) ? obj.subArea.name : ''} 
Type :  ${(obj.category) ? obj.category.name : ""}  ${(obj.subCategory) ? obj.subCategory.name : ""}
Super area : ${obj.size} Sq. ft.
Carpet area : ${obj.carpetArea} sq. ft.
Floor : ${obj.floor}/ ${obj.totalFloor} 
Road Size: ${obj.roadSize}
Market Price: ₹ ${priceMap(obj.cost)}
Distress Price: ₹ ${priceMap(obj.costDistress || obj.cost)}

For ${props.website.text} Sale & purchase visit website "${host}",

Prashant Surya,
(+91) 8745891014
${(obj.publisher) ? obj.publisher.email : ""}       
`;
    return encodeURIComponent(msg.trim());
  }
}


export const getInitialPropsU = (context, domain) => async any => {
  //This code gets the SEO data for the URL for all pages on reload
  let url = context.ctx.asPath.split('/').join('@');
  if (context.ctx.req && context.ctx.req.headers) {
    await context.ctx.reduxStore.dispatch(getRouteSEOData(url, setWebsiteCode(domain)));
  }
  return {
    seo: 'routes'
  }
}




export const MapWebsiteCode = (filter, website) => {
  if (website) {
    filter.websites = (website.code == 'w1') ? "w1,'',null" : website.code;
  }
  return filter;
}








//-----------------------copied code---------------------------------------

export const IsInValid = (value) => {

  if (value == null || typeof value == 'undefined') {
    return true;
  }
  if (typeof value === "string" && value.length > 0) {
    if (value.trim() != "") {
      return false;
    }
    else {
      return true;
    }
  }
  else if (typeof value === "number" && value > 0) {
    return false;
  }
  else {
    return true;
  }
}



export const replaceAll = (mainstr, str1, str2, ignore) => {
  return mainstr.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

// When the user clicks on the button, scroll to the top of the document
export const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//updtaes querystring without reloading
// export const updateQueryString = (obj) => {
//   let newObj = this.deepClone(obj);
//   // Object.keys(newObj).forEach((key) => {
//   //   if (newObj[key] == null || newObj[key] == "") {
//   //     delete newObj[key];
//   //   }
//   // });
//   //Replace query String without reload
//   this.location.replaceState(
//     this.router.createUrlTree(
//       [this.locationStrategy.path().split('?')[0]], // Get uri
//       { queryParams: newObj } // Pass all parameters inside queryParamsObj
//     ).toString()
//   );
// }

export const mobileAndTabletcheck = () => {
  var check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(window.navigator.userAgent || window.navigator.vendor); //|| window.opera
  return check;
};

// export const getRoutes = () => {
//   //return this.service.getDefault(serviceUrl.getRoutes);
// }

//export const getRouteById = (id) => {
  //return this.service.getDefault(serviceUrl.getRouteById + "/" + id);
//}
// export const jsUcfirst = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
// export const getSEOURL = () => {
  //Sub domain check
  // var full = document.location.hostname;
  // var parts = full.split('.')
  // var sub = parts[0];
  // sub = this.jsUcfirst(sub);
  // if (this.propTypeNames.indexOf(sub) == -1) {
  //   sub = "";
  // }

  // let url = this.router.url;
  // let base = this;
  // let arr = url.split('/');

  // return arr.join('@');
// }
//export const setSEO = (setDefaultImgOnly?: boolean) => {

  // //Sub domain check
  // var full = document.location.hostname;
  // var parts = full.split('.')
  // var sub = parts[0];
  // sub = this.jsUcfirst(sub);
  // if (this.propTypeNames.indexOf(sub) == -1) {
  //   sub = "";
  // }

  // let url = this.router.url;
  // let base = this;
  // let arr = url.split('/');

  // if (setDefaultImgOnly) { //to set parent images
  //   arr.pop();
  // }
  // let data = arr.join('@');

  // this.service.get(serviceUrl.getRouteById + "/" + data).subscribe(resp => {
  //   let rt: any = resp;

  //   if (rt) {
  //     try {

  //       let defaultKeyWord = tagLine.tag;
  //       tagLine.tag = sub + ' ' + rt.title || defaultKeyWord;

  //       if (setDefaultImgOnly) {
  //         base.meta.updateTag({ property: 'og:image', content: rt.image || '' });
  //         base.meta.updateTag({ property: 'twitter:image', content: rt.image });
  //       } else {
  //         base.title.setTitle(tagLine.tag);
  //         base.meta.updateTag({ name: 'description', content: sub + ' ' + rt.metaDesc || defaultKeyWord });
  //         base.meta.updateTag({ name: 'keywords', content: sub + ' ' + rt.metaKey || defaultKeyWord });

  //         base.meta.updateTag({ property: 'og:title', content: tagLine.tag });
  //         base.meta.updateTag({ property: 'og:url', content: serviceUrl.baseDomain + base.router.url });
  //         base.meta.updateTag({ property: 'og:image', content: rt.image || '' });
  //         base.meta.updateTag({ property: 'og:description', content: sub + ' ' + rt.metaDesc || defaultKeyWord });

  //         base.meta.updateTag({ property: 'twitter:title', content: tagLine.tag });
  //         base.meta.updateTag({ property: 'twitter:card', content: sub + ' ' + rt.metaDesc || defaultKeyWord });
  //         base.meta.updateTag({ property: 'twitter:image', content: rt.image });
  //         base.meta.updateTag({ property: 'twitter:description', content: sub + ' ' + rt.metaDesc || defaultKeyWord });

  //         //$('#list-shop-title').html(rt.title);
  //         document.getElementById('list-shop-title').innerHTML = rt.title;
  //       }
  //     }
  //     catch (err) {
  //       //console.log(err);
  //     }
  //   }
  // });

//}


