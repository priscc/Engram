const rules = [
  [/#{6}\s?([^\n]+)/gm, '<h6>$1</h6>'], // ###### header 6
  [/#{5}\s?([^\n]+)/gm, '<h5>$1</h5>'], // ##### header 5
  [/#{4}\s?([^\n]+)/gm, '<h4>$1</h4>'], // #### header 4
  [/#{3}\s?([^\n]+)/gm, '<h3>$1</h3>'], // ### header 3
  [/#{2}\s?([^\n]+)/gm, '<h2>$1</h2>'], // ## header 2
  [/#{1}\s?([^\n]+)/gm, '<h1>$1</h1>'], // # header 1
  [/\*\*([^\*\n]+)\*\*/gm, '<b>$1</b>'], // **bold**
  [/\*([^\*\n]+)\*/gm, '<em>$1</em>'], // *italicized*
  // list for number
  [/((\n\d\..+)+)/gm, '<ol>$1</ol>'],
  [/\n\d\.([^\n]+)/gm, '<li>$1</li>'], // 1. list item
  // list for unorder list
  [/((\n\*.+)+)/gm, '<ul>$1</ul>'],
  [/\n\*([^\n]+)/gm, '<li>$1</li>'], // * list item
  [/([^\n]+\n)/gm, '<p>$1</p>']
]

export default {
  bind (el) {
    let html = el.textContent

    rules.forEach(([rule, replace]) => {
      html = html.replace(rule, replace)
    })

    el.innerHTML = html
  }

}
