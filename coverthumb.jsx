class CoverThumb extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            coverViews : {},
         };
        this.createThumb = this.createThumb.bind(this);
        this.updateThumb = this.updateThumb.bind(this);
    }   
    componentDidMount(){
        this.updateThumb();
    }  
    updateThumb(){
        var cover =  this.props.coverViews;
        if(cover){
            Object.keys(cover).map((option, index)=>{
                var canvasside = new fabric.StaticCanvas('thumbviewimageside_'+(index+1));
                var viewSide = (index+1);
                this.props.setBaseImage(canvasside, viewSide);
                this.props.cloud.current.promizeCanvasImage(this.props.defaultOptions, viewSide, this.props.scaleValue, canvasside)
            })
        }
    }

    createThumb(){
        var cover =  this.props.coverViews;
        return Object.keys(cover).map((item, index)=>{
            return <li key={index} className={(this.props.currentView == (index+1)) ?  'liside_'+(index+1)+' selected' : 'liside_'+(index+1)} onClick={(e) =>{e.preventDefault(), this.props.changeView((index+1), '')}}>
                <canvas id={'thumbviewimageside_'+(index+1)} className="img-responsive"></canvas>
            </li>
        })

    }
   
    render(){
        var coverViews =  this.props.coverViews;
        return (
            <ul>
                { Object.keys(coverViews).length > 0 && this.createThumb()}
            </ul>
        );
    }
}
