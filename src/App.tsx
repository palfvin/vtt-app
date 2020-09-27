import React from 'react'
import './App.css'
import Chart from 'chart.js'
import {processVtt} from './vtt-processor'
import {mapToDataset} from './map-charter'

function App() {
    const onChange = (event: any) => {
        const file = (event.target as HTMLInputElement).files![0]
        const reader = new FileReader()
        reader.addEventListener('load', (event) => {
            let vttString = event.target!.result as String
            const resultMap = processVtt(vttString)
            const data = mapToDataset(resultMap)
            const ctx = (document.getElementById('myChart')! as HTMLCanvasElement).getContext('2d')!
            new Chart(ctx, {
                type: 'bar',
                data: data
            });
        })
        reader.readAsText(file)
    }

    return (
        <div className="App">
            <header className="App-header">
                VTT File Processor
            </header>
            <canvas id="myChart"></canvas>
            <input
                type='file'
                onChange={onChange}
            ></input>
        </div>
    )
}

export default App
