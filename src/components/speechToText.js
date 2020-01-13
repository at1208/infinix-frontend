import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { MdKeyboardVoice } from "react-icons/md";


import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import SpeechToText from 'speech-to-text';


const styles = theme => ({
  root: {
    paddingTop: 65,
    paddingLeft: 11,
    paddingRight: 11
  },
  flex: {
    flex: 1
  },
  grow: {
    flexGrow: 1
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22
  })
});
class Speech extends Component{
  state = {
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,

  };

componentDidMount(){
 this.startListening()
}








  onAnythingSaid = text => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (!isWidthUp('sm', this.props.width)) {
      this.setState({ listening: false });
    } else if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = text => {
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: ''
    });
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  render() {
    const {
      error,
      interimText,
      finalisedText,
      listening,
      language
    } = this.state;

    const { classes } = this.props;

    let content;


    if (error) {
      content = (


          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>

      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <MdKeyboardVoice   style={{ fontSize:"100px"}}>

          </MdKeyboardVoice>
        );
      } else {
        buttonForListening = (
          < MdKeyboardVoice


      style={{ fontSize:"100px"}}
          >

          </ MdKeyboardVoice>
        );
      }


      content = (
        <div>
                <div className='text-center container' style={{ paddingTop: "180px"}}>
                  {buttonForListening}
                </div>

              <Typography variant="body1" gutterBottom>
                {interimText}
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  {finalisedText.map((str, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {str}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
        </div>
      );
    }

    return (
      <div>
            {content}
      </div>
    );
  }
}
export default withWidth()(withStyles(styles)(Speech));
