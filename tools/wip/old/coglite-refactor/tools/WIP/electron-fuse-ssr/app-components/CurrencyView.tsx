import { px } from 'csx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { IStores } from '../stores';
import { style } from 'typestyle';

const currencyClass = style({
    padding: px(10),
});

const moneyClass = style({
    color: 'green',
});

interface ICurrencyProps {
    currency?: IStores['currency'];
}

@inject((stores: IStores) => ({
    currency: stores.currency,
}))
@observer
export default class Currency extends React.Component<ICurrencyProps, {}> {
    public render() {
        const { currency } = this.props;
        // tslint:disable-next-line:no-string-literal
        const rate = currency && currency.rates ? currency.rates.rates['JPY'] : 'Not Found';
        return (
            <div className={currencyClass}>
                <Helmet>
                    <title>Currency</title>
                </Helmet>
                USD -> JPY rate: $1 = <strong className={moneyClass}>¥{rate}</strong>
            </div>
        );
    }
}
