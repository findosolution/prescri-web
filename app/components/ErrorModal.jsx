var React = require('react');

export class ErrorModal extends React.Component {

    constructor(props){
        super(props)
    }

    render() {

        var {message, type} = this.props;

        function getAlert(type) {

            switch (type) {
               
                case 'error':
                    return <div id="call-out-error" className="alert callout" data-closable>
                    {message}
                    <button className="close-button" aria-label="Dismiss alert" type="button" onClick={() => {
                        $('#call-out-error').trigger('close');
                    }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>;
                
                case 'info':
                    return <div>infor..</div>
                
                case 'warning':
                    return <div>warning...</div>

                default:
                    return <div></div>;
            }
        }

        return (
          
          <div>{getAlert(type)}</div>
        );
    }

}

export default ErrorModal;
