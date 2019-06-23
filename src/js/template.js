

/** Html Template for express to build the page on air... */
const template = ( 
  title = 'Uneed Corp', 
  initialState = {},
  content = '' 
  ) => {
    
  let script = `
        <script src='/bundle.js' defer></script>
        <script> window.__INITIAL_DATA__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')} </script>
      `

  let page = `
    <!DOCTYPE html>
    <html lang='fa'>
      <head>
        <meta charset='UTF-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
        <link href='/styles/app.css' rel='stylesheet'>
        ${script}
      </head>

      <body>
        <div id='app'>${content}</div>
      </body>
    </html>
  `
    
  return page
}


export default template

