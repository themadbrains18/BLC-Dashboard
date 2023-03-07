import { Routes,Route,Navigate } from "react-router-dom";
import Dashboard from "./dashboard";
import Kyc from "./templates/kyc";
import KycMedia from "./templates/kycMedia";
import Login from "./templates/login";
import Users from "./templates/users";
import Report from "./templates/report";
import Support from "./templates/support";
import Deposit from "./templates/deposit";
import Withdraw from "./templates/withdraw";
import Token from "./templates/token";
import TokenAdd from "./templates/token-add";
import  TokenEdit  from "./templates/Token-edit";
import PageNotFound from "./templates/pagenotfound";
import Order from "./templates/order";
import Payment from "./templates/payment";
import PaymentAdd from "./templates/payment-add";
export default function Routing() {

  let session =  sessionStorage.getItem('token')
  
  return (
      <Routes>
        <Route exact path="/" element={ session === null ?<Login /> : <Navigate to="/dashboard" />}/>
        <Route exact path="/dashboard" element={ <Dashboard/> }/>
        <Route exact path="/user" element={ <Users /> }></Route>
        <Route exact path="/kyc" element={ <Kyc /> }></Route>
        <Route exact path="/kyc/media/:userid" element={ <KycMedia /> }></Route>
        <Route exact path="/report" element={ <Report /> }></Route>
        <Route exact path="/support" element={ <Support /> }></Route>
        <Route exact path="/deposit" element={ <Deposit /> }></Route>
        <Route exact path="/withdraw" element={ <Withdraw /> }></Route>
        <Route exact path="/order" element={ <Order /> }></Route>
        <Route exact path="/payment" element={ <Payment /> }></Route>
        <Route exact path="/payment/add-new" element={ <PaymentAdd /> }></Route>
        <Route exact path="/token" element={ <Token /> }></Route>
        <Route exact path="/token/add-new" element={ <TokenAdd /> }></Route>
        <Route exact path="/token/edit/:id" element={ <TokenEdit /> }></Route>
        <Route exact path="/*" element={ <PageNotFound /> }></Route>

      </Routes>
  );
}