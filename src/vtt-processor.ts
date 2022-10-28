import Moment from 'moment'
import {VttFile} from './process-files'

export type VttMap = Map<string, number>
export type VttResult = {filename: string, map: VttMap}

export const processVtt = (vttFile: VttFile): VttResult => {
    const lines = vttFile.contents.split("\n")
    const result: VttMap = new Map()
    var i,chunk = 4;
    for (i=3; i<lines.length; i+=chunk) {
        const timeRange= lines[i]
        const speakerTranscript = lines[i+1]
        const [start, end] = timeRange.match(/(\d\d:\d\d:\d\d)\.\d{3} --> (\d\d:\d\d:\d\d)\.\d{3}/)!.slice(1,3)
        const startTime = Moment(start, 'HH:mm:ss')
        const endTime = Moment(end, 'HH:mm:ss')
        const duration = endTime.diff(startTime, 'seconds')
        const speakerMatches = speakerTranscript.match(/^(.*?):/)
        if (speakerMatches == null) continue
        const speaker: string = speakerMatches[1]
        const currentTimeTotal = result.get(speaker) || 0
        result.set(speaker, currentTimeTotal + duration)
    }
    return {filename: vttFile.filename, map: result}
}
