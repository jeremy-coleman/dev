const template = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title><%= NOTEBOOK_TITLE %> - iodide</title>
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<script id="jsmd" type="text/jsmd">
<%= JSMD %>
</script>
<div id='page'></div>
<script src='<%= APP_PATH_STRING %>iodide.js'></script>
</body>
</html>`

module.exports = template
