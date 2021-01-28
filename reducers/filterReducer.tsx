import {
  UPDATE_FILTER, RESET_FILTER
} from "../actions/actionTypes";
// define initial state of Filter
export const initialFilterState = {
  location: 'Noida',
  cost: '',
  keyword: "",
  number: null,
  data: null,
  loading: false,
  error: null,
  orderby: "listingDtae-desc",
  propType: "All",
  category: "All",
  subCategory: "All",
  constructionStatus: "All",
  status: "All",  //shopType
  furnished: "All",
  roi: "",
  budget: 'All',
  size: 'All',
  // budget: "1,500000",
  // size: "1,100000",
  floor: "",
  builder: "All",
  listedBy: "All",
  listedTime: null,
  securityDeposit: null,
  rent: "All",
  verified: true,
  condition: "All",
  type: "",
  page: 1,
  limit: 9,
  propIsNew: "",
  subArea: "All",
  reset: false,
  capReset: false,
  country: 'in',
  facing: '',
  rentPriority: '',
  roadSize: '',
  query: '',
  rentEscalation: '',
  rentEscalationPeriod: "",
  plotSize: null,
  constructionAge: "",
  websites: '',
  searchType: '0'  //0-projects , 1-Properties
}
// update store based on type and payload and return the state
export default function common(state = initialFilterState, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      const { data } = action.payload;
      return { ...data };
    case RESET_FILTER:
      const { idata } = action.payload;
      return { ...idata };
    default:
      return state
  }
}