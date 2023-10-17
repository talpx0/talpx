import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const cssPath = req.query.cssPath; 

    try {
        const jsonDirectory = path.join(process.cwd(), 'json', 'css');
        const filePath = path.join(jsonDirectory, `${cssPath}.json`);
        const fileContents = await fs.readFile(filePath, 'utf8');

        res.status(200).json(JSON.parse(fileContents));
    } catch (error) {
        res.status(500).json({ message: `Error reading JSON file for file: ${cssPath}.json`, error: error.message });
    }
}
