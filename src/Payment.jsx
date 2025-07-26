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
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(false)
        }, 4000)


        return () => clearTimeout(timer)
    }, [])

    const sendMoneyFn = () => {

        fetch(`${backendUrl}/donate`, {
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
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));


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

                        }} />
                    </div>

                    <div className='inpDiv' >
                        <label htmlFor="amount" className='lab'>Enter Amount</label>
                        <input type='number' id="amount" className='inp' onChange={(e) => {
                            setAmount(e.target.value)

                        }} />
                    </div>

                    <div className='inpDiv'>
                        <button className='btn' onClick={sendMoneyFn}>Submit</button>
                    </div>

                </div>}

            </div>
        </>
    );
}