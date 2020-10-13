import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Api from '../../../config/settings'
import Formart from '../../../common/functions/formatter'

export const Item = ({ props }) => {
  
  return (
    <a href={`/products/edit/` + props.id}>
      <div className="item">
        <div className="pr-image">
          {
            props.images ? (
              <img src={`${Api.images.imgUrl}/${props.images[0].path}`} alt=""/>
            ) : (
              ''
            )
          }  
        </div>
        <div className="pr-info">
          <p className="lato-m b mg-0">{props.name}</p>
          <p className="playfair-sm mg-0">Ksh {Formart(props.price)}</p>
        </div>
      </div>
    </a>
  )
}

const index = () => {
  const [products, setProducts] = useState([]);

  const getItems = () => {
    Api.catalog.get()
      .then(res => {
        setProducts(res.data)
      })
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <>
      <div className="midsection_full">
        <div className="fl-btw">
          <h2 className="playfair-lg"> Products </h2>
          <div>
            <Link to="/products/new">
              <span className="lato-m b"><i className="fas fa-plus "></i> New Product</span>
            </Link>
          </div>
        </div>
        <div className="fl-btw fl-wrap">
          {
            products ?
              (
                products.map(item => (
                  <Item props={item} key={item.id}/>
                ))
              ) :
              (
                <></>
              )
          }
        </div>
      </div>

    </>
  )
}

export default index