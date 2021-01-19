import InputBase from "@material-ui/core/InputBase/InputBase";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { theme } from "../Theme";

export const SearchTextField = withStyles(() => {
  return createStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 30,
        backgroundColor: '#e6ecf0',
        padding: 0,
        paddingLeft: 15,

        "& .Mui-focused": {
          backgroundColor: 'white',
          'fieldset': {borderWidth: 1, borderColor: theme.palette.primary.main},
          '& svg': {fill: theme.palette.primary.main}
        }
      },
      "&:hover": {
        "& fieldset": {borderColor: 'transparent'}
      },
      "& fieldset": {
        borderColor: 'transparent',
        borderWidth: 1
      }
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px 14px 5px'
    }
  })
})(InputBase);