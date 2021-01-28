export const constant = {
    website:'w9',
    author: "Prashant Surya",
    contactNumber: '(+91) 8745891014',
    email:"info@dritalconnect.com",
    whatsappNumber:8745891014,
    blogsLimit: 8,
    hotPropLimit: 10,
    sideBarBlogsLimit: 10,
    appUrl:'https://practicebook.in',
    baseAPIurl: 'https://api.practicebook.in/',
    error: "Oops!! An error has been occured, please try after some time.",
    contactAckMsg: "Thanks for your query, you will get a call within 24 hrs.",
    msg: {
        regSuccess: "A mail with credentials has been sent to your email, please use the same credentials for your login.",
        fpSuccess: "A mail with new credentials has been sent to your email, please use the same credentials for your login.",
        cpSuccess: "Your password has been changed successfully.Please login now with your new password.",
        updateUserSuccess: "Your profile has been updated.",
        addPropSuccess: "You have successfully added your property, we are reviewing it. Check your status after some time.",
        needLogin: "Please login or register before proceding to list a property for free.",
        loginSuccess: "Welcome back",
        logoutSuccess: "You have been successfully logged out.",
        emailExists:"Email already exists !"    ,
        invalidLogin:"Invalid Username or Password"    
    }
}

export const glink = {
    href: {
        properties: '/[country]/[location]/[area]/properties/[...all]',
        blankProperties: '/[country]/[location]/[area]/properties',
        projects: '/[country]/[location]/[area]/projects/[...all]',
        property: '/[country]/[location]/[area]/property/[slug]',
        project: '/[country]/[location]/[area]/project/[slug]',
        blogs: '/blogs',
        blog: '/blog/[slug]',
        contact: '/contact',
        pricing: '/pricing',
        myProfile: '/my-profile',
        reg: '/registration',
        listProp: '/post-free-property',
        fp: '/forgot-password',
        home: '/',
        homeLocation:'/[country]/[location]'
    }
}

export const http = {
    header: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
}
export const registry = [
    { name: "5", value: ".05" },
    { name: "6", value: ".06" },
    { name: "7", value: ".07" },
    { name: "8", value: ".08" }
]

export const NBI = {
    0: { id: 0, name: "Mall", url: "/assets/images/nearby/supaermarket.png" },
    1: { id: 1, name: "Gym", url: "/assets/images/nearby/weightlifting.png" },
    2: { id: 2, name: "Schlool", url: "/assets/images/nearby/classroom.png" },
    3: { id: 3, name: "Metro Station", url: "/assets/images/nearby/train.png" },
    4: { id: 4, name: "Railway Station", url: "/assets/images/nearby/station.png" },
    5: { id: 5, name: "Market", url: "/assets/images/nearby/store.png" },
    6: { id: 6, name: "Hospitals", url: "/assets/images/nearby/hospital.png" },
    7: { id: 7, name: "Park", url: "/assets/images/nearby/garden.png" },
    8: { id: 9, name: "Bnaquest Hall", url: "/assets/images/nearby/banquet-hall.png" },
    9: { id: 10, name: "Daily Shop", url: "/assets/images/nearby/store.png" },
    10: { id: 10, name: "Daily Shop", url: "/assets/images/nearby/store.png" }
}

export var tagLine = {
    tag: "Kothi for sale"
};

export const messages = {
    loginerror: "Invalid Username or Password",
}
export const ModulesList = [
    { code: "0", name: "Project", C: false, R: false, U: false, D: false },
    { code: "4", name: "User", C: false, R: false, U: false, D: false },
    { code: "5", name: "Role", C: false, R: false, U: false, D: false },
]

export const StatusList =
{
    1: "Ready To Move",
    2: "Under Construction",
    3: "Nearing Completion"
}
export const ContactReceiverName = "Prashant Surya";
//export const ContactMailReceiver = "prashant.kr.surya@gmail.com";
export const ContactMailReceiver = "practicebook.in@gmail.com"//"kapilsharmast@gmail.com";
export const ContactCallReceiver = "8745891014";
export const Disclaimaer_p1 = `All the details displayed on the website are for informational purposes to the viewers/visitors of this
                                website.
                                All.Information displayed regarding all properties/real estate projects weather fresh sale or resale,
                                including
                                property/project details, listings, floor area ratio, super area, carpet area, layout plans of units,
                                project
                                layout, location information etc has been updated from multiple sources as per the best of knowledge and
                                effort.Nothing contained herein shall be deemed to constitute legal advice,solicitations, promotion,
                                marketing,
                                offer for sale, invitation to offer, invitation to acquire/invest/make financial commitments/make legal
                                agreements by any entity.You are hereby advised to visit the relevant RERA website/ take all RERA
                                registered
                                relevant details from the appropriate authorities/entity before taking any decision based on the
                                contents
                                displayed on the website.`;

export const Disclaimaer_p2 = `I the viewer/visitor to this website here by solemnly declare in my full senses and consciousness that I
                                will
                                not take any legal action against any person/entity associated with this website for any reason
                                regarding
                                the
                                data/content /information displayed on this website.`;

//const baseURL = "https://dritalestate.herokuapp.com/";
const baseURL = "https://api.property.sale/";
//const baseURL = "http://localhost:8000/";

const baseApiUrl = baseURL + "api/";


export const serviceUrl = {

    //roles
    getRoles: baseApiUrl + "roles/list",
    getRoleById: baseApiUrl + "roles/list",
    addRoles: baseApiUrl + "roles/add",
    updateRoles: baseApiUrl + "roles/update",
    deleteRoles: baseApiUrl + "roles/delete",


    login: baseURL + "login",
    cp: baseURL + "cp",
    logout: baseApiUrl + "logout",

    filters: baseURL + "filters",

    baseImagePath: baseURL + "uploads/",

    //Cities
    getCities: baseApiUrl + "cities/list",

    //Category
    getCategories: baseApiUrl + "category/list",

    //Routes
    getRoutes: baseApiUrl + "route/list",
    getRouteById: baseApiUrl + "route/list",

    //Properties
    getRecommended: baseApiUrl + "properties/recommended",
    getFeatured: baseApiUrl + "properties/featured",
    getHot: baseApiUrl + "properties/hot",
    getProperties: baseApiUrl + "properties/list",
    getpropertiesById: baseApiUrl + "properties/list",

    getProject: baseApiUrl + "project/list",
    getProjectById: baseApiUrl + "project/list",

    getProjectgroup: baseApiUrl + "projectgroup/list",

    getBlogs: baseApiUrl + "blogs/list",
    getBlogsById: baseApiUrl + "blogs/list",

    //users
    getUsers: baseApiUrl + "users/list",
    getUserById: baseApiUrl + "users/list",
    addUser: baseApiUrl + "users/add",
    updateUser: baseApiUrl + "users/update",
    deleteUser: baseApiUrl + "users/delete",

    getAmenities: baseApiUrl + "amenities/list",

    sendMsg: baseApiUrl + "users/msg",

    uploadPic: baseURL + "upload",


    baseDomain: "https://property.sale"
}