var sys = require("sys"),
	dns = require("dns"),
	domain = process.ARGV[2];

if (!domain)
	return sys.puts("Usage: node " + __filename.replace(__dirname + "/", "") + " domainname");

// resolve A entries
dns.resolve(domain, 'A', function(err, addresses) {
	if (err) {
		if (err.errno == dns.NODATA) sys.puts("No A entry for " + domain);
		else throw err;
	} else {
		sys.puts("A addresses: " + JSON.stringify(addresses));
	}
});

// resolve TXT entries
dns.resolve(domain, 'TXT', function(err, addresses) {
	if (err) {
		if (err.errno == dns.NODATA) sys.puts("No TXT entry for " + domain);
		else throw err;
	} else {
		sys.puts("TXT addresses: " + JSON.stringify(addresses));
	}
});

// resolve MX entries
dns.resolve(domain, 'MX', function(err, addresses) {
	if (err) {
		if (err.errno == dns.NODATA) sys.puts("No MX entry for " + domain);
		else throw err;
	} else {
		sys.puts("MX addresses: " + JSON.stringify(addresses));
	}
});