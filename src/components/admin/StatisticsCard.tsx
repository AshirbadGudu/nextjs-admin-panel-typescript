import React from 'react'
import { Grid } from '@mui/material'

type Props = {
  className?: string
  data: {
    img: JSX.Element
    title: string
    count: string
    className: string
  }[]
}

const StatisticsCard = ({ className = '', data }: Props) => {
  return (
    <>
      <section className={`rounded-md bg-white p-6 shadow-lg ${className}`}>
        <div className="flex justify-between">
          <span>
            <p className="text-xl text-gray-700">{'Dashboard Stats'}</p>
          </span>
        </div>
        <div className="py-4 text-base text-gray-700">
          <p>
            {
              'Get an overview of the data that is currently available in the system'
            }
          </p>
        </div>
        <div className="py-4">
          <Grid container spacing={0}>
            {data?.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                <div className="flex w-full gap-3 p-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center 
                    rounded-md  p-1 text-2xl text-white shadow-lg ${
                      item.className || ''
                    }`}
                  >
                    {item.img}
                  </div>
                  <div>
                    <p className="text-sm font-normal text-gray-600">
                      {item.title}
                    </p>
                    <p className="text-2xl text-gray-600">{item.count}</p>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </>
  )
}

export default StatisticsCard
