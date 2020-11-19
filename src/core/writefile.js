import { saveAs } from 'file-saver';
export function WriteToFile(key, propValues) {
var blob = new Blob([`{${key}: ${propValues}}`], {type: "text/plain;charset=utf-8"});
saveAs(blob, "Prefs.txt");
}
