import React from 'react'
import Card from './Card'

export default function StockData({
  symbol,
  price,
  change,
  changePercent,
  currency,
}) {
  return (
    //
    <Card>
      <div className="my-2 flex h-full w-full items-center justify-between">
        <span className="absolute left-6 top-4 text-lg font-bold text-gray-light md:text-lg lg:text-xl 2xl:text-2xl">
          ${symbol}
        </span>
        <span
          className={`flex items-center text-xl font-semibold xl:text-3xl 2xl:text-4xl ${
            change > 0 ? 'text-green' : 'text-red'
          }`}
        >
          ${price}
          <span className="m-2 text-lg xl:text-xl 2xl:text-2xl">
            {currency}
          </span>
        </span>
        <span
          className={`text-md xl:text-xl 2xl:text-2xl ${
            change > 0 ? 'text-green' : 'text-red'
          }`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  )
}
