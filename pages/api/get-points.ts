// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GeoJSON } from 'geojson';
import { readFileSync } from 'fs';
import path from 'path';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GeoJSON[]>
) {
    const code = readFileSync('./scripts/output.geojson', { encoding: 'utf8' });
    res.status(200).json(JSON.parse(code));
}
