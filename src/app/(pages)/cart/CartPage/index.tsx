'use client'

// Importing necessary modules and components from external files and libraries.
import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

// Importing styles using CSS Modules.
import classes from './index.module.scss'

// Define the functional component for the CartPage.
export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  // Destructuring props to access required properties.
  const { settings } = props
  const { productsPage } = settings || {}

  // Using custom hooks to get user authentication and cart-related information.
  const { user } = useAuth()
  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  return (
    // Using React.Fragment to group elements without adding an extra DOM node.
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        // Display a loading shimmer component while initializing the cart.
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        // Display cart information if the cart has been initialized.
        <Fragment>
          {cartIsEmpty ? (
            // Display a message when the cart is empty.
            <div className={classes.empty}>
              Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Click here</Link>
                  {` to shop.`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>Log in</Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
            </div>
          ) : (
            // Display the cart items and summary if the cart is not empty.
            <div className={classes.cartWrapper}>
              <div>
                {/* CART LIST HEADER */}
                {/* Display header for the list of cart items */}
                <div className={classes.header}>
                  <p>Products</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Quantity</p>
                  </div>
                  <p className={classes.headersubtotal}>Subtotal</p>
                </div>
                {/* CART ITEM LIST */}
                {/* Display the list of cart items */}
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      // Destructure product information from cart item.
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      // Check if it's the last item in the cart.
                      const isLast = index === (cart?.items?.length || 0) - 1

                      // Get meta image from product.
                      const metaImage = meta?.image

                      // Render CartItem component for each item in the cart.
                      return (
                        <CartItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              {/* Display cart summary */}
              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Summary</h6>
                </div>

                {/* Display delivery charge */}
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Delivery Charge</p>
                  <p className={classes.cartTotal}>$0</p>
                </div>

                {/* Display grand total */}
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Grand Total</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>

                {/* Display checkout button */}
                <Button
                  className={classes.checkoutButton}
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Checkout' : 'Login to checkout'}
                  appearance="primary"
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
