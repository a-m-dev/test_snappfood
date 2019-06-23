

// RegEx Manager


const RegExs = {

  /** Webpack RegExs */
  webpack_script_regex: /\.(js|jsx)$/,
  webpack_style_regex: /\.(css|scss|sass)$/,
  webpack_images_regex: /\.(jpg|jpeg|png|svg)$/,
  webpack_fonts_regex: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,

  /** FrontEnd RegExs */
  phoneNumber_pattern: /^(\+98|09)\d{9}$/g,
  email_pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

module.exports = RegExs
