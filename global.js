//import { PromizeCanvas } from "./promizeCanvas.jsx";
//require('./promizeCanvas.jsx');
var promizeInfo = {};
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.thumbImages = React.createRef();
        this.cloud = React.createRef();
        this.tabs = React.createRef();
        this.promizeInfo = {};
        this.state = {
            promizeCloudURL: 'https://live.productimize.com/promizenode/',
            promizeCloudParams: {
                "domainurl": "productimize-demo-store.mybigcommerce.com",
                "license": "cfc66ae7606245645dcaa62bdb2677a2c13e1b55",
                "id": 115
            }
        };
    }

    componentWillMount() {
        console.time('Api')
        $.ajax({
            method: "POST",
            url: this.state.promizeCloudURL + 'customproductdetailtest',
            data: this.state.promizeCloudParams,
        }).then((data) => {
            console.timeEnd('Api')
            console.time('Api')
            //console.log(data);
            promizeInfo = data;
            console.timeEnd('Api')
        })
    }
    
    render() {
        console.log(this.promizeInfo)
        return (
            <div className="Promize-container">
                <PromizeCanvas promizeInfo={this.promizeInfo}></PromizeCanvas>
                <Customizer promizeSections={this.promizeInfo.pps} promizeTabs={this.promizeInfo.ppt}></Customizer>
            </div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));


