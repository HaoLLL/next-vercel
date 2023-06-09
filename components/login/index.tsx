interface IProps {
  isShow: boolean
  onClose: Function
}
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import CountDown from 'components/countdown'
import { message } from 'antd'
import request from 'service/fetch'
import {useStore} from 'store'
export default function Login(props: IProps) {
  const { isShow = false, onClose } = props
  const handleClose = () => {
    onClose && onClose()
  }
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })
  const [isShowVerifyCode, setIsShowVerifyShow] = useState(false)
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target || null
    setForm({
      ...form,
      [name]: value,
    })
  }
  const initUserInfo = useStore((state:any) => state.initUserInfo);
  const handleLogin  = async()=>{
    const res:any = await request
    .post('/api/user/login', {
      ...form,
      identity_type:'phone'
    });
    if (res?.code === 0) {
      message.info(res?.msg || '操作成功')
      initUserInfo({userInfo:{...res?.data}});
      onClose && onClose()
    } else {
      message.error(res?.msg || '未知错误')
    }

  }
  
  const handleAuthGithub = () => {}
  const handleGetVerifyCode = () => {
    // setIsShowVerifyShow(true)
    if (!form.phone) {
      message.warning('请输入手机号')
      return
    }
    request
      .post('/api/user/sendVerifyCode', {
        to: form?.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setIsShowVerifyShow(true)
        } else {
          message.error(res?.msg || '未知错误')
        }
      })
  }
  const handleCountEnd = () => {
    setIsShowVerifyShow(false)
  }
  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          type="text"
          name="phone"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            type="text"
            name="verify"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountEnd}></CountDown>
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={handleAuthGithub}>
          使用 Github 登录
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a
            href="https://moco.imooc.com/privacy.html"
            target="_blank"
            rel="noreferrer"
          >
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null
}
