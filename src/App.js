import React from 'react'
import { NodeEditor } from 'flume'
import {config} from './config'

const App = () => {
  const nodeEditor = React.useRef();
  const [nodes, setNodes] = React.useState({})
  const [conf,setConf] = React.useState(config);
  const saveNodes = () => {
    const nodes = nodeEditor.current.getNodes()
  }
  const loadNodes = () => {
    const nodes = nodeEditor.current.getNodes()
    var desc = document.querySelector('#loader').value;
    setNodes( desc? JSON.parse(desc):{})
  }

  return (
    <div>
      <button onClick={saveNodes}>Save Logic</button>
      <button onClick={loadNodes}>Load Logic</button>
      <input type='text' id='loader' name='nodosacargar'/>

      <div style={{width: 800, height: 600}}>
        <NodeEditor
          ref={nodeEditor}
          portTypes={conf.configurations['backend'].portTypes}
          nodeTypes={conf.configurations['backend'].nodeTypes}
          nodes={nodes}
        />
      </div>
    </div>
  )
}
export default App;
