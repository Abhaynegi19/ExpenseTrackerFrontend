import SignUp from './components/SignUp'
import Login from './components/Login'
import {Route,Routes, useNavigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import {Toaster} from 'react-hot-toast'
import ProtectedRoutes from '../src/components/ProtectedRoutes'
import SetUpProfile from './components/SetUpProfile'
import Landing from './components/Landing'
import Transaction from './components/Transaction'
import Profile from './components/Profile'
import { useEffect, useLayoutEffect } from 'react'
import Income from './components/Income'
import Budget from './components/Budget'
import AddBudget from './components/AddBudget'
import EditBudget from './components/EditBudget'
import Expense from './components/Expense'
import { addUserData } from "./utils/user";
import { addUserRecentTransaction, addUserTransaction } from "./utils/transaction";
import { useDispatch, useSelector } from 'react-redux'
import Category from './components/Category'

const App = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.userInfo);
  const nav = useNavigate()
  const transactions = useSelector((store) => store.userTransaction)

  useLayoutEffect(() =>{
    const res = setTimeout(async () => {
    const response = await fetch("http://localhost:8080/api/profile/check", {
      method: "GET",
      headers : {
        "Content-type" : "application/json"
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) {
      nav("/login");
    }
    }, 1000 * 60 * 60);
    return () => clearTimeout(res)
  },[])

  // Fetch Profile
  useEffect(() => {
    if (userInfo?.username) return;

    async function getUserData() {
      if(userInfo?.data?.username)  return 
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/profile/",{
          method : "GET",
          headers : {
            "Content-type" : "application/json"
          },
          credentials :"include"
        })
        const data = await res.json();
        if(data.user.isCompleted == false){
          nav("/setprofile")
        }
        if (data.success) {
          dispatch(addUserData(data.user));
        }
      } catch (err) {
        console.log(err);
      }
    }

    getUserData();
  }, [userInfo]);

  // Fetch Transaction Summary
  useEffect(() => {
    if (
      transactions.totalIncome ||
      transactions.totalExpense ||
      transactions.balance
    )
    return;

    async function getTransactionSummary() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/transactions/total`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
  
        if (data.success) {
          dispatch(
            addUserTransaction({
              totalIncome: data.totalIncome,
              totalExpense: data.totalExpense,
              balance: data.balance,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    getTransactionSummary();
  }, [transactions]);

  //fetch resent transaction
  useEffect(() =>{
      if(transactions?.recent.length > 0) return
      async function recentTransaction() {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/dashboard/recent",{
          method : "GET",
          headers : {
            "Content-type" : "application/json"
          },
          credentials : "include"
        })
        const data = await res.json()
        if(data.success){
          dispatch(addUserRecentTransaction(data?.transactions))
        }
      }
      recentTransaction()
  },[transactions.recent])

  return (
    <div>
      <Toaster />
      
      <Routes>

        <Route element = {<ProtectedRoutes />}>

          <Route path='/dashboard' element = {<Dashboard />} /> 
          <Route path='/setProfile' element = {<SetUpProfile />} /> 
          <Route path='/transactions' element = {<Transaction />} /> 
          <Route path='/profile' element = {<Profile />} /> 
          <Route path='/income' element = {<Income />} /> 
          <Route path='/budget' element = {<Budget />} /> 
          <Route path='/addbudget' element = {<AddBudget />} /> 
          <Route path='/editbudget' element = {<EditBudget />} /> 
          <Route path='/expense' element = {<Expense />} /> 
          <Route path='/category' element = {<Category />} /> 

        </Route>

        <Route path='/landing' element = {<Landing />} />
        <Route path='/' element = {<Landing />} />
        <Route path='/signup' element = {<SignUp />} /> 
        <Route path='/login' element = {<Login />} /> 

      </Routes>
    </div>
  )
}

export default App