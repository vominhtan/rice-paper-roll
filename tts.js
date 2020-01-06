// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart(text, filename) {

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'vi-VN', name: 'vi-VN-Wavenet-A'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename + '.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

[
  {text: 'Số 1', filename: '01'},
  {text: 'Số 2', filename: '02'},
  {text: 'Số 3', filename: '03'},
  {text: 'Số 4', filename: '04'},
  {text: 'Số 5', filename: '05'},
  {text: 'Số 6', filename: '06'},
  {text: 'Số 7', filename: '07'},
  {text: 'Số 8', filename: '08'},
  {text: 'Số 9', filename: '09'},
  {text: 'Số 9', filename: '09'},
  {text: '10', filename: '10'},
  {text: '11', filename: '11'},
  {text: '12', filename: '12'},
  {text: '13', filename: '13'},
  {text: '14', filename: '14'},
  {text: '15', filename: '15'},
  {text: '16', filename: '16'},
  {text: '17', filename: '17'},
  {text: '18', filename: '18'},
  {text: '19', filename: '19'},
  {text: '20', filename: '20'},
  {text: '21', filename: '21'},
  {text: '22', filename: '22'},
  {text: '23', filename: '23'},
  {text: '24', filename: '24'},
  {text: '25', filename: '25'},
  {text: '26', filename: '26'},
  {text: '27', filename: '27'},
  {text: '28', filename: '28'},
  {text: '29', filename: '29'},

  {text: '30', filename: '30'},
  {text: '31', filename: '31'},
  {text: '32', filename: '32'},
  {text: '33', filename: '33'},
  {text: '34', filename: '34'},
  {text: '35', filename: '35'},
  {text: '36', filename: '36'},
  {text: '37', filename: '37'},
  {text: '38', filename: '38'},
  {text: '39', filename: '39'},

  {text: '40', filename: '40'},
  {text: '41', filename: '41'},
  {text: '42', filename: '42'},
  {text: '43', filename: '43'},
  {text: '44', filename: '44'},
  {text: '45', filename: '45'},
  {text: '46', filename: '46'},
  {text: '47', filename: '47'},
  {text: '48', filename: '48'},
  {text: '49', filename: '49'},

  {text: '50', filename: '50'},
  {text: '51', filename: '51'},
  {text: '52', filename: '52'},
  {text: '53', filename: '53'},
  {text: '54', filename: '54'},
  {text: '55', filename: '55'},
  {text: '56', filename: '56'},
  {text: '57', filename: '57'},
  {text: '58', filename: '58'},
  {text: '59', filename: '59'},

  {text: '60', filename: '60'},
  {text: '61', filename: '61'},
  {text: '62', filename: '62'},
  {text: '63', filename: '63'},
  {text: '64', filename: '64'},
  {text: '65', filename: '65'},
  {text: '66', filename: '66'},
  {text: '67', filename: '67'},
  {text: '68', filename: '68'},
  {text: '69', filename: '69'},

  {text: '70', filename: '70'},
  {text: '71', filename: '71'},
  {text: '72', filename: '72'},
  {text: '73', filename: '73'},
  {text: '74', filename: '74'},
  {text: '75', filename: '75'},
  {text: '76', filename: '76'},
  {text: '77', filename: '77'},
  {text: '78', filename: '78'},
  {text: '79', filename: '79'},

  {text: '80', filename: '80'},
  {text: '81', filename: '81'},
  {text: '82', filename: '82'},
  {text: '83', filename: '83'},
  {text: '84', filename: '84'},
  {text: '85', filename: '85'},
  {text: '86', filename: '86'},
  {text: '87', filename: '87'},
  {text: '88', filename: '88'},
  {text: '89', filename: '89'},
  {text: '90', filename: '90'},

].forEach((value) => {
  quickStart(value.text, value.filename);
});



