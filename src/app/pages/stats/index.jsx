import React, {useState, useEffect} from 'react'
import Api from '../../config/settings'
import { LineChart, Line, XAxis,YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import formatNumber from '../../common/functions/formatter'

const index = () => {

  const [orders, setOrders] = useState([])
  const [itemsStats, setItemStats] = useState([])
  const [visitorStats, setVisitorStats] = useState([])
  const [graphW, setGraphW] = useState(0)


  const getOrderStats = () => {
    Api.orderstats.get('?days=7')
    .then(res =>(
      setOrders(res.data)
    ))
  }

  const getItemStats = () =>{
    Api.itemsstats.get()
    .then(res =>(
      setItemStats(res.data)
    ))
  }

  const getVisitorStats = () => {
    Api.visitorstats.get()
    .then(res =>(
      setVisitorStats(res.data)
    ))
  }

  const getSalesTotal = (arr) => {
    let salesTotal = 0;

    if (arr.length > 1){
      for(var i=0; i<arr.length; i++){
        salesTotal += arr[i].amount
      }
    }

    return formatNumber(salesTotal)
  }

  useEffect(() => {
    getOrderStats()
    getItemStats()
    getVisitorStats()
    var gw = document.getElementById('graphDiv').offsetWidth;
    setGraphW(gw*.95)

  },[])


  return (
    <>
      <div className="midsection_full">
        <h2 className="playfair-lg">Dashboard</h2>

        <div className="graph" id="graphDiv">
          <h2 className="playfair-xl gold">Orders for the past Week</h2>
          <LineChart width={graphW} height={300} data={orders}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date">
            <Label value="Past Seven Days" offset={-5} position="bottom" />
          </XAxis>
          <YAxis label={{ value: 'Orders', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#D4AF37" />
          </LineChart>
        </div>

        <div className="fl-btw">
          <div className="analytics">
            <h3 className="playfair gold">
              {
                visitorStats.length > 1 ? (
                  visitorStats.length
                ) : (
                  '-'
                )
              }
            </h3>
            <p className="lato-m">Unique visitors in the past week</p>
          </div>
          <div className="analytics">
            <h3 className="playfair gold">
              {
                itemsStats.length > 1 ? (
                  itemsStats[0].item
                ) : (
                  '-'
                )
              }
            </h3>
            <p className="lato-m">Best Selling item - 30 Pieces sold</p>
          </div>
          <div className="analytics">
            <h3 className="playfair gold"> {getSalesTotal(itemsStats)} </h3>
            <p className="lato-m">Amount of sales in Kshs</p>
          </div>
        </div>
      </div>
      {/* <Right /> */}
    </>
  )
}

export default index
