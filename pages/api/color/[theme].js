import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const theme = req.query.theme; // This captures the dynamic part of the URL
    try {
        const jsonDirectory = path.join(process.cwd(), 'json', 'color');
        const filePath = path.join(jsonDirectory, `${theme}.json`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        res.status(200).json(JSON.parse(fileContents));
    } catch (error) {
        res.status(500).json({ message: `Error reading JSON file for theme: ${theme}`, error: error.message });
    }
}
