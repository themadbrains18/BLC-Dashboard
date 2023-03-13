import axios from "axios";

const baseurl = 'http://localhost:5000/api';
const ImageUrl = 'http://localhost:3000/kyc/documents/';
const PdfUrl = 'http://localhost:5000/statement/';


// const baseurl = 'https://primeexperia.com/api';
// const ImageUrl = 'https://primeexperia.com/api/document/';
// const PdfUrl = 'https://primeexperia.com/api/statement/';

const API = axios.create(
    {
        baseURL: baseurl,
        headers: { 'Content-type': 'application/json' }
    })

const auth = `${sessionStorage.getItem('token')}`;
API.defaults.headers.common['Authorization'] = auth;

export const apiBaseUrl = baseurl;
export const imageBaseUrl = ImageUrl;
export const pdfBaseUrl = PdfUrl;
/** user Auth */

export const loginRequestApi = (formData) => API.post('/admin/user/admin-login', formData)

/**
 * User Request
 * @returns 
 */
export const userListRequestApi = () => API.get('/admin/user')
export const userStatusUpdate =(data) => API.post('/admin/user/update', data)

export const marketCoinRequestAPI=()=>{
    let sauth = sessionStorage.getItem('token');
    API.defaults.headers.common['Authorization'] = sauth;
    return API.get('/admin/market/coin')
}
/**
 * Deposit Requests
 */
export const depositListRequestApi = () => API.get('/admin/deposit')

/**
 * Withdraw Requests
 */
export const withdrawListRequestApi = () => API.get('/admin/withdraw')

/**
 * Kyc Requests
 */
export const kycListRequestApi = () => API.get('/admin/kyc')
export const kycStatusUpdate =(userid,data) => API.put(`/admin/kyc/kycupdate/${userid}`, data)

/**
 * Token List Requests
 */
export const tokenListRequestApi=()=>API.get('/admin/token')
export const tokenList =(data) => API.post('/admin/token/create', data)
export const tokenUpdate =(tokenid,data) => API.put(`/admin/token/update/${tokenid}`, data)
export const tokenGetById =(tokenid) => API.get(`/admin/token/getToken/${tokenid}`)
export const tokenStatusUpdate =(data) => API.post('/admin/token/tokenupdate', data)


/**
 * Order Requests
 */
export const orderListRequestApi = () => API.get('/admin/order/all')

/**
 * Payment Requests
 */
export const paymentListCreateApi = (data) => API.post('/admin/payment/save',data)
export const paymentListRequestApi = () => API.get('/admin/payment/pm_methods')

