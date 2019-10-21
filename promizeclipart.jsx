class Promizeclipart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showclipart: 0,
            clipartDetails: {}
        };
        // this.promizeImageArea = this.promizeImageArea.bind(this);
        this.promizeDisplayClipart = this.promizeDisplayClipart.bind(this);
        this.clipartGet = this.clipartGet.bind(this);
        this.clipartList = this.clipartList.bind(this);
    }

    componentWillMount() {
        console.log(this.props.promizeTabs)

    }
    clipartGet() {

        var promizeCloudParams = {
            "domain_id": 563,
            "tabid": 9982,
            "prdid": 2621
        };

        var clipartData = {};
        clipartData[5353] = {}
        var postData = {
            tabid: 5353,
            prdid: 4,
            domainid: 639
        };
        $.ajax({
            method: "POST",
            url: "https://cloud.productimize.com/dcprocld/promize/getAllClipArtShrytImageList",
            data: postData
        }).then((data) => {
            // console.log('testing')
            clipartData[5353][1] = data;
            clipartData[5353][1]["boundaries"] = '';

            this.setState({ 'clipartDetails': clipartData })
        });





        // $.ajax({
        //     method: "POST",
        //     url: 'https://cloud.productimize.com/dcprocld/promize/getAllClipArtShrytImageList',
        //     data: promizeCloudParams,
        // }).then((data) => {
        //     console.log('testing')
        //     console.log(data);
        // })
        //this.setState({ 'clipartDetails': 1 })
    }

    clipartList() {
        // console.log('testtsetet')
        // console.log(this.state.clipartDetails)
        // return <li>test</li>;

        var tab_id = 5353;
        var currentView = 1;

        const tabClipart = this.state.clipartDetails;
        if (tabClipart != undefined) {
            if (Object.keys(tabClipart).length > 0) {
                let clipartRows;
                let backButton;
                const mapTabClipart = tabClipart[tab_id][currentView] && tabClipart[tab_id][currentView][1];
                const mapClipartOption = tabClipart[tab_id][currentView] && tabClipart[tab_id][currentView][0];
                const boundaries = tabClipart[tab_id][currentView] && tabClipart[tab_id][currentView]['boundaries'];
                clipartRows = <div className="clipart-wrapper">
                    <div className="productimze-clipart-search">
                        <input name="productimize_clipart_search" value={this.state.searchValue} className="productimize_clipart_search" type="text" placeholder="Search art..." onChange={(event) => this.searchClipart(event, tab, mapTabClipart, mapClipartOption, boundaries, key, canvasId)} />
                    </div>
                    <div className="sec-sb-ttl mt-10">Select a category</div>
                    <div className="mt-10 clipart-all-itm clip-art-wpr"><div className="clipart-category-name clip-back">
                        <ul>{mapTabClipart.map((tabData, index) => {
                            if (tabData.parent_id == 0) {
                                return <li key={index} className="parent-name it-sh" onClick={(e) => { e.preventDefault(), this.addChildClipart(tab, tabData, mapTabClipart, mapClipartOption, boundaries, key, canvasId) }}>
                                    <div>{tabData.clipart_category_name}</div>
                                </li>
                            }
                        })}
                        </ul></div></div></div>
                backButton = "";
                return clipartRows;
            }
        }

    }


    addChildClipart(tab, parentClipart, mapTabClipart, mapClipartOption, boundaries, key, canvasId) {
        let clipartRows;
        let backButton;
        clipartRows = <div className="clipart-wrapper">
            <div className="productimze-clipart-search">
                <input name="productimize_clipart_search" className="productimize_clipart_search" type="text" value={this.state.searchValue} placeholder="Search art..." onChange={(event) => this.searchClipart(event, tab, mapTabClipart, mapClipartOption, boundaries, key, canvasId)} />
            </div>
            <div className="sec-sb-ttl mt-10">Select a category</div>
            <div className="mt-10 clipart-all-itm clip-art-wpr"><div className="clipart-sub-category-name clip-back">
                <ul>{mapTabClipart.map((tabData, index) => {
                    if (tabData.parent_id == parentClipart.promize_domain_clipart_category_id) {
                        return <li key={index} className="parent-name it-sh" onClick={(e) => { e.preventDefault(), this.addClipartOptions(tab, tabData, mapTabClipart, mapClipartOption, boundaries, key, canvasId, parentClipart) }}>
                            <div>{tabData.clipart_category_name}</div>
                        </li>
                    }
                })}
                </ul></div></div></div>
        backButton = <div className="btn-back text-back" onClick={(e) => { e.preventDefault(), this.addParentClipart(tab, key, canvasId) }}></div>;
        this.setState({ clipartRows: clipartRows, backButton: backButton })
    }

    promizeDisplayClipart() {
        //var clipartDetail = '';
        //if (this.state.clipartDetails == '') {
        if (Object.keys(this.state.clipartDetails).length == 0) {
            this.clipartGet();
        }
        return <div className="image-sec">
            <div className="clipart-library">
                <div className="clipart-title text-center">
                    <h4>Clipart Library
                 <button className="close" onClick={(e) => { e.preventDefault(), this.setState({ showclipart: 0 }) }}><i className="fas fa-times"></i></button>
                    </h4>
                </div>
                <div className="sub-heading">All Catagories </div>
                <ul className="promize-clipartcategories">
                    {(this.state.clipartDetails != '') && this.clipartList()}
                    {/* <li className="">Sports</li>
                    <li className="">Season</li>
                    <li className="">Animals</li>
                    <li className="">Arts/Music</li>
                    <li className="">Season</li> */}
                </ul>
                <ul>
                    <li>
                        <div className="clipart-footer">
                            <div className="search-container">
                                <form action="/action_page.php">
                                    <input type="text" name="search" />
                                    <button type="submit" className="search">Search<i className="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div></li>
                </ul>

            </div>
        </div >
    }


    render() {
        return (
            <React.Fragment>
                {(this.state.showclipart == 1) && this.promizeDisplayClipart()}
                <div className="clipart" onClick={(e) => { e.preventDefault(), this.setState({ showclipart: 1 }) }}>
                    <i className="fas fa-image"></i>
                </div>
                <p className="clipart-text">Select clipart</p>
            </React.Fragment>
        );
    }
}
