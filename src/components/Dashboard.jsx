import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import CompanyOverview from './CompanyOverview'
import StockData from './StockData'
import Chart from './Chart'
import StockContext from '../context/StockContext'
import { fetchQuote, fetchStockDetails } from '../api/stock-api'

export default function Dashboard() {
  const [stockDetails, setStockDetails] = useState({})
  const [quote, setQuote] = useState({})
  const { stockSymbol } = useContext(StockContext)

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol)
        setStockDetails(result)
      } catch (error) {
        setStockDetails({})
        console.log(error)
      }
    }

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol)
        setQuote(result)
      } catch (error) {
        setQuote({})
        console.log(error)
      }
    }

    updateStockDetails()
    updateStockOverview()
  }, [stockSymbol])

  return (
    <div className="grid h-screen auto-rows-fr grid-cols-1 grid-rows-8 gap-6 bg-[#0D1116] p-10 md:grid-cols-2 md:grid-rows-7 xl:grid-cols-3 xl:grid-rows-5">
      <div className="col-span-1 row-span-1 flex items-center justify-start md:col-span-2 xl:col-span-3">
        <Header name={stockDetails.name} />
      </div>

      <div className="row-span-4 md:col-span-2">
        <Chart />
      </div>

      <div>
        <StockData
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>

      <div className="row-span-3 xl:row-span-2">
        <CompanyOverview profile={stockDetails} />
      </div>
    </div>
  )
}
