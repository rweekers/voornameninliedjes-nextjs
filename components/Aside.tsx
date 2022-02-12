import { PropsWithChildren } from 'react'

interface Props {
  className: string;
}

export default function Aside(props: PropsWithChildren<Props>) {
  return (
    <aside className={props.className} />
  )
}
