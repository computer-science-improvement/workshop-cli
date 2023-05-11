import dotenv from 'dotenv';
import axios from "axios";
import { program } from 'commander';

program.option('--search')
program.option('--page')
program.option('--year')

program.parse();

// LOCAL DEVELOPMENT ONLY
// const ENV = dotenv.config({ path: '.env.local' }).parsed;
const ENV = dotenv.config().parsed;

const API_URL = `https://www.omdbapi.com/?apikey=${ENV['API_KEY']}`;
const getCLI = () => {
    const args = program.args;
    const values = args.filter(Boolean);
    if (args && values.length) {
        return values.join(' ');
    }

    throw new Error('Invalid CLI prompt');
}


const getOutput = (response) => {
    return `${response['Title']}: (${response['Year']})
    Poster: ${response['Poster']}
`
}

const logger = (data) => console.log(getOutput(data));
axios.get(API_URL, { params: { s: getCLI()} }).then(d => {
    const response = d.data['Search'];
    response.forEach(logger);
})
