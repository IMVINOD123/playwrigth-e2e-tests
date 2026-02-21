import fs from 'fs';
import path from 'path';
const Logger = require('../helpers/logger.js');

const logger = new Logger();

/**
 * Reads file and returns string.
 * For JSON, parse before using.
 */
export function readFile(filePath: string): string {
  //const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`No file exists with given name: ${filePath}`);
  }

  logger.info(`Reading file: ${filePath}`);

  const data = fs.readFileSync(filePath, 'utf-8');
  return data;
}

/**
 * Writes data to target file.
 * If file is JSON, stringify before passing.
 */
export function writeFile(filePath: string, data: string): void {
    try {
    fs.writeFileSync(filePath, data, { encoding: 'utf-8' });
   logger.info(`Writing file: ${filePath}`);
  } catch (err: any) {
    throw new Error(`Error writing to: ${filePath}, ${err.message}`);
  }
}

/**
 * Append data to file
 */
export function appendFile(filePath: string, data: string): void {
  //const absolutePath = path.resolve(process.cwd(), filePath);

  try {
    fs.appendFileSync(filePath, data + '\n', { encoding: 'utf-8' });
   logger.info(`Appending file: ${filePath}`);
  } catch (err: any) {
    throw new Error(`Error appending to: ${filePath}, ${err.message}`);
  }
}

/**
 * Read JSON file
 */
export function readJSON<T>(filePath: string): T {
  const data = readFile(filePath);
  return JSON.parse(data);
}

/**
 * Write JSON file
 */
export function writeJSON(filePath: string, data: object): void {
  writeFile(filePath, JSON.stringify(data, null, 2));
}

export default {readFile,writeFile,appendFile,readJSON,writeJSON}