import React, { Component } from 'react';
import './Crypto.css'
import CryptoList from './CryptoList'
import axios from 'axios';

class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptoList: []
            // Dodajemy nowa liste. I na przykladzie poprzedniej wyszukiwarki renderujemy ta lub poprzednia cryptoListe.
        }
    }



    componentDidMount() {
        setInterval(() => {
            if (this.inputValue.value === '') {
                this.fetchData();
            }
        }, 5000);

        this.fetchData();
    }

    fetchData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(response => {
                // console.log(response);
                let cryptoList = [];
                let oldCryptoList = this.state.cryptoList;

                for (let key in response.data) {
                    // console.log(key, response.data[key])
                    let newRate = {
                        currency: key,
                        last: response.data[key].last,
                        symbol: response.data[key].symbol,
                    }
                    // Alternatywny Zapis
                    // let object = {
                    //     currency: key,
                    //     ...response.data[key]
                    // }

                    // Wyszukujemy objekt ze starej bazy pasujacy do nowej bazy. Wyzej nowa wersja np.$, nizej stara wersja.
                    let oldRate = oldCryptoList.find(oldRate => oldRate.currency === newRate.currency);
                    cryptoList.push(newRate);

                    // console.log(oldRate); Powinno byc undifined.

                    if (oldRate !== undefined) {
                        if (newRate.last > oldRate.last) {
                            newRate.class = 'green';
                        } else if (newRate.last < oldRate.last) {
                            newRate.class = 'red';
                        } else if (newRate.last = oldRate.last) {
                            newRate.class = 'blue';
                        }
                    }
                    else {
                        newRate.class = 'blue';
                    }
                }

                this.setState({ cryptoList });

                console.log(cryptoList);
            })
    }

    onFilter = () => {
        let filter = this.inputValue.value.trim().toUpperCase();
        let filteredCryptoList = this.state.cryptoList;

        filteredCryptoList = filteredCryptoList.filter(rate => {
            return rate.currency.includes(filter);
        });

        this.setState({ cryptoList: filteredCryptoList });
    }

    render() {
        return (
            <div>
                <input
                    className='Search'
                    type='text'
                    placeholder='Filter'
                    ref={input => this.inputValue = input}
                    onChange={this.onFilter}
                />
                <CryptoList cryptoList={this.state.cryptoList} />
            </div>
        );
    }
}

export default Crypto;