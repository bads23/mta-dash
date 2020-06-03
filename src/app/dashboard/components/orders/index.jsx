import React, { useState, useEffect } from 'react'
import Api from '../../../config/settings'
import Formart, { FormatDate } from '../../../common/functions/formatter'
import { ShowOption } from '../../../common/popups'

const index = () => {

  const [orders, setOrders] = useState([])

  const getOrders = () => {
    // ApiGet(`${URLS().ORDERS}?ordering=-id`)
    Api.orders.get(`?ordering=-id`)
      .then(res => {
        setOrders(res.data)
      })
  }

  useEffect(() => {
    getOrders()
  }, [])


  // const deleteOrder = (id) =>{
  //   ApiDelete(`${URLS().ORDERS}id/`)
  //   .then(res =>{
  //     console.log(res.data)
  //   })
  // }

  const handleAction = (id) =>{
    console.log(id)
    ShowOption('Delete This Item?')
  }

  return (
    <>
      <div className="midsection_full">
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
                      <th className="totalsCol">Total</th>
                      <th>Payment Method</th>
                      <th width="5%">Action(Change Status)</th>
                    </tr>

                    {orders.map(order => (

                      <>
                        <tr>
                          <td>{FormatDate(order.date_added).date}</td>
                          <td>{order.name}</td>
                          <td>{order.user_email}</td>
                          <td>{order.order_items.map(item => (
                            <li style={{listStyleType:'none'}}>
                              {/* {item.name + '('+item.quantity+')' +', '} */}
                              {`${item.name} ( ${item.quantity})`}
                            </li>
                            ))}
                          </td>
                          <td className="totalsCol"> Ksh {Formart(order.amount)}</td>
                          <td>{order.pay_status}  ({order.mode})</td>
                          <td>
                            <select onChange={() => handleAction(order.id)}>
                              <option value="pending">Pending</option>
                              <option value="confirm">Confirm</option>
                              <option value="cancel">Cancel</option>
                              <option value="delete">Intransit</option>
                              <option value="delete">Delete</option>
                            </select>
                          </td>
                        </tr>
                      </>
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
      </div>
    </>
  )
}

export default index
