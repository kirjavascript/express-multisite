import styles from './root.scss';
import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';
import Window from './Window/index.jsx';

import { saveAjax, loadAjax } from './util/ajax.js';

function initialState() {
    let state;

    // grab code from the document if included

    if (typeof __code != 'undefined') {

        state = {
            code: __code,
            snippetHash: location.pathname.slice(1)
        }
    }
    else {
        state = {
            code: '',
            snippetHash: null
        }
    }

    return state;

}

class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = initialState();

        this.saveSnippet = (value) => {
            let hash = saveAjax(value);

            this.setState({
                code: value,
                snippetHash: hash
            });
            browserHistory.push(`/${hash}`);

            document.title = 'golfbin';

        }

        this.loadSnippet = (hash) => {

            loadAjax(hash, (obj) => {

                this.setState({
                    code: obj.code,
                    snippetHash: hash
                });

            })

        }

        this.resetApp = () => {
            this.setState({
                code: '',
                snippetHash: null
            });
            browserHistory.push(`/`);
        }

        this.onChange = (value) => {
            if (value != this.state.code) {
                document.title = 'golfbin (unsaved)';
            }
            else {
                document.title = 'golfbin';
            }
        }

        this.handleCommands = (command, value) => {
            if (command == 'save' && value != '') {
                this.saveSnippet(value);
            }
            else if (command == 'new') {
                this.resetApp();
            }
        }

        this.onError = (error) => {
            //this.setState({error:error.toString()});
        }

        this.clearError = () => {
            //this.setState({error:null});
        }

        // have data.code && data.saved to fix concurrency issues
        // brace editor ??
        // show file as just text when loading?

    }

    render () {
        return <div>

        <Editor
            onCommand={this.handleCommands}
            onChange={this.onChange}
            data={this.state.code} />

        <Menu
            onCommand={this.handleCommands}
            onError={this.onError}
            state={this.state} />

        <Window
            close={this.clearError}
            error={this.state.error}/>

        </div>;
    }
}

render((
    <App/>
), document.getElementById('app'));
// load url?

// <Router history={browserHistory}>
//     <Route component={App} path="/">
//         <Route path="/*-*-*-*"/>
//     </Route>
// </Router>

// load archive via api & routes