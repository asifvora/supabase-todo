import { css } from 'glamor';

const styles = {
  container: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: 'auto',
    '& header': {
      display: 'flex',
      justifyContent: 'center'
    },
    '& main': {
      flex: 1
    }
  }),
  menu: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    padding: '16px 0',
    '& img': {
      width: '70px',
      borderRadius: '50%',
      verticalAlign: 'middle'
    },
    '& span': {
      margin: '0 12px'
    },
    '& a': {
      padding: '8px',
      cursor: 'pointer'
    }
  }),
  list: css({
    listStyle: 'none',
    // overflowY: 'scroll',
    padding: 0,
    '& li': {
      padding: '5px 0'
    }
  }),
  filter: css({
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    '& figure': {
      margin: 0,
      padding: '0.8rem',
      transition: 'transform 0.4s'
    }
  }),
  activeFilter: position =>
    css({
      position: 'absolute',
      height: '3px',
      width: '50px',
      bottom: 0,
      background: '#ffffff',
      transform: `translateX(${position}px)`,
      transition: 'transform 0.4s'
    })
};

export default styles;
