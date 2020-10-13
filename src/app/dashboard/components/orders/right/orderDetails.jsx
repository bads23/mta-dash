import React,{useEffect,useState} from 'react'
import Api from '../../../../config/settings'
import FormatNumber, {FormatDate} from '../../../../common/functions/formatter'
import {Item} from '../../products/right/main'
import {Select} from '../../../../common/inputs'

const OrderDetails = (props) => {
  const [order, setOrder] = useState()
  const [status, setStatus] = useState()
  const [options, setOptions] = useState()

  const handleForm = (e) => {
    setStatus(e.target.value)
  }

  const getOptions = () => {
    Api.orderstatus.get()
    .then(res => {
      setOptions(res.data)
    })
  }

  const mkTotal = (data) => {
    var subtotal = 0
    var delivery = 0

    for(var i=0; i < data.order_items.length; i++){
      subtotal += data.order_items[i].price
      delivery += data.order_items[i].delivery_fee
    }

    return subtotal + delivery
  }
  
  const getOrders = () => {
    Api.orders.get(`${props.match.params.id}`)
    .then(res => {
      setOrder(res.data)
    })

  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    var btn = document.getElementById('saveBtn')
    btn.disabled = 'disabled'
    btn.innerText = 'Updating'

    Api.orders.put(`${props.match.params.id}`, {status: status})
    .then(res=>{
      btn.innerText='Update Order'
      setTimeout(()=>{
        btn.disabled=''
      },1000)
    })
  }

  const handleDelete =() =>{
    var btn = document.getElementById('deleteBtn')
    btn.disabled = 'disabled'
    btn.innerText = 'Deleting...'

    Api.orders.delete(`${props.match.params.id}`)
    .then(res=>{
      btn.innerText = 'Deleted!'
      setTimeout(() => {
        window.location.href = "/orders"
      },3000)
    })
    .catch(error => {
      btn.innerText = 'Unable to delete'
      btn.disabled = ''
    })

  }
  
  useEffect(() =>{
    getOrders()
    getOptions()
  },[])

  return (
      <>
      {
        order ? (
          <>
            <div className="mg-v-20">
              <span className="order-text lato-xlg">Order: {order.name} </span>
              <span className="order-text lato-m"> {FormatDate(order.date_added).date} | {order.status_name} | Ksh {FormatNumber(mkTotal(order))} </span>
              <span className="lato-m">by {order.user_fname} {order.user_lname} </span>
            </div>

            <h2 className="lato-m ">Order Items</h2>
            <div className="fl-start fl-wrap">
              {
                order.order_items.map(item => (
                  <Item props={item} />
                ))
              }
            </div>
            
            <form onSubmit={handleSubmit}>
              <Select label="Order Status" options={options} onChange={handleForm} />
              <button className="btn-black" id="saveBtn" type="submit">Update Order</button>
            </form>
            
            <div className="mg-v-50">
              <button className="btn-gold" id="deleteBtn" onClick={handleDelete}>Delete</button>
            </div>
          </>
        ) : (
          ''
        )
        }
      </>
  )
}
export default OrderDetails
