import {resultsToData} from './map-charter'

test('foo', () => {
    const vttResult1 = {filename: 'file1', map: new Map(Object.entries({person1: 5, person2: 20, person3: 25}))}
    const vttResult2 = {filename: 'file2', map: new Map(Object.entries({person2: 15, person4: 10}))}
    const result = resultsToData([vttResult1, vttResult2], {individualMeetings: true})
    expect(Object.keys(result)).toEqual(['datasets', 'labels'])
    expect(result.datasets.length).toEqual(4)
    const dataset1 = result.datasets[0]
    const expectedDatasetKeys = ['label', 'data', 'backgroundColor']
    expect(result.labels).toEqual(['person2', 'person3', 'person4', 'person1'])
    expect(Object.keys(dataset1)).toEqual(expectedDatasetKeys)
    expect(dataset1.data).toEqual([40, 50, undefined, 10])
    expect(dataset1.label).toEqual('file1')
    const dataset2 = result.datasets[1]
    expect(Object.keys(dataset2)).toEqual(expectedDatasetKeys)
    expect(dataset2.data).toEqual([60, undefined, 40, undefined])
    expect(dataset2.label).toEqual('file2')
    const dataset3 = result.datasets[2]
    expect(Object.keys(dataset3)).toEqual(expectedDatasetKeys)
    expect(dataset3.data).toEqual([50, 25, 20, 5])
    expect(dataset3.label).toEqual('Average Across All')
})