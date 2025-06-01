import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success,orderId},{
            headers: { Authorization: `Bearer ${token}` },
          })

          console.log('Verify Payment Response:', response.data);

          if (response.data?.success) {
            setCartItems({});
            toast.success("Payment verified successfully!");
            navigate('/orders');
        } else {
            toast.error("Payment verification failed. Redirecting to cart.");
            navigate('/cart');
        }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (token) {
        verifyPayment();
    }
    },[token])

  return (
    <div>
      
    </div>








  )
}

export default Verify
