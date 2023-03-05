import { format } from 'date-fns'
import md5 from 'md5'
import { encode, decode } from 'js-base64'
import { NextApiRequest, NextApiResponse } from 'next'
import request from 'service/fetch'
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { to = '', templateId = '1' } = req.body
  const accountId = '2c94811c865849b80186afcf67fc1218'
  const authToken = '4e74e37953c94b7d80d45a65a92284dd'
  const nowDate = format(new Date(), 'yyyyMMddHHmmss')
  const sigParameter = md5(`${accountId}${authToken}${nowDate}`)
  const authorization = encode(`${accountId}:${nowDate}`)

  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSid}/SMS/{funcdes}?sig={SigParameter}`
  res.status(200).json({
    code: 0,
    data: 123,
  })
}
