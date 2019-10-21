class Promizeimage extends React.Component {
    constructor(props) {
        super(props);
        // this.promizeImageArea = this.promizeImageArea.bind(this);
        // this.promizeImageDuplicate = this.promizeImageDuplicate.bind(this);
    }

    promizeDisplayImages() {
        return <ul className="promize-image-tab">
            <li>
                <div className="image-align">
                    <img src="" />
                </div>
            </li>
            <li>
                <div className="promize-custom-radio">
                    <input type="radio" id="test1" name="radio-group" checked="" />
                    <label htmlFor="test1 image">Streamer Print area</label>
                </div>
                <div className="align"><button className="remove">Center</button></div>
            </li>
            <li>
                <div className="tool">
                    <div className="promize-custom-radio">
                        <input type="radio" id="test1" name="radio-group" checked="" />
                        <label htmlFor="test1 image">Button Print area</label>
                    </div>
                    <button className="Duplicate">
                        <i className="fas fa-wrench"></i> More tools</button>

                </div>
            </li>
            <li>
                <div className="dupli-rem">
                    <button className="Duplicate" onClick={(e) => { e.preventDefault(), this.promizeImageDuplicate() }}><i className="far fa-copy"></i>Duplicate</button>
                    <button className="remove"><i className="far fa-trash-alt"></i>Remove</button>
                </div>
            </li>
        </ul>;
    }
    promizeImageArea() {
        return <div className="upload-section">
            <ul>
                <li><Promizeclipart /></li>
                <li><div><p>or</p></div></li>
                <li><Promizeuploadimage promizeUpload={this.props.promizeUpload} /></li>
                <li class="promize-art"><div><i className="fas fa-info-circle"></i><span>Art guidelines</span></div></li>
            </ul>
        </div>
    }

    render() {
        return (
            <React.Fragment>
                {/* {this.promizeDisplayImages()} */}
                {this.promizeImageArea()}
            </React.Fragment>
        );
    }
}
