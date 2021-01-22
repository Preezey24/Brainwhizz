import React from 'react'; 
import './Footer.css'; 

const Footer = () => {
    return (
        <div className={classes.footer_container}>
        <div className={classes.footer_root}>
          <div className={classes.footer_left}>
            <span>Follow</span>
            <Typography className={classes.text}>View this project on Github</Typography>
            <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
              <GitHubIcon />
            </a>
          </div>
          <div className={classes.footer_middle}>
            <span>About Us</span>
            <Typography className={classes.text}>Creators</Typography>
            <div className={classes.contactContainer}>
              <div className={classes.contact}>
                <a className={classes.linkText} href='https://www.linkedin.com/in/aaron-hanson-brb/'>Aaron Hanson</a> &nbsp;
              <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                  <GitHubIcon />
                </a>
              </div>
              <div className={classes.contact}>
                <a className={classes.linkText} href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Kyle Barthelmes</a> &nbsp;
              <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                  <GitHubIcon />
                </a>
              </div>
              <div className={classes.contact}>
                <a className={classes.linkText} href='https://www.linkedin.com/in/nicholas-richard-77a9a066/'>Nick Richard</a> &nbsp;
              <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                  <GitHubIcon />
                </a>
              </div>
              <div className={classes.contact}>
                <a className={classes.linkText} href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Rhys Previte</a> &nbsp;
              <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                  <GitHubIcon />
                </a>
              </div>
            </div>
          </div>
          <div className={classes.footer_right}>
            <span>Inspired By</span>
            <div className={classes.contactContainer}>
            <a className={classes.linkText} href='https://www.mapmyrun.com/'>MapMyRun</a>
            </div>
          </div>
        </div>
      </div>
    )
} 

export default Footer; 