import  fs  from 'fs';
import  path  from "path";
//const fs=require("fs")
//const path=require("path")
import { parse } from 'csv-parse/sync';


// Write to a file
async function writeFile(filePath: string, data: string) {
  try {
    await fs.writeFileSync(filePath, data);
    console.log(`File written successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error writing file: ${error}`);
  }
}

// Read a file
async function readFile(filePath: string) {
  try {
    const data = await fs.readFileSync(filePath);
    return data;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return null;
  }
}

// Read the file with Native 'FS' module

//const csvFilePath = path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`);

// Reusable method for multiple class
 function readCSV(filepath:string):any[]
{
  const csvDataFile = fs.readFileSync(filepath, { encoding: "utf-8" })
// Parse the CSV data In to Array form
const csvDataArr = parse(csvDataFile, {
  trim: true,
  skip_empty_lines: true,
  columns: true
});

return csvDataArr;

}

//unit testr
// const filepath= path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`);
// const resultSet=readCSV(filepath)
// console.log(resultSet)
// console.log(resultSet[0].testid)

export default {readCSV,readFile,writeFile};

