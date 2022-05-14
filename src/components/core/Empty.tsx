type Props = {
  src: string
  title: string
  className?: string
}
export default ({ src, title, className = 'h-96 w-96' }: Props) => {
  return (
    <>
      <section className="grid place-content-center">
        <img src={src} alt="" className={className} />
        <h1 className="text-center text-xl">{title}</h1>
      </section>
    </>
  )
}
