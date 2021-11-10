import PropTypes from 'prop-types'


const Button = ({color, text, onClickFunc}) => {

const bool = true

  return (
    <button className='btn' 
      style={{backgroundColor: color}} 
      onClick = {onClickFunc}
    >{text}</button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}


Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClickFunc: PropTypes.func,
}

export default Button
