import React, {Component} from 'react';

  const tutors = [
    {
        Name: "Randy",
        Subject: "Cheeseburger Grilling",
        Email: "WeekendSupervisor@sunnyvale.ca"
    },
    {
        Name: "Bubs",
        Subject: "Shed Maintenence",
        Email: "kittypatrol@sunnyvale.ca"
    },
    {
        Name: "Julian",
        Subject: "Business Methods",
        Email: "juliansbar@sunnyvale.ca"
    },
    {
        Name: "Jacob",
        Subject: "Being Useless",
        Email: "sorryricky@sunnyvale.ca"
    },
    {
        Name: "Randy",
        Subject: "Cheeseburger Grilling",
        Email: "WeekendSupervisor@sunnyvale.ca"
    },
    {
        Name: "Bubs",
        Subject: "Shed Maintenence",
        Email: "kittypatrol@sunnyvale.ca"
    },
    {
        Name: "Julian",
        Subject: "Business Methods",
        Email: "juliansbar@sunnyvale.ca"
    },
    {
        Name: "Jacob",
        Subject: "Being Useless",
        Email: "sorryricky@sunnyvale.ca"
    },
    {
        Name: "Randy",
        Subject: "Cheeseburger Grilling",
        Email: "WeekendSupervisor@sunnyvale.ca"
    },
    {
        Name: "Bubs",
        Subject: "Shed Maintenence",
        Email: "kittypatrol@sunnyvale.ca"
    },
    {
        Name: "Julian",
        Subject: "Business Methods",
        Email: "juliansbar@sunnyvale.ca"
    },
    {
        Name: "Jacob",
        Subject: "Being Useless",
        Email: "sorryricky@sunnyvale.ca"
    },
    {
        Name: "Randy",
        Subject: "Cheeseburger Grilling",
        Email: "WeekendSupervisor@sunnyvale.ca"
    },
    {
        Name: "Bubs",
        Subject: "Shed Maintenence",
        Email: "kittypatrol@sunnyvale.ca"
    },
    {
        Name: "Julian",
        Subject: "Business Methods",
        Email: "juliansbar@sunnyvale.ca"
    },
    {
        Name: "Jacob",
        Subject: "Being Useless",
        Email: "sorryricky@sunnyvale.ca"
    },
    {
        Name: "Randy",
        Subject: "Cheeseburger Grilling",
        Email: "WeekendSupervisor@sunnyvale.ca"
    },
    {
        Name: "Bubs",
        Subject: "Shed Maintenence",
        Email: "kittypatrol@sunnyvale.ca"
    },
    {
        Name: "Julian",
        Subject: "Business Methods",
        Email: "juliansbar@sunnyvale.ca"
    },
    {
        Name: "Jacob",
        Subject: "Being Useless",
        Email: "sorryricky@sunnyvale.ca"
    },
    {
        Name: "Randy",
        Subject: "Cheeseburger Grilling",
        Email: "WeekendSupervisor@sunnyvale.ca"
    },
    {
        Name: "Bubs",
        Subject: "Shed Maintenence",
        Email: "kittypatrol@sunnyvale.ca"
    },
    {
        Name: "Julian",
        Subject: "Business Methods",
        Email: "juliansbar@sunnyvale.ca"
    },
    {
        Name: "Jacob",
        Subject: "Being Useless",
        Email: "sorryricky@sunnyvale.ca"
    }
    ]
class TutorTable extends Component {
    constructor(){
        super();
        this.state = {
            page: 0,
            selectedItems: this.displaySetup(0,tutors),
            lastInd: ((tutors.length >= 10)?9:tutors.length)
        }
    }
    
    // Grab 10 elements at a time
    displaySetup(page,list){
        const end = ( (page*10+10<list.length)?(page*10+10) : list.length )
        this.setState({lastInd: end});
        return(list.slice( (page*10), end));
    }

    pageUp = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage+1), });
        this.setState({selectedItems: this.displaySetup(currPage+1,tutors)});
    }

    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,tutors)});
    }

    render(){
        return(
            <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Email</th>
                    </tr>
                </thead>
                {this.state.selectedItems.map(item=>{
                    return (<tr>
                            <td>{item.Name}</td>
                            <td>{item.Subject}</td>
                            <td>{item.Email}</td>
                            </tr>)
                })}
            </table>
            {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>Last Page</a>:null}
            {(this.state.lastInd<tutors.length)?<a className="btn btn-tableswitch right" href="#" role="button" onClick={this.pageUp}>Next Page</a>:null}
            </div>
        )
    }
}

export default TutorTable;