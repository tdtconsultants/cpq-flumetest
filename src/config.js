import { FlumeConfig, Colors, Controls } from 'flume'

const config = {

    portTypes: {'shared':[
      {type: "json", name: "json", label: "Json", colors: Colors.purple,
        controls: [ Controls.text({ name: "string", label: "Json" })]},
      {type: "string", name: "string", label: "Text", color: Colors.green,
        controls: [ Controls.text({ name: "string", label: "Text" })]},

      {type: "binary", name: "binary", label: "PDF", color: Colors.red,
        controls: [ Controls.checkbox({ name: "boolean", label: "True/False" })]},
      {type: "boolean", name: "boolean", label: "True/False", color: Colors.blue,
        controls: [ Controls.checkbox({ name: "boolean", label: "True/False" })]},

      {type: "number", name: "number", label: "Number", color: Colors.red,
        controls: [ Controls.number({ name: "number", label: "Number" })]},
    ],
    'backend':[],
    'frontend':[]
    },

    nodeTypes: {
                'backend':[
                    {type: "string",label: "Text",description: "Outputs a string of text",
                    inputs: ports => [ports.string({name: 'teststring','label':'testingstringinput'})], outputs: ports => [ports.string({name: 'testoutputstring','label':'testingoutput'})]},
                    
                    {type: "boolean", label: "True/False", 
                    description: "Outputs a true/false value", initialWidth: 140, 
                    inputs: ports => [ports.boolean({name: 'test','label':'testing'})],outputs: ports => [ports.boolean({name: 'test2','label':'testing2'})]},
                    { type: "start",label: "Start Node", initialWidth: 170, 
                    outputs: ports => [ports.json({name: "config",label: "Configuration"})]},
                    { type: "sendmail",label: "Send Email", initialWidth: 170, 
                    inputs: ports => [ports.string({name: 'html','label':'Email message'}),ports.binary({'name':'attachment','label':'Attachment'}),ports.string({name:'sendto','label':'A list of people who will receive the email'})],outputs: ports => [ports.string({name: "confirmation",label: "OK?"})]},
                    { type: "nunchuks",label: "Template Node", initialWidth: 170, 
                    inputs: ports => [ports.json({name: 'config','label':'Configuration'})],outputs: ports => [ports.string({name: "html",label: "HTML"})]},
                    { type: "print",label: "Print Node", initialWidth: 170, 
                    inputs: ports => [ports.string({name: 'html','label':'HTML'})],outputs: ports => [ports.binary({name: "pdfoutput",label: "PDF Output"})]}
                ],
                'frontend':[]
    },
    rootNodeTypes: {
                'startRoot':{ type: "start",label: "Start Node", initialWidth: 170, 
                outputs: ports => [ports.json({name: "config",label: "Configuration"})]}
    },

    init: function(){
        this.configurations={};
        //config._initConfig('frontendConfig',[this.portTypes['shared']],[this.nodeTypes['frontend']]);
        config._initConfig('backend',[this.portTypes['shared']],[this.nodeTypes['backend']]);
    },
    _initConfig: function(configName,portGroups,nodeGroups,rootNode){
        var config = new FlumeConfig()
        this.configurations[configName] = config
        for(let pg in portGroups){
            for (let port in portGroups[pg]){
                config.addPortType(portGroups[pg][port])
            }

        }
        for(let ng in nodeGroups){
            for (let node in nodeGroups[ng]){
                config.addNodeType(nodeGroups[ng][node]);

            }

        }
        //config.addRootNodeType()
    }

}

config.init();

export {config};
