import React, { Component } from 'react';
import './CryptoList.css'

class CryptoList extends Component {
    render() {
        const cryptoList = this.props.cryptoList;

        return (
            // <ul className='Lista'>
            //     {cryptoList.map(currency =>
            //         <li className='Waluta' key={currency.currency}>

            //             <span className='Element'>Last rate:</span>
            //             <span className='Element'>{currency.last}</span>
            //             <span className='Element'><strong>{currency.currency}</strong></span>

            //             <span className='Element'>[ {currency.symbol} ]</span>


            //         </li>



            //     )}
            // </ul>

            <div className='Glowny'>
                {cryptoList.map(currency =>
                    <div className='ElementDiv'>
                        <h3>
                            {currency.currency} [ {currency.symbol} ]
                        </h3>
                        <span>Last Rate: </span>
                        <span className={currency.class}>{currency.last}
                        </span>
                    </div>
                )}
            </div>
        );
    }
}







export default CryptoList;