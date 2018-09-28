import * as React from 'react'

interface IProps {
    caption: string;
    value: number;
    type: APP.FilterType;
    isActive?: boolean;
    toggle?: (filterType: string) => void;
}

export default class FilterItem extends React.Component<IProps, {}>{
    constructor(props: IProps) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(e: React.MouseEvent<HTMLSpanElement>) {
        e.preventDefault();
        this.props.toggle(this.props.type);
    }

    render () {
        console.log('render FilterItem');
        const { caption, value, isActive } = this.props;
        return (
            <span
                className={'toggle ' + (isActive ? 'toggle--active': '')}
                onClick={this.handleToggle}>{caption}&nbsp;<span>{value}</span></span>
        )
    }
}