import React from 'react'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap'

import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Cart() {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  
  const navigate = useNavigate()
  const goToCheckout = () => {
    navigate('/checkout')
  }
  const goToShop = () => {
    navigate('/shop')
  }

  const Tr = ({item}) => {

    const dispatch = useDispatch()

    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id))
    }

    return (
      <tr>
        <td><img src={item.imgUrl} alt="" /></td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <motion.td whileTap={{scale:1.2}} onClick={deleteProduct}><i class="ri-delete-bin-line"></i></motion.td>
      </tr>
    )
  }

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? (
                  <h2 className='fs-4 text-center'>No item added to the card</h2>
                ) : (
                  <table className='table bordered'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th >Delete</th>
                      </tr>
                    </thead>

                    <tbody className='flex'>
                      {
                        cartItems.map((item, index) => (
                          <Tr item={item} key={index}/>
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
            </Col>

            <Col lg='3'>
              <div>
                <h6 className='fs-4 d-flex align-items-center justify-content-between'>
                  Subtotal:
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
              <div>
                <button className="buy__btn w-100" onClick={goToCheckout}>
                  Checkout
                </button>

                <button className="buy__btn w-100 mt-3" onClick={goToShop}>
                  Continue Shopping
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}



export default Cart