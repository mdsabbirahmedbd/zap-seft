import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
const SeccessPayment = () => {
   const [searchParams]  = useSearchParams();
   const session_id = searchParams.get('session_id');
   const axiosSecure = UseAxiosSecure()

   const [paymentInfo, setPaymentInfo] = useState({});

   useEffect(()=>{
    if(session_id){
         axiosSecure.patch(`/payment-success?session_id=${session_id}`)
         .then(res => {
          setPaymentInfo({
            transactionId : res.data.transactionId,
            trakingId : res.data.traking_Id
          })
            console.log(res.data)
         })
    }
   },[session_id])


  return (
    <div>
      <div>SeccessPayment</div>
      <h1> Transaction Id :  {paymentInfo.transactionId}</h1>
      <h1> Traking Id :  {paymentInfo.trakingId}</h1>
    </div>
  )
}

export default SeccessPayment