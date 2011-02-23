var http = require('http'),
	sys = require('sys');

http.createServer(function(request, response) {
	
	sys.puts(request.connection.remoteAddress + ": " + request.method + " " + request.url);
	
	var proxy = http.createClient(80, request.headers['host'])
	
	var proxy_request = proxy.request(request.method, request.url, request.headers);
	
	proxy_request.addListener('response', function (proxy_response) {
		proxy_response.addListener('data', function(chunk) {
			response.write(chunk, 'binary');
		});
		proxy_response.addListener('end', function() {
			response.end();
		});
		response.writeHead(proxy_response.statusCode, proxy_response.headers);
	});
	
	request.addListener('data', function(chunk) {
		proxy_request.write(chunk, 'binary');
	});
	
	request.addListener('end', function() {
		proxy_request.end();
	});
	
}).listen(8080);

sys.puts('Startet proxy on port 8080');