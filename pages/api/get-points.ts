import { NextApiRequest, NextApiResponse } from 'next';
import { Points } from '$lib/points';
import { env } from 'process';

export default async (req: NextApiRequest, res: NextApiResponse<Points[]>) => {
    try {
        console.log(env.API_TOKEN, env.API_ID);
        let data = await fetch(
            `https://webapp-flask.n3t.kiwi/sites?filterByReadingsMode=2&readingsStartDateTimestamp=1607252400&readingsEndDateTimestamp=1607338800&AccessToken=${env.API_TOKEN}&Identity=${env.API_ID}`
        );

        res.status(data.status).json(await data.json());
    } catch (ex) {
        // @ts-ignore
        res.status(500).json(ex);
    }
};
