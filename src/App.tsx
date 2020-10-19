import React, {useState} from 'react'
import {ToggleButton} from '@material-ui/lab'
import './App.css'
import {processFiles} from './process-files'

function App() {
    const [individualMeetings, setIndividualMeetings] = useState(true)
    const [files, setFiles] = useState<FileList | null>(null)
    const onChange = (event: any) => {
        const files = (event.target as HTMLInputElement).files!
        setFiles(files)
    }

    if (files !== null) processFiles(files, {individualMeetings})

    return (
        <div className="App">
            <header className="App-header">
                VTT File Processor
            </header>
            {(files === null || files.length < 2) ? null : <div>
                <ToggleButton
                    value="check"
                    selected={individualMeetings}
                    onChange={() => {
                        setIndividualMeetings(!individualMeetings);
                    }}
                >
                    Individual Meetings
                </ToggleButton>
            </div>}
            <canvas id="myChart"></canvas>
            <form>
                <label htmlFor="vttFile" style={{paddingRight: '15px'}}>Select .vtt file(s)</label>
                <input type="file" id="vttFile" name="vttFile" onChange={onChange} multiple></input>
            </form>
        </div>
    )
}

export default App
