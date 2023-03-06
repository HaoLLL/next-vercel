import { NextApiRequest, NextApiResponse } from 'next'
import request from 'service/fetch'
import {withIronSessionApiRoute} from 'iron-session/next'
import { IronOptions } from 'config'
import {ISession} from 'pages/api/index'
export default withIronSessionApiRoute(login,IronOptions);
async function login(req: NextApiRequest, res: NextApiResponse) {
    const {phone = '',verify = ''} = req.body;
    console.log(phone + ' '+verify)
    
    res.status(200).json({
        code:0,
        name:'lei'
    })
}