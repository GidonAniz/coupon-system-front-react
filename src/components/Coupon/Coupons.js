import React from 'react';
import Coupon from './Coupon';


const Coupons = ({couponList}) => {
    console.log(couponList);
        return ( 
             couponList.map((coupon, index) => (
               <Coupon 
                 key={index} 
                 title={coupon.title} 
                 price={coupon.price} 
                 description={coupon.description}
                 amount={coupon.amount} 
                 startDate={coupon.startDate} 
                 endDate={coupon.endDate} 
                 image={coupon.imageUrl} 
               />
             ))
         );
}
export default Coupons;