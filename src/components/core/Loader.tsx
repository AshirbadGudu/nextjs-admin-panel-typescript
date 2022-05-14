import { LOGO } from 'assets'

type Props = {
  visible?: boolean
}
const Loader = ({ visible }: Props) => {
  return (
    <div
      className={`absolute z-[2002] flex h-full w-full items-center justify-center bg-white ${
        visible ? 'block' : 'hidden'
      }`}
    >
      <div className="relative h-48 w-48">
        <div className="rotate-animation h-48 w-48 rounded-full border-x-2 border-t-2 border-x-primary border-t-primary" />
        <img
          alt=""
          src={LOGO}
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-pulse"
        />
      </div>
    </div>
  )
}

export default Loader
