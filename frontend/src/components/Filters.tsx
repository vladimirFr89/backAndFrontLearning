import * as React from 'react'
import { ReactElement } from "react";
import { connect } from "react-redux";
import { changeFilter } from '../actionCreators/index'

interface IStateProps {
    activeFilter?: string,
}

interface IDispatchProps {
    changeFilter?: (value: string) => void,
}

type Props = IStateProps & IDispatchProps;

interface ChildProps {
    caption: string;
    value: number;
    type: string;
    isActive?: boolean;
    toggle?: (filterType: string) => void;
}

class Filters extends React.Component<Props, {}>{
    constructor(props: Props) {
        super(props);
        // обработчик смены активного фильтра
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(filterType: string) {
        this.props.changeFilter(filterType);
    }

    render () {
        console.log('render Filters');
        return (
            <div>
                {
                    React.Children.map(this.props.children, (child: ReactElement<ChildProps>, index: number) => {
                        if (child.props && child.props.caption) {
                            return React.cloneElement(child, {
                                caption: child.props.caption,
                                value: child.props.value,
                                type: child.props.type,
                                isActive: child.props.type === this.props.activeFilter,
                                toggle: this.handleToggle
                            });
                        } else {
                            return child;
                        }
                    })
                }
            </div>
        )
    }
}

export default connect(
    (state: APP.ApplicationState):IStateProps => ({ activeFilter: state.activeFilter }),
    (dispatch):IDispatchProps => {
        return {
            changeFilter: (value: string) => {
                dispatch(changeFilter(value))
            }
        }
    }
)(Filters);