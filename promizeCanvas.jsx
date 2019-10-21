class PromizeCanvas extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     promizeCanvas: ''
        // }
        //this.setBaseImage = this.setBaseImage.bind(this);
    }


    render() {
        return (
            <div className="promize-canvas-container">
                <div className="promize-canvas">
                    <div className="canvas-container">
                        <canvas id="promize-preview-image" width="300" height="300"></canvas>
                    </div>
                    <div className="promize-canvas-action">
                        <button className="promize-btn-zoomin" onClick={(e) => { e.preventDefault(), this.props.promizeZoomingAction('zoomin') }}><i className="fa fa-search-plus"></i></button>
                        <button className="promize-btn-zoomout" onClick={(e) => { e.preventDefault(), this.props.promizeZoomingAction('zoomout') }}><i className="fa fa-search-minus"></i></button>
                        <button className="promize-btn-grid" onClick={(e) => { e.preventDefault(), this.props.showGrid() }}><i className="fa fa-border-all"></i></button>
                        <button className="promize-btn-ruler" onClick={(e) => { e.preventDefault(), this.props.showRuler() }}><i className="fa fa-ruler"></i></button>
                        <button className="promize-btn-printarea" onClick={(e) => { e.preventDefault(), this.props.showPrintArea() }}><i className="far fa-object-group"></i></button>
                    </div>
                </div>
                <p className="promize-text-note">
                    *Action ribbon colors will vary slightly from what is shown on screen. If color is critical, please
                    contact us for ribbon color samples.
                </p>
            </div>
        );
    }
}

