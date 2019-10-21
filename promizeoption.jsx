class Promizeoption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: {},
            showpalette: ''
        };
    }
    componentWillMount() {
    }

    colorPalette(optionDetails, tabData) {


        let optionRow = '';
        optionRow = optionDetails.map((option, index) => {
            if (option.tab_id == tabData.tab_id) {
                var colorCode = 'color-palette-list ';
                let key = 'colorpal' + index;
                return <React.Fragment><li key={key} className={colorCode} onClick={(e) => { this.props.changeDefaultSetting(option, tabData) }} style={{ background: option.option_color }}></li></React.Fragment>
            }
        });
        return optionRow;
    }

    render() {
        var optionDetails = this.props.promizeOption;
        var optionRow = '';
        var tabData = this.props.promizeTabs;
        var domainPath = this.props.imagePath + 'thumbnailimage/';
        let input_type = tabData.input_type_settings && JSON.parse(tabData.input_type_settings);
        if (input_type && (parseInt(input_type.display) == 1)) {
            optionRow = optionDetails.map((option, index) => {
                if (option.tab_id == tabData.tab_id) {
                    if (option.tab_id == tabData.tab_id && input_type && (parseInt(input_type.display) == 1)) {
                        return <li key={index}><div className="promize-custom-radio">
                            <input type="radio" name={tabData.tab_name}
                                value={option.option_name} id={option.option_id}
                                onChange={(e) => { this.props.changeDefaultSetting(option, tabData) }} />

                            <label htmlFor={option.option_id}>{option.option_name}</label><span className="promize-option-descp">{option.option_description}</span></div>

                            {(option.option_thumbnail_image) && <img className="" src={domainPath + option.option_thumbnail_image} />}</li>
                    } else if (option.tab_id == tabData.tab_id && input_type && (parseInt(input_type.display) == 0)) {
                        return <li key={index}>
                            <div className="promize-custom-color" onClick={(e) => { this.props.changeDefaultSetting(option, tabData) }}>{option.option_name}</div>
                        </li>
                    }
                }
                //return option.option_name;
            });
        } else if ((tabData.tab_code && tabData.tab_code.includes('colorpicker') && input_type && (parseInt(input_type.display) == 0)) || (tabData.tab_code && tabData.tab_code.includes('textcolor') && input_type && (parseInt(input_type.display) == 0))) {
            var colorPalette = "color-palette " + this.state.showpalette;
            return <ul className="tab-item-list">
                <li key='optioncolorpicker'>
                    <div className="item-color-box">
                        <div className="item-color">
                            <span className="black"></span>
                        </div>
                        <button className="dropdown" onClick={(e) => { e.preventDefault, this.setState({ 'showpalette': (this.state.showpalette === "") ? "active" : "" }) }}> <i className="fas fa-sort-down"></i></button>
                        <label className="item-color-lbl">Black
                          </label>
                    </div>
                    <div className={colorPalette}>
                        <i className="fas fa-chevron-up" onClick={(e) => { e.preventDefault, this.setState({ 'showpalette': (this.state.showpalette === "") ? "active" : "" }) }}></i>
                        <ul>
                            {this.colorPalette(optionDetails, tabData)}
                        </ul>
                    </div>

                </li>
            </ul>
        }

        // var tab_id = tabData.tab_id;
        // var selectedOptions = this.props.selectedOptions;
        // const options = this.props.promize.ppo.values;
        // const tabRows = this.props.promize.ppt.values;
        // const selectedTab = this.props.selectedTab;
        // var domainPath = this.props.promizeBaseImgURL + 'thumbnailimage/';
        // let optionRows, noOptions = true;
        // let input_type = tabData.input_type_settings && JSON.parse(tabData.input_type_settings);
        // optionRows = options.map((option, index) => {
        //     if (option.tab_id == tab_id) {

        //         if(option.tab_id == tabData.tab_id && input_type && (parseInt(input_type.display) == 1)){
        //             noOptions = false;
        //             return <li key={index}><div className="promize-custom-radio">
        //             <input type="radio" name={tabData.tab_name} 
        //                            value={option.option_name} id={option.option_id}
        //                            onChange={(e) => { this.props.changeDefaultSetting(option, tabData) }} />                    

        //             <label htmlFor={option.option_id}>{option.option_name}</label><span className="promize-option-descp">{option.option_description}</span></div>

        //         {(option.option_thumbnail_image) && <img className="" src={domainPath + option.option_thumbnail_image} />}</li>
        //         }
        //     }
        // })




        return (
            <ul>
                {optionRow}
            </ul>
        );
    }
}
