import {mapToDataset} from './map-charter'

test('foo', () => {
    const vttMap = new Map(Object.entries({person1: 10, person2: 20, person3: 30}))
    let result = mapToDataset(vttMap)
    expect(Object.keys(result)).toEqual(['datasets', 'labels'])
    expect(result.datasets.length).toEqual(1)
    expect(Object.keys(result.datasets[0])).toEqual(['label', 'data', 'backgroundColor'])
    expect(result.datasets[0].data).toEqual([50, 33, 17])
    expect(result.datasets[0].label).toEqual('Speaking Percentage')
    expect(result.datasets[0].backgroundColor.length).toEqual(3)
    expect(result.labels).toEqual(['person3', 'person2', 'person1'])
})