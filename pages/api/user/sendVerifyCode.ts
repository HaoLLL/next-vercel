import { format } from 'date-fns'
import md5 from 'md5'
import { encode } from 'js-base64'
import { NextApiRequest, NextApiResponse } from 'next'
import request from 'service/fetch'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
export default withIronSessionApiRoute(sendVerifyCode, IronOptions)
async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session

  const { to = '', templateId = '1' } = req.body
  const accountId = '2c94811c865849b80186afcf67fc1218'
  const authToken = '4e74e37953c94b7d80d45a65a92284dd'
  const nowDate = format(new Date(), 'yyyyMMddHHmmss')
  const sigParameter = md5(`${accountId}${authToken}${nowDate}`).toUpperCase();
  const authorization = encode(`${accountId}:${nowDate}`)
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountId}/SMS/TemplateSMS?sig=${sigParameter}`
  const appId = '2c94811c865849b80186afcf68f5121f'
  const verifyCode = String(Math.trunc(Math.random() * 9000 + 1000));
  const expireMinute = '5'

  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        authorization,
      },
    },
  )
  const { statusCode, statusMsg, templateSMS } = response as any
  if (statusCode !== '000000') {
    session.verifyCode = verifyCode
    console.log(session.verifyCode);
    await session.save()
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: { templateSMS },
    })
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    })
  }
}
