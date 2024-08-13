import React from 'react';
import Maincategory from './Maincategory';
import Products from './Products';
import Footer from './Footer';


const Collection = () => {
  return (
    <div>
        <Maincategory/>
        <div>
            <Products/>
        </div>
        <Footer/>
    </div>
  )
}

export default Collection