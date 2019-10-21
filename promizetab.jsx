class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: {}
        };
        this.optionClick = this.optionClick.bind(this);
    }
    optionClick() {
        alert('ff test')
    }
    render() {
        var promizeTabs = this.props.promizeTabs;
        var promizeOption = this.props.promizeOption;
        var promizeText = this.props.promizeText;
        var promizeUploadImage = this.props.promizeUploadImage;
        //console.log(promizeTabs.tab_name, ',', promizeOption);
        var tabClass = '';
        if (this.props.defaultSection == promizeTabs.section_id) {
            if (promizeTabs.parent_ids) {
                tabClass += 'promize-nobottom ';
            }
            tabClass += 'active';
        }
        //console.time('aaa');
        var tabPromizeOptions = promizeOption.filter(function (pOpt) {
            return pOpt.tab_id == promizeTabs.tab_id
        });

        // console.timeEnd('aaa');
        // console.log(Object.keys(tabPromizeOptions).length)


        //promizeOption.filter(pOpt) {} { return pOpt.tab_id == promizeTabs.tab_id }
        return (
            <div className={tabClass}>
                {((promizeTabs.display_setting == 1) || promizeTabs.display_setting == 3) &&
                    <React.Fragment>
                        {(!promizeTabs.parent_ids) && <div className="promize-tab-section-title" >
                            <h4>{promizeTabs.tab_name} <i className="fa fa-question-circle"></i></h4>
                        </div>}
                        {(promizeTabs.display_setting == 1) &&
                            <div className="promize-tab-section-content"><Promizeoption imagePath={this.props.imagePath} promizeTabs={promizeTabs} promizeOption={promizeOption} changeDefaultSetting={this.props.changeDefaultSetting} /></div>}
                        {(promizeTabs.display_setting == 3) &&
                            <div className="promize-tab-image-content"><Promizeimage promizeTabs={promizeTabs} imagePath={this.props.imagePath} promizeUploadImage={promizeUploadImage} promizeUpload={this.props.promizeUpload} /></div>}

                    </React.Fragment>}

                {(promizeTabs.display_setting == 2) && <Promizetext imagePath={this.props.imagePath} promizeTabs={promizeTabs} promizeText={promizeText} changeCanvas={this.props.changeCanvas} />

                    // <React.Fragment>{this.promizeTextOptions(parentItem, '')}</React.Fragment> 

                }
            </div>
        );
    }
}
