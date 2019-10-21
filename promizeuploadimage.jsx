class Promizeuploadimage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpload: 0,
            files: []
        };
        this.promizeDisplayUpload = this.promizeDisplayUpload.bind(this);
    }

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
    }

    handleDrop = (files) => {
        let fileList = this.state.files
        const reader = new FileReader();
        const image = new Image();
        for (var i = 0; i < files.length; i++) {
            console.log(files[i])
            if (!files[i].name) return
            fileList.push(files[i].name)
            reader.readAsDataURL(files[i]);

            reader.onload = (event) => {
                image.src = event.target.result;
                this.props.promizeUpload(image);
                console.log(image)
            };



        }
        this.setState({ files: fileList })
    }

    promizeDisplayUpload() {
        return <div className="image-sec">
            <div className="clipart-library dragndrop">
                <div className="clipart-title text-center">
                    <h4>Upload Image
                 <button className="close" onClick={(e) => { e.preventDefault(), this.setState({ showUpload: 0 }) }}><i className="fas fa-times"></i></button>
                    </h4>
                </div>
                <div className="sub-heading">Choose a file to upload </div>
                <ul>
                    <li>
                        <div>
                            <Promizeimagedragdrop handleDrop={this.handleDrop}>
                                <div className="drag-drop">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <p>Drag and Drop or <br />


                                        <label htmlFor="upload-photo" className="promize-browse">Browse</label>
                                        {/* <input type="file" name="photo" className="promize-upload-browse" id="upload-photo" /> */}


                                        your computer</p>
                                </div>
                            </Promizeimagedragdrop>
                        </div>
                    </li>
                </ul>
                <ul className="search-field">
                    <li><i class="fas fa-circle"></i>
                        Your image will automatically be<br />
                        converted to a single color
            </li>
                    <li><i class="fas fa-circle"></i>
                        Your image will automatically be<br />
                        converted to a single color
            </li>
                    <li><i class="fas fa-circle"></i>
                        Your image will automatically be<br />
                        converted to a single color
            </li>
                </ul>
            </div>
        </div>
    }

    render() {
        return (
            <React.Fragment>
                {(this.state.showUpload == 1) && this.promizeDisplayUpload()}
                <div className="upload" onClick={(e) => { e.preventDefault(), this.setState({ showUpload: 1 }) }}>
                    <i className="fas fa-cloud-upload-alt cust"></i>
                </div>
                <p className="upload-text" onClick={(e) => { e.preventDefault(), this.setState({ showUpload: 1 }) }}>Upload image</p>
            </React.Fragment>
        );
    }
}
