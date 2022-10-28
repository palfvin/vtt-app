import randomColor from 'randomcolor'
import {VttMap, VttResult} from './vtt-processor'
import _ from 'lodash'
import {ProcessFilesOptions} from './process-files'

function mapToPercentagesWithNormalizedName(map: VttMap): Map<string, number> {
    const normalizedNames = new Map([
        ['Mike B', 'Michael Barinek'],
    ['alpha', 'Alpha Chen'],
    ['Alpha', 'Alpha Chen'],
    ['Joe moore', 'Joe Moore']])
    const normalizeName = (name: string) => normalizedNames.get(name) || name
    const keys = Array.from(map.keys())
    const values = Array.from(map.values())
    const sum = values.reduce((a, b) => a + b)
    const percentages = values.map(a => Math.round(a / sum * 100))
    return new Map(percentages.map((percentage, index) => [normalizeName(keys[index]), percentage]))
}

export const resultsToData = (vttResults: Array<VttResult>, processFilesOptions: ProcessFilesOptions) => {
    const percentages: Array<Map<string, number>> = vttResults.map(result => mapToPercentagesWithNormalizedName(result.map))
    const uniqueKeys: Array<string> = _.uniq(percentages.map(m => Array.from(m.keys())).flat())
    const sumOfPercentages: Array<[string, number]> = uniqueKeys.map(key => [key, _.sum(percentages.map(m => m.get(key) || 0))])
    const totalSessions: Array<[string, number]> = uniqueKeys.map(key => [key, percentages.map(m => m.get(key)).filter(p => p !== undefined).length])
    const sortedUniqueKeys = sumOfPercentages.sort((a, b) => a[1] < b[1] ? 1 : -1).map(p => p[0])
    const backgroundColors = randomColor({count: vttResults.length+1, hue: 'random'})
    const datasets =  vttResults.map((vttResult, index) => {
        const label = vttResult.filename
        const backgroundColor = backgroundColors[index]
        const data = sortedUniqueKeys.map(key => percentages[index].get(key))
        return {label, data, backgroundColor}
    })
    const averageBasedOnAllSessions = [{
        label: 'Average Across All',
        data: sortedUniqueKeys.map(k => sumOfPercentages.find(pair => pair[0] === k)![1]/vttResults.length),
        backgroundColor: '#888888'
    }]
    const averageBasedOnSessionsParticipatedIn = [{
        label: 'Average When Present',
        data: sortedUniqueKeys.map(k => sumOfPercentages.find(pair => pair[0] === k)![1] / new Map(totalSessions).get(k)!),
        backgroundColor: '#000000'
    }]
    const base = processFilesOptions.individualMeetings ? datasets : []
    const avgAll = vttResults.length > 1 ? averageBasedOnAllSessions : []
    const avgPart = vttResults.length > 1 ? averageBasedOnSessionsParticipatedIn : []
    const allDataSets = base.concat(avgAll).concat(avgPart)
    return ({
        datasets: allDataSets,
        labels: sortedUniqueKeys
    })
}