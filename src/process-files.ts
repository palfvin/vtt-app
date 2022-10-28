import {processVtt} from './vtt-processor'
import {resultsToData} from './map-charter'
import Chart from 'chart.js/auto';

export type VttFile = {filename: string, contents: string}

const readUploadedFileAsText: (inputFile: File) => Promise<VttFile> = (inputFile: File) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve({filename: inputFile.name, contents: temporaryFileReader.result as string});
        };
        temporaryFileReader.readAsText(inputFile);
    });
};
export type ProcessFilesOptions = {individualMeetings: boolean}
export const processFiles = async (files: FileList, processFilesOptions: ProcessFilesOptions) => {
    const resultPromises = Array.from(files).map(file => readUploadedFileAsText(file))
    const results = await Promise.all(resultPromises)
    const maps = results.map(processVtt)
    const data = resultsToData(maps, processFilesOptions)
    const ctx = (document.getElementById('myChart')! as HTMLCanvasElement).getContext('2d')!
    new Chart(ctx, {
        type: 'bar',
        data: data
    });

}