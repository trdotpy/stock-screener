import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartFilter from './ChartFilter'
import { chartConfig } from '../constants/config'
import { fetchHistoricalData } from '../api/stock-api'
import StockContext from '../context/StockContext'
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from '../utils/date-helper'

export default function Chart() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('1W')
  const { stockSymbol } = useContext(StockContext)

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      }
    })
  }

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter]
      const endDate = new Date()
      const startDate = createDate(endDate, -days, -weeks, -months, -years)
      const startTimestampUnix = convertDateToUnixTimestamp(startDate)
      const endTimestampUnix = convertDateToUnixTimestamp(endDate)
      return { startTimestampUnix, endTimestampUnix }
    }
    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange()
        const resolution = chartConfig[filter].resolution
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        )
        setData(formatData(result))
      } catch (error) {
        setData([])
        console.log(error)
      }
    }
    updateChartData()
  }, [stockSymbol, filter])

  return (
    <Card>
      <ul className="absolute top-2 right-2 z-40 flex text-sm">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item)
              }}
            />
          </li>
        ))}
      </ul>

      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7F7EFF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="##7F7EFF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="#F7F7F7"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip />
          <XAxis dataKey={'date'} />
          <YAxis domain={['dataMin', 'dataMax']} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
