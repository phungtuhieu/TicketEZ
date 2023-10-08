import React from 'react';
import './SeatChart.scss';

class SeatChart extends React.Component {
    constructor() {
        super();
        this.state = {
            seat: [
                ['1', '2', '3', '4', '5', '6', '7', '8'],
                ['11', '12', '13', '14', '15', '16', '17', '18'],
                ['21', '22', '23', '24', '25', '26', '27', '28'],
                ['31', '32', '33', '34', '35', '36', '37', '38'],
                ['41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
            ],
            seatAvailable: [
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                ['31', '32', '33', '34', '35', '36', 'n37', '38', '39', '40'],
                ['41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
            ],
            seatReserved: [],
            seatUnavailable: ['12', '13', '14'],
        };
    }

    onClickData(seat) {
        if (this.state.seatReserved.indexOf(seat) > -1) {
            this.setState({
                seatAvailable: this.state.seatAvailable.concat(seat),
                seatReserved: this.state.seatReserved.filter((res) => res !== seat),
            });
        } else {
            this.setState({
                seatReserved: this.state.seatReserved.concat(seat),
                seatAvailable: this.state.seatAvailable.filter((res) => res !== seat),
            });
        }
    }

    render() {
        return (
            <div>
                <h4>PICK YOUR SEATS</h4>
                <div className="container">
                    <table className="grid">
                        <tbody>
                            {this.state.seat.map((numList, i) => (
                                <tr key={i}>
                                    {numList.map((seat_no) => (
                                        <td
                                            className={
                                                this.state.seatUnavailable.indexOf(seat_no) > -1
                                                    ? 'unavailable'
                                                    : this.state.seatReserved.indexOf(seat_no) > -1
                                                    ? 'reserved'
                                                    : 'available'
                                            }
                                            key={seat_no}
                                            onClick={() => this.onClickData(seat_no)}
                                        >
                                            <div>{seat_no}</div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SeatChart;
