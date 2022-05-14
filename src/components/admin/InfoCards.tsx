import { Fragment } from 'react'

type Props = {
  data: {
    title: string
    count: string
    icon: JSX.Element
    className: string
  }[]
  className?: string
}

export default function InfoCards({ data, className = '' }: Props) {
  return (
    <section className={`${className}`}>
      <div className="flex h-full w-full flex-wrap rounded-lg bg-white shadow-lg">
        {data.map(({ title, count, icon, className = '' }) => (
          <Fragment key={title}>
            <div
              className={`flex w-[50%] items-center gap-4 px-3 py-2 ${className}`}
            >
              <span className="rounded-lg border bg-indigo-200 p-2 shadow-md">
                {icon}
              </span>
              <div className="flex flex-col">
                <h6 className="text-sm lg:text-2xl">{count}</h6>
                <p className="text-sm lg:text-lg">{title}</p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
