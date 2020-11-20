import { saveAs } from 'file-saver';
export function WriteToFile(key, propValues, filename) {
var blob = new Blob([`{${key}: ${propValues}}`], {type: "text/plain;charset=utf-8"});
saveAs(blob, `${filename ? filename : 'custom'}.txt`);
}
