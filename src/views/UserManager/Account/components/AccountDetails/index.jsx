import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { 
  TextField,
List,
ListItem,
ListItemText,
ListSubheader } 
  from '@material-ui/core';



// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';



class Account extends Component {
 

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);




  

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="The information user"
            title="Profile"
          />
        </PortletHeader>
        <PortletContent noPadding>
         
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText=""
                label="First name"
                margin="dense"
                required
                value={this.props.user.firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                value={this.props.user.lastName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Username"
                margin="dense"
                required
                value={this.props.user.username}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="AccountID"
                margin="dense"
                required
                value={this.props.user.accountID}
                variant="outlined"
              />
            </div>


            <div className={classes.field}>
            <List className={classes.textField}  >
    
   
            <ListSubheader>Auth:</ListSubheader>

            {this.props.user.auth.map((row, index) => (
           
              <ListItem key={index}>
                <ListItemText primary={`Has password: ${row.hasPassword }, Type: ${row.passwordType}, Status: ${row.status}`} />
              </ListItem>
            ))}
         
     
    </List>

 
  

            </div>
            
            <div className={classes.field}>
            <List className={classes.textField}  >
    
   
            <ListSubheader>Phones:</ListSubheader>

            {this.props.user.phones.map((phone, index) => (
           
              <ListItem key={index}>
                <ListItemText primary={`Number: ${phone.number}, Type: ${phone.type}`} />
              </ListItem>
            ))}
         
     
    </List>

    

    <List className={classes.textField}>
    
   
    <ListSubheader>Emails:</ListSubheader>

    {this.props.user.emails.map((email, index) => (
   
      <ListItem key={index}>
        <ListItemText primary={`Email: ${email.email}, Type: ${email.type}`} />
      </ListItem>
    ))}
 

</List>




            </div>


            
        
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          
        </PortletFooter>
      </Portlet>
    );
  }



}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
