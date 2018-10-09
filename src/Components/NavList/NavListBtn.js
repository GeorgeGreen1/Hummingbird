import React, {Component} from 'react';

// Used to navigate to a sub-section of a page

class NavListBtn extends Component {
    render() {
        return <a className="btn btn-orange btn-navlist btn-lg" href="#" role="button">{this.props.name}</a>
    }
}

export default NavListBtn;