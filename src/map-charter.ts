import randomColor from 'randomcolor'

export const mapToDataset = (vttMap: Map<string, number>) => {
    const entries = new Map(Array.from(vttMap.entries()).sort((a, b) => a[1] < b[1] ? 1 : -1))
    const values = Array.from(entries.values())
    const sum = values.reduce((a, b) => a + b)
    const percentages = values.map(a => Math.round(a / sum * 100))
    return ({
        datasets: [{label: 'Speaking Percentage', data: percentages, backgroundColor: randomColor({count: vttMap.size, hue: 'random'})}],
        labels: Array.from(entries.keys())
    })
}