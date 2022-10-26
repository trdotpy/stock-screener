import React from 'react'
import Card from './Card'

export default function CompanyOverview({ profile }) {
  const profileList = {
    name: 'Name',
    ipo: 'IPO Date',
    country: 'Country',
    // currency: 'Currency',
    exchange: 'Exchange',
    finnhubIndustry: 'Industry',
    marketCapitalization: 'Market Cap',
    shareOutstanding: 'Shares Outstanding',
  }

  const convertM2B = (number) => {
    return (number / 1000).toFixed(2)
  }

  return (
    //
    <Card>
      <ul className="lg:text-md flex h-full w-full flex-col justify-between text-gray-light md:text-sm xl:text-lg">
        {Object.keys(profileList).map((item) => {
          return (
            <li
              key={item}
              className="flex items-center justify-between font-semibold"
            >
              <span>{profileList[item]}</span>
              <span className="font-bold uppercase">
                {item === 'marketCapitalization'
                  ? `${convertM2B(profile[item])}B`
                  : profile[item]}
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
