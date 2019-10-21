class Promizecustomizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultSection: ''
        };
        this.promizeCustomizerDetail = this.promizeCustomizerDetail.bind(this);
        this.promizeDefaultSection = this.promizeDefaultSection.bind(this);
        //this.changeCanvas = this.changeCanvas.bind(this);
    }




    promizeDefaultSection(sectionId) {
        var promizeDeta = this.props.promizeDetail;
        promizeDeta['defaultSection'] = sectionId;
        this.setState({ defaultSection: sectionId })
    }

    promizeCustomizerDetail() {
        var sectionRow = '';
        var tabRow = '';
        if (this.props.promizeDetail['section']) {
            sectionRow = this.props.promizeDetail['section'].map((section, index) => {
                if ((this.state.defaultSection == '') && (index == 0)) {
                    this.state.defaultSection = section.product_section_id;
                }
                return <Sections {...this.state} promizeDefaultSection={this.promizeDefaultSection} key={index} index={index + 1} sectionData={section} />;
            });
        }
        if (this.props.promizeDetail['tab']) {
            var imagePath = this.props.promizeDetail['promizeBaseImgURL']
            var optionDetail = this.props.promizeDetail['option'];
            var textDetail = this.props.promizeDetail['text'];
            var imageDetail = this.props.promizeDetail['uploadimage'];

            tabRow = this.props.promizeDetail['tab'].map((tab, index, sectionsData) => {
                var tabdisplay = this.applytabrules(tab);
                if (tab.tab_id && tabdisplay == 1) {
                    return <Tabs key={index} index={index + 1} {...this.state} promizeTabs={tab} promizeOption={optionDetail} promizeText={textDetail} imagePath={imagePath} promizeUploadImage={imageDetail} changeCanvas={this.props.changeCanvas} changeDefaultSetting={this.props.changeDefaultSetting} promizeUpload={this.props.promizeUpload} />;
                }
            });
        }
        return (
            <div className="promize-customize-container">
                <div className="promize-product-title">
                    <h3>Custom Ribbon 2x4</h3>
                </div>
                <div className="promize-tabs">
                    <div className="promize-tab-header">
                        <ul className="promize-tab-list">
                            {sectionRow}
                        </ul>
                    </div>
                    <div className="promize-tab-body">
                        {tabRow}
                    </div>
                </div>
            </div>
        );
    }

    applytabrules(tab) {
        if (tab && tab.tab_code && tab.tab_code.includes('awardtext') && this.props.includeawardtitle != 1) {
            return 0;
        } else {
            return 1;
        }
    }
    render() {
        return (
            <React.Fragment>{this.promizeCustomizerDetail()}</React.Fragment>
        );

    }
}
