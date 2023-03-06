interface IProps {
  time: number
  onEnd: Function
}
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
export default function CountDown(props: IProps) {
  const { time, onEnd } = props
  const [count, setCount] = useState(time || 60)
  //   [] 执行一次 空：每次渲染都执行
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count == 0) {
          clearInterval(id)
          onEnd && onEnd()
          return count
        }
        return count - 1
      })
      //   组件卸载的时候执行 清理副作用
      return () => {
        clearInterval(id)
      }
    }, 1000)
  }, [time, onEnd])
  return <div className={styles.countDown}>{count}</div>
}
