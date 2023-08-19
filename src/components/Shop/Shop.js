import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
      const [products,setProducts]=useState([]);
      const [cart,setCart]=useState([]);
      useEffect(()=>{
            fetch('products.json')
            .then(res=>res.json())
            .then(data=>setProducts(data))
      },[]);
      useEffect(()=>{
            const storedCart=getShoppingCart();
            
            const savedCart=[];
            for(const id in storedCart){
                  
                  const addedproduct=products.find(product=> product.id===id);
                  
                  if(addedproduct){
                        const quantity=storedCart[id];
                        addedproduct.quantity=quantity;
                        savedCart.push(addedproduct);



                       }
            }
            setCart(savedCart);

      },[products])



      const handleAddToCart=(selecetdProduct)=>{
            let newCart=[];
            const existingProduct=cart.find(product=>product.id===selecetdProduct.id)
            if(!existingProduct){
                  selecetdProduct.quantity=1;
                  newCart=[...cart,selecetdProduct];
            }
            else{
                  const rest=cart.filter(product=> product.id !==selecetdProduct.id);
                  existingProduct.quantity=existingProduct.quantity+1;
                  newCart=[...rest,selecetdProduct];
            }
            
            setCart(newCart);
            addToDb(selecetdProduct.id)
      }
      return (
            <div className='shop-container'>
                  <div className='product-container'>
                        {
                              products.map(product=><Product
                              key={product.id}
                              product={product}
                              handleAddToCart={handleAddToCart}>

                              </Product>)
                        }

                  </div>
                  <div className='cart-container'>
                        <Cart cart={cart}></Cart>
                  </div>
                  
            </div>
      );
};

export default Shop;