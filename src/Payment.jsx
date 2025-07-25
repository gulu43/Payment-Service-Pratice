import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ALL_DATA } from './App';
import { useEffect } from 'react';
import './index.css'

export function Payment() {
    const { amount, setAmount } = useContext(ALL_DATA);
    const [time, setTime] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout( ()=>{
            setTime(false)
        }, 4000)
        
        return () => clearTimeout(timer)
    }, [])
    
    return (
        <>
        
            {time && <div className='welcome'>Wellcome</div>}
            <div>ok Payment</div> 
        </>
    );
}