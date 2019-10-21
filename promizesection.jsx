class Sections extends React.Component {
    render() {
        return (
            <li className={(this.props.defaultSection == this.props.sectionData.product_section_id) ? "active" : ""}

                onClick={(e) => { e.preventDefault(), this.props.promizeDefaultSection(this.props.sectionData.product_section_id) }}

            ><span>{this.props.index}.</span> <span>{this.props.sectionData['section_name']}</span></li>
        );
    }
}