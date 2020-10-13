import React, { useState, useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import Api from '../../config/settings'
import { FormatDate } from '../../common/functions/formatter'
import OrderDetails from './right/orderDetails'

const TableTr = ({order}) =>{
  return(
    <>
      <tr>
        <td>{FormatDate(order.date_added).date}</td>
        <td>{order.name}</td>
        <td>{order.user_email}</td>
        <td>{order.order_items.map(item => (
          <li style={{listStyleType:'none'}}>
            {`${item.name} ( ${item.quantity}) @ ksh ${item.price}`}  
            <br/>
          </li>
          ))}
        </td>
        <td>{order.status_name}</td>
        <td><a href={`/orders/details/${order.id}`}>view</a></td>
      </tr>
    </>
  )
}

const Table = () => {

  const [orders, setOrders] = useState([])

  const getOrders = () => {
    Api.orders.get(`?ordering=-id`)
    .then(res => {
      setOrders(res.data)
    })
  }

  useEffect(() => {
    getOrders()
  }, [])

  return(
    <>
      {
        orders.length > 0 ?
          (
            <>
              <h2 className="playfair-lg">Orders</h2>
              <table className="lato-sm-b">
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Order No</th>
                    <th>User</th>
                    <th>Item(Qty)</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                  {orders.map(order => (
                    <TableTr order={order} />
                  ))}
                </tbody>
              </table>
            </>
          ) :
          (
            <>
              <h2 className="playfair-lg">No Orders available!</h2>
            </>
          )
        }
    </>
  )
}

const index = () => {
  return (
    <>
      <div className="midsection_full">
        <Switch>
          <Route exact path="/orders/" component={Table} />
          <Route exact path="/orders/details/:id" component={OrderDetails} />
        </Switch>
      </div>
    </>
  )
}

export default index
