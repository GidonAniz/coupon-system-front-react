import React, { useState } from 'react';
import CompanyCoupon from './CompanyCoupon';


const CompanyCoupons = ({couponList}) => {
    console.log(couponList);

      const [searchTerm, setSearchTerm] = useState('');

      const [sortOption, setSortOption] = useState('');

      const handleSortClick = (option) => {
        setSortOption(option);
      }
    
        const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
      }
    
      const filteredCoupons = 
      couponList.filter((coupon) => coupon.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        switch (sortOption) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'startDate':
            return new Date(a.startDate) - new Date(b.startDate);
          case 'endDate':
            return new Date(a.endDate) - new Date(b.endDate);
          default:
            return 0;
        }
      });

        return ( 
          <div>
          <div>
            <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search by title" />
            <button onClick={() => handleSortClick('title')}>Sort by Title</button>
            <button onClick={() => handleSortClick('startDate')}>Sort by Start Date</button>
            <button onClick={() => handleSortClick('endDate')}>Sort by End Date</button>
          </div>
          {filteredCoupons.map((coupon, index) => (
            <CompanyCoupon
                 key={index} 
                 id ={coupon.id}
                 title={coupon.title} 
                 price={coupon.price} 
                 description={coupon.description}
                 amount={coupon.amount} 
                 startDate={coupon.startDate} 
                 endDate={coupon.endDate} 
                 image={coupon.imageUrl} 
                 />
                 ))}
               </div>
             );
           };
export default CompanyCoupons;