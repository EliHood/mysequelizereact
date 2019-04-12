const ourStyles = theme => ({
    root: {
        flexGrow: 1,
        padding: 10
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    chip: {
        margin: theme.spacing.unit
    },
    button: {
        marginLeft: 10,
        margin: 0,
        flexGrow: 1,
        display:'inline-block',
      
    },
    box:{
        width:'500px'
    },
    rightToolbar: {
        color: '#fff',
        textDecoration: 'none',
        a: {
            color: '#fff'

        }
    },
    signIn:{
        margin:'40px',
        padding:0,
        flexGrow: 1,
    },
    signUp:{
        margin:'40px',
        padding:0,
        flexGrow: 1,
       

    },
    rightt: {
        marginLeft: 'auto',
        marginRight: 24
    },
    navRoot: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: 16,
        marginLeft: -12
    }
    
});

export default ourStyles;