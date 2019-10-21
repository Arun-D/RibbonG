class Promizetext extends React.Component {
    constructor(props) {
        super(props);
        this.addAwadTitle;
        console.log(this.props);
        this.state = {
            tabboundary: {},
            tabChange: '',
            duplicateTextSection: {}

        };
        this.createText = this.createText.bind(this);
        this.promizeTextArea = this.promizeTextArea.bind(this);
        this.createDuplicateTextArea = this.createDuplicateTextArea.bind(this);
        this.textTabDetails = this.textTabDetails.bind(this);
    }

    componentDidUpdate() {
        if (this.state.tabboundary[this.state.tabChange] && this.state.tabboundary[this.state.tabChange]['text']) {
            this.props.changeCanvas('text', this.state.tabboundary[this.state.tabChange], this.state.tabboundary[this.state.tabChange]['tabData'])
        }
    }

    promizeTextChange(text, tab_id, objProp) {
        var textBoundary = this.state.tabboundary;
        if (objProp == 'fontWeight') {
            var style = (textBoundary[tab_id]['prevfontWeight'] === "normal") ? "bold" : "normal"
            textBoundary[tab_id]['prevfontWeight'] = style;
            text = style;
        }
        if (objProp == 'underline') {
            var style = (textBoundary[tab_id]['prevunderline'] === false) ? true : false
            textBoundary[tab_id]['prevunderline'] = style;
            text = style;
        }
        if (objProp == 'fontStyle') {
            var style = (textBoundary[tab_id]['prevfontStyle'] === "normal") ? "italic" : "normal"
            textBoundary[tab_id]['prevfontStyle'] = style;
            text = style;
        }
        textBoundary[tab_id][objProp] = text;
        this.setState({ 'tabChange': tab_id })
        this.setState({ tabboundary: textBoundary })
    }

    promizeChangeTextDetail(tab_id, textVal) {
        var textBoundary = this.state.tabboundary;
        textBoundary[tab_id]['textDetail'] = textVal;
        this.setState({ tabboundary: textBoundary })
        this.setState({ 'tabChange': tab_id })
    }

    createText() {
        // var tabData = this.props.promizeTabs;
        // var tab_id = tabData.tab_id;
        // var textClass = 'promize-tab-text-content tab-item-hori';
        // if (tabData.tab_code && tabData.tab_code.includes('customtext')) {
        //     textClass = 'promize-tab-text-content tab-item-hori3';
        // }

        // this.addAwadTitle = <div className="tab-section">
        //     {(tabData) && <div className="promize-tab-section-title promize-text-title tab-choice-hori"><h4>{tabData.tab_name} <i className="fa fa-question-circle"></i>
        //     </h4>
        //         <ul className="tab-choice">{this.promizeTextArea(tabData)}</ul>
        //     </div>}
        //     <div className={textClass}>
        //         <div className="tab-item-text">
        //             <textarea rows="5" cols="20" maxLength="60" id={tab_id} onChange={(e) => { e.preventDefault(), this.promizeTextChange(e.target.value, tab_id, 'text') }} textno="2" placeholder="Enter your Text here..."  ></textarea>
        //         </div>
        //         {(tabData.tab_code && tabData.tab_code.includes('awardtext')) &&
        //             <div className="tab-item-list">
        //                 <ul className="tab-choice mb-30">
        //                     <li className="custom-dropdown"><label>Font</label>
        //                         <select className="ml-20 fntwd" onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontFamily') }}>
        //                             <option >Select</option>
        //                             <option value="Times">Times</option>
        //                             <option value="Arial">Arial</option>
        //                             <option value="Verdana">Verdana</option>
        //                             <option value="Comic Sans MS">Comic Sans MS</option>

        //                         </select></li>
        //                 </ul>
        //                 <ul className="tab-choice">
        //                     <li className="custom-dropdown"><label>Size</label><select className="ml-30" onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontSize') }}>
        //                         <option >Select</option>
        //                         <option value="16">Small</option>
        //                         <option value="20">Medium</option>
        //                         <option value="24">Large</option>
        //                     </select></li>
        //                 </ul>
        //             </div>}
        //         {(tabData.tab_code && tabData.tab_code.includes('customtext')) &&
        //             <div className="tab-item-list">
        //                 <ul className="tab-choice mb-30">
        //                     <li className="custom-dropdown"><label className="pr-15">Font</label><select className="fntwd" onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontFamily') }}>
        //                         <option>Select</option>
        //                         <option value="Times">Times</option>
        //                         <option value="Arial">Arial</option>
        //                         <option value="Verdana">Verdana</option>
        //                         <option value="Comic Sans MS">Comic Sans MS</option>
        //                     </select></li>
        //                     <li className="ml-30">
        //                         <button className="bold" onClick={(e) => { e.preventDefault(), this.promizeTextChange('bold', tab_id, 'fontWeight') }}><i className="fas fa-bold"></i></button>
        //                         <button className="italics" onClick={(e) => { e.preventDefault(), this.promizeTextChange('italic', tab_id, 'fontStyle') }}><i className="fas fa-italic"></i></button>
        //                         <button className="underline" onClick={(e) => { e.preventDefault(), this.promizeTextChange(true, tab_id, 'underline') }}><i className="fas fa-underline"></i></button>
        //                     </li>
        //                 </ul>
        //                 <ul className="tab-choice">
        //                     <li className="custom-dropdown"><label className="pr-15">Size</label>
        //                         <select onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontSize') }}>
        //                             <option>Select</option>
        //                             <option value="16">16</option>
        //                             <option value="18">18</option>
        //                             <option value="20">20</option>
        //                             <option value="22">22</option>
        //                             <option value="24">24</option>
        //                         </select>
        //                     </li>
        //                     <li className="ml-30"><button className="Duplicate">
        //                         <i className="fas fa-wrench"></i> More tools
        //                 </button></li>
        //                 </ul>
        //             </div>}
        //     </div>

        // </div>;

        var duplicateTextSection = this.state.duplicateTextSection;
        var firstTextDiv = this.textTabDetails(0);
        return (
            <div>{firstTextDiv}
                {
                    Object.keys(duplicateTextSection).map(function (key) {
                        return duplicateTextSection[key];
                    })
                }
                <div className="add-text">
                    <button className="Duplicate" onClick={this.createDuplicateTextArea} >Duplicate</button>
                </div>
            </div>
        );
    }

    createDuplicateTextArea() {
        var duplicateTextSection = this.state.duplicateTextSection;
        var divLength = Object.keys(duplicateTextSection).length;
        var text_tab_id = divLength + 1;
        duplicateTextSection[divLength] = this.textTabDetails(text_tab_id);
        this.setState({ 'duplicateTextSection': duplicateTextSection });
        var tabboundaryDetails = this.state.tabboundary;
        var tabBoundaryLength = Object.keys(this.state.tabboundary).length;
        Object.keys(tabboundaryDetails).map(function (key) {
            tabboundaryDetails[tabBoundaryLength] = tabboundaryDetails[key];
        })
        this.setState({ 'tabboundary': tabboundaryDetails });
    }

    textTabDetails(text_tab_id = 0) {
        var tabData = this.props.promizeTabs;
        var tab_id = tabData.tab_id + '_' + text_tab_id;
        var textClass = 'promize-tab-text-content tab-item-hori';
        if (tabData.tab_code && tabData.tab_code.includes('customtext')) {
            textClass = 'promize-tab-text-content tab-item-hori3';
        }
        var textDetails = <div className="tab-section">
            {(tabData) && <div className="promize-tab-section-title promize-text-title tab-choice-hori"><h4>{tabData.tab_name} <i className="fa fa-question-circle"></i>
            </h4>
                <ul className="tab-choice">{this.promizeTextArea(tabData, tab_id)}</ul>
            </div>}
            <div className={textClass}>
                <div className="tab-item-text">
                    <textarea rows="5" cols="20" maxLength="60" id={tab_id} onChange={(e) => { e.preventDefault(), this.promizeTextChange(e.target.value, tab_id, 'text') }} textno="2" placeholder="Enter your Text here..."  ></textarea>
                </div>
                {(tabData.tab_code && tabData.tab_code.includes('awardtext')) &&
                    <div className="tab-item-list">
                        <ul className="tab-choice mb-30">
                            <li className="custom-dropdown"><label>Font</label>
                                <select className="ml-20 fntwd" onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontFamily') }}>
                                    <option >Select</option>
                                    <option value="Times">Times</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Comic Sans MS">Comic Sans MS</option>
                                </select></li>
                        </ul>
                        <ul className="tab-choice">
                            <li className="custom-dropdown"><label>Size</label><select className="ml-30" onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontSize') }}>
                                <option >Select</option>
                                <option value="16">Small</option>
                                <option value="20">Medium</option>
                                <option value="24">Large</option>
                            </select></li>
                        </ul>
                    </div>}
                {(tabData.tab_code && tabData.tab_code.includes('customtext')) &&
                    <div className="tab-item-list">
                        <ul className="tab-choice mb-30">
                            <li className="custom-dropdown"><label className="pr-15">Font</label><select className="fntwd" onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontFamily') }}>
                                <option>Select</option>
                                <option value="Times">Times</option>
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                            </select></li>
                            <li className="ml-30">
                                <button className="bold" onClick={(e) => { e.preventDefault(), this.promizeTextChange('bold', tab_id, 'fontWeight') }}><i className="fas fa-bold"></i></button>
                                <button className="italics" onClick={(e) => { e.preventDefault(), this.promizeTextChange('italic', tab_id, 'fontStyle') }}><i className="fas fa-italic"></i></button>
                                <button className="underline" onClick={(e) => { e.preventDefault(), this.promizeTextChange(true, tab_id, 'underline') }}><i className="fas fa-underline"></i></button>
                            </li>
                        </ul>
                        <ul className="tab-choice">
                            <li className="custom-dropdown"><label className="pr-15">Size</label>
                                <select onChange={(e) => { e.preventDefault(), this.promizeTextChange(event.target.value, tab_id, 'fontSize') }}>
                                    <option>Select</option>
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                    <option value="20">20</option>
                                    <option value="22">22</option>
                                    <option value="24">24</option>
                                </select>
                            </li>
                            <li className="ml-30"><button className="Duplicate">
                                <i className="fas fa-wrench"></i> More tools
                    </button></li>
                        </ul>
                    </div>}
            </div>
        </div>;
        return textDetails;
    }
    promizeTextArea(tabData, tab_id) {
        var tab_id = tab_id;
        const text = this.props.promizeText;
        let optionRows;
        let { mapFontFamilies } = this.state
        let { textContent } = this.props;
        var tabloop = 1;
        optionRows = text.map((textVal, index) => {
            if (textVal.tab_id == tabData.tab_id) {
                if (!this.state.tabboundary[tab_id]) {
                    this.state.tabboundary[tab_id] = {};
                    this.state.tabboundary[tab_id]['text_tab_id'] = tab_id;
                    this.state.tabboundary[tab_id]['textDetail'] = textVal;
                    this.state.tabboundary[tab_id]['fill'] = '#000000';
                    this.state.tabboundary[tab_id]['fontFamily'] = 'Arial';
                    this.state.tabboundary[tab_id]['textAlign'] = 'center';
                    this.state.tabboundary[tab_id]['tabData'] = tabData;
                    this.state.tabboundary[tab_id]['fontSize'] = 15;
                    this.state.tabboundary[tab_id]['fontWeight'] = 'normal';
                    this.state.tabboundary[tab_id]['underline'] = false;
                    this.state.tabboundary[tab_id]['charSpacing'] = 1000;
                    this.state.tabboundary[tab_id]['lineHeight'] = 1.16;
                    this.state.tabboundary[tab_id]['fontStyle'] = 'normal';
                    this.state.tabboundary[tab_id]['prevfontWeight'] = 'normal';
                    this.state.tabboundary[tab_id]['prevunderline'] = false;
                    this.state.tabboundary[tab_id]['prevfontStyle'] = 'normal';
                    this.state.tabboundary[tab_id]['coordinates'] = true;
                    if (tabData.tab_code && tabData.tab_code.includes('awardtext')) {
                        this.state.tabboundary[tab_id]['coordinates'] = false;
                    }
                }
                var text_id = textVal.text_setting_id;
                var radioTabId = textVal.text_setting_id + '_' + tab_id;
                return <li key={index}><div className="promize-custom-radio"><input type="radio" id={radioTabId} name="radio-group" onChange={(e) => { this.promizeChangeTextDetail(tab_id, textVal) }} /> <label htmlFor={radioTabId}>{textVal.text_name}</label></div></li>
            }
        })
        return optionRows;
    }

    render() {
        return (
            <ul>
                {this.createText()}
            </ul>
        );
    }
}
