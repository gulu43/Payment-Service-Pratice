import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ALL_DATA } from './App';
import { useEffect } from 'react';
import './index.css'

export function Payment() {
    const { amount, setAmount, name, setName } = useContext(ALL_DATA);
    const [time, setTime] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const razorpay_script = import.meta.env.VITE_RAZORPAY_SCRIPT;

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(false)
        }, 4000)


        return () => clearTimeout(timer)
    }, [])

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = `${razorpay_script}`;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    const sendMoneyFn = () => {
        if (name.length >= 15) {
            alert('Enter Only middle name not full name and total charater must be less than 15 characters')
        }
        if (!name || !amount || Number(amount) <= 0) {
            alert("Please enter a valid name and amount");
            return;
        }
        fetch(`${backendUrl}/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                amount: amount
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('order ID', data.orderId)
                if (data.orderId != undefined) {
                    loadRazorpayScript()
                        .then((loaded) => {
                            if (!loaded) {
                                alert("Razorpay SDK failed to load.");
                                return;
                            }
                            const options = {
                                key: import.meta.env.VITE_KEY_ID, // Razorpay public key from .env FROUNTED 
                                amount: Number(amount) * 100, // in paise
                                currency: "INR",
                                name: "MyApp Donation",
                                description: "Thank you for donating",
                                order_id: data.orderId,
                                handler: function (response) {
                                    alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                                    console.log("Payment successful! Payment ID: " + response.razorpay_payment_id);
                                    
                                    // Optional: Send response to backend for verification
                                },
                                prefill: {
                                    name: name
                                },
                                theme: {
                                    color: "#3399cc"
                                }
                            };
                            const rzp = new window.Razorpay(options);
                            rzp.open();
                        })
                        .catch((error) => {
                            return false
                        })
                }

            })
            .catch(error => console.error('Error while sending money: ', error));


    }

    return (
        <>
            <div className='cen'>

                {time && <div className='welcome'>Wellcome</div>}
                {!time && <div className='mainDiv' >
                    <div className='inpDiv'>
                        <label htmlFor="name" className='lab'>Enter Name</label>
                        <input type="text" id="name" className='inp' onChange={(e) => {
                            setName(e.target.value)

                        }} required />
                    </div>

                    <div className='inpDiv' >
                        <label htmlFor="amount" className='lab'>Enter Amount</label>
                        <input type='number' id="amount" className='inp' onChange={(e) => {
                            setAmount(e.target.value)

                        }} required />
                    </div>

                    <div className='inpDiv'>
                        <button className='btn' onClick={sendMoneyFn}>Submit</button>
                    </div>

                </div>}

            </div>
        </>
    );
}