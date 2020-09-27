import Moment from 'moment'

export const processVtt = (contents: String): Map<string, number> => {
    const lines = contents.split("\n")
    const result = new Map<string, number>()
    var i,chunk = 4;
    for (i=3; i<lines.length; i+=chunk) {
        const timeRange= lines[i]
        const speakerTranscript = lines[i+1]
        const [_, start, end] = timeRange.match(/(\d\d:\d\d:\d\d)\.\d{3} --> (\d\d:\d\d:\d\d)\.\d{3}/)!
        const startTime = Moment(start, 'HH:mm:ss')
        const endTime = Moment(end, 'HH:mm:ss')
        const duration = endTime.diff(startTime, 'seconds')
        const speakerMatches = speakerTranscript.match(/^(.*):/)
        if (speakerMatches == null) continue
        const speaker: string = speakerMatches[1]
        const currentTimeTotal = result.get(speaker) || 0
        result.set(speaker, currentTimeTotal + duration)
    }
    return result
}
